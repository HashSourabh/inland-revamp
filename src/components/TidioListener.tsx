'use client';

import { useEffect } from 'react';
import { sendCustomBotMessage } from './tidioHelpers';
import { parseQuestion, type ParsedFilters } from '@/utils/tidioAnswer';

declare global {
  interface Window {
    __tidioDebugLog?: Array<Record<string, any>>;
  }
}

if (typeof window !== 'undefined') {
  window.__tidioDebugLog = window.__tidioDebugLog || [];
}

type MessageSource = 'api' | 'dom';

export type TidioMessage = {
  text: string;
  from: 'visitor' | 'bot' | 'unknown';
  timestamp: number;
  raw: any;
};

const TIDIO_EVENTS = ['message:received', 'message', 'message:send'];
const MAX_RETRIES = 120;
const RETRY_DELAY_MS = 500;
const TIDIO_DOM_SELECTORS = ['#tidio-chat', '.tidio-chat', '[id^="tidio-"]', '[class*="tidio-chat"]'];
const apologyPatterns = /(sorry|i'?m not sure|i do not know|i don't know|i didn’t understand|rephrase)/i;
const irrelevantPatterns = /(thank you for your message|let me connect|cannot assist|no information)/i;
const keywordPatterns = [
  /i[’']?m not sure/i,
  /please contact support/i,
  /here[’']?s a link/i,
  /click the link/i,
  /read more/i,
  /generic/i,
  /irrelevant/i,
];
const linkPatterns = [/<a\b/i, /https?:\/\//i, /www\./i];
const ALWAYS_REJECT_PATTERNS = [
  /great news/i,
  /contact our/i,
  /please contact us/i,
  /call us/i,
  /visit our office/i,
  /hit the buttons/i,
  /tap below/i,
  /i don['’]?t have access/i,
  /i['’]?m afraid/i,
  /i do not have enough information/i,
  /i don['’]?t have enough information/i,
  /we specialize/i,
  /contact our [a-z\s]+ offices/i,
  /please contact our/i,
  /our local team/i,
];
const TRUSTED_LINK_PATTERNS = [
  /inlandandalucia\.com\/[a-z]{2}\/properties/i,
  /inlandandalucia\.com\/[a-z]{2}\/buyer's-guide/i,
  /inlandandalucia\.com\/[a-z]{2}\/buyers-guide/i,
  /inlandandalucia\.com\/[a-z]{2}\/contact/i,
];
const botSelectors = ['.tidio-message.bot', '.from-bot', '.message-bot', "[data-author='bot']"];
type BadAnswerResult = {
  isBad: boolean;
  reason?: string;
  matchedPattern?: string;
  combinedText?: string;
};
type TidioDebugEntry =
  | { type: 'user'; text: string; filters?: ParsedFilters }
  | { type: 'bot'; text: string; reason?: string; matchedPattern?: string }
  | { type: 'backend-start'; payload: { question: string; locale: string; hasFilters: boolean } }
  | { type: 'backend-success'; answer?: string }
  | { type: 'backend-error'; error: string };

const getCurrentLocale = (): string => {
  if (typeof window === 'undefined') return 'en';
  const parts = window.location.pathname.split('/').filter(Boolean);
  const localeCandidate = parts[0];
  if (localeCandidate && localeCandidate.length === 2) {
    return localeCandidate;
  }
  return 'en';
};

const pushDebugLog = (entry: TidioDebugEntry) => {
  if (typeof window === 'undefined') return;
  window.__tidioDebugLog = window.__tidioDebugLog || [];
  window.__tidioDebugLog.push({ timestamp: Date.now(), ...entry });
  if (window.__tidioDebugLog.length > 200) {
    window.__tidioDebugLog.shift();
  }
};

const sendToBackend = async (question: string, badAnswer: string, locale?: string, filters?: ParsedFilters) => {
  try {
    const payload = {
      question,
      locale: locale || getCurrentLocale(),
      hasFilters: Boolean(filters),
    };
    console.info('TidioListener: requesting corrected answer', payload);
    pushDebugLog({ type: 'backend-start', payload });
    const response = await fetch('/api/ai/fix-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        badAnswer,
        locale: locale || getCurrentLocale(),
        filters,
      }),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log('Corrected AI answer from backend:', data.answer);
    pushDebugLog({ type: 'backend-success', answer: data?.answer });

    if (typeof window !== 'undefined') {
      const correction = typeof data?.answer === 'string' ? data.answer : '';
      window.__correctedAnswer = correction;
      window.setTimeout(() => {
        if (correction) {
          sendCustomBotMessage(correction);
        }
        window.__tidioBadAnswerDetected = undefined;
        window.__correctedAnswer = undefined;
      }, 600);
    }
  } catch (err) {
    console.error('Backend error:', err);
    pushDebugLog({ type: 'backend-error', error: err instanceof Error ? err.message : String(err) });
  }
};

const extractText = (payload: any): string => {
  if (!payload) return '';
  if (typeof payload === 'string') return payload;
  if (typeof payload.text === 'string') return payload.text;
  if (typeof payload.message === 'string') return payload.message;
  if (payload.message && typeof payload.message.text === 'string') return payload.message.text;
  if (payload.data && typeof payload.data.text === 'string') return payload.data.text;
  if (Array.isArray(payload.messages) && payload.messages.length) {
    const lastMessage = payload.messages[payload.messages.length - 1];
    if (typeof lastMessage === 'string') return lastMessage;
    if (lastMessage && typeof lastMessage.text === 'string') return lastMessage.text;
  }
  if (payload.node && typeof payload.node.textContent === 'string') {
    return payload.node.textContent.trim();
  }
  if (typeof payload.content === 'string') return payload.content;
  return '';
};

const extractSender = (payload: any, fallback: TidioMessage['from'] = 'unknown'): TidioMessage['from'] => {
  const fromValue =
    payload?.from ??
    payload?.author ??
    payload?.authorType ??
    payload?.message?.from ??
    payload?.message?.author ??
    payload?.message?.authorType ??
    payload?.sender;

  if (!fromValue || typeof fromValue !== 'string') {
    return fallback;
  }

  const normalized = fromValue.toLowerCase();

  if (normalized.includes('visitor') || normalized.includes('user') || normalized.includes('client')) {
    return 'visitor';
  }

  if (normalized.includes('bot') || normalized.includes('operator') || normalized.includes('agent') || normalized.includes('system')) {
    return 'bot';
  }

  return fallback;
};

const extractDomSender = (node: HTMLElement | null): TidioMessage['from'] => {
  if (!node) return 'unknown';
  const authorAttr = node.getAttribute('data-author') || node.getAttribute('data-sender') || node.getAttribute('data-role');

  if (authorAttr) {
    return extractSender({ from: authorAttr }, 'unknown');
  }

  const text = `${node.className} ${node.id}`.toLowerCase();

  if (text.includes('visitor') || text.includes('user')) return 'visitor';
  if (text.includes('bot') || text.includes('operator') || text.includes('agent')) return 'bot';

  return 'unknown';
};

const normalizeMessage = (payload: any, source: MessageSource, node?: HTMLElement): TidioMessage => {
  const text = extractText(payload);
  let from =
    source === 'dom' ? extractDomSender(node ?? (payload?.node as HTMLElement)) : extractSender(payload, 'unknown');
  if (source === 'dom' && from === 'unknown') {
    from = 'bot';
  }

  return {
    text,
    from,
    timestamp: Date.now(),
    raw: payload,
  };
};

const isAnswerBad = (text: string): boolean => {
  if (!text) return true;
  return keywordPatterns.some((pattern) => pattern.test(text));
};

const extractRawContent = (raw: any): string => {
  if (!raw) return '';
  if (typeof raw === 'string') return raw;
  const sections: string[] = [];
  if (typeof raw.text === 'string') sections.push(raw.text);
  if (typeof raw.message === 'string') sections.push(raw.message);
  if (raw.message && typeof raw.message.text === 'string') sections.push(raw.message.text);
  if (raw.message && typeof raw.message.html === 'string') sections.push(raw.message.html);
  if (typeof raw.html === 'string') sections.push(raw.html);
  if (raw.data && typeof raw.data.text === 'string') sections.push(raw.data.text);
  if (raw.node && typeof raw.node.textContent === 'string') sections.push(raw.node.textContent);
  return sections.join(' ');
};

const containsLink = (msg: TidioMessage, combinedText?: string): boolean => {
  const combined = (combinedText ?? `${msg.text || ''} ${extractRawContent(msg.raw)}`).trim();
  if (!combined) return false;
  return linkPatterns.some((pattern) => pattern.test(combined));
};

const hasTrustedReference = (msg: TidioMessage, filters?: ParsedFilters): boolean => {
  const combined = `${msg.text || ''} ${extractRawContent(msg.raw)}`.toLowerCase().replace(/[’]/g, "'");
  if (!combined) return false;
  const hasTrustedLink = TRUSTED_LINK_PATTERNS.some((pattern) => pattern.test(combined));
  if (!hasTrustedLink) {
    return false;
  }
  if (hasMissingContext(combined, filters)) {
    return false;
  }
  return true;
};

const hasMissingContext = (answer: string, filters?: ParsedFilters): boolean => {
  if (!filters) return false;
  const lowerAnswer = (answer || '').toLowerCase();
  const missingType =
    filters.propertyType && filters.propertyType !== 'property'
      ? !lowerAnswer.includes(filters.propertyType.toLowerCase())
      : false;
  const missingLocation = filters.location ? !lowerAnswer.includes(filters.location.toLowerCase()) : false;
  const needsPrice = Boolean(filters.minPrice || filters.maxPrice);
  const missingPriceInfo = needsPrice ? !/[€$£]|\d/.test(lowerAnswer) : false;
  const missingBeds = filters.minBedrooms
    ? !(lowerAnswer.includes(String(filters.minBedrooms)) && lowerAnswer.includes('bed'))
    : false;
  const missingBaths = filters.minBathrooms
    ? !(lowerAnswer.includes(String(filters.minBathrooms)) && lowerAnswer.includes('bath'))
    : false;
  const missingLimit = filters.limit ? !lowerAnswer.includes(String(filters.limit)) : false;
  return missingType || missingLocation || missingPriceInfo || missingBeds || missingBaths || missingLimit;
};

const evaluateBadAnswer = (msg: TidioMessage): BadAnswerResult => {
  if (msg.from !== 'bot') {
    return { isBad: false };
  }

  const combinedRaw = `${msg.text || ''} ${extractRawContent(msg.raw)}`.toLowerCase().trim();
  const combined = combinedRaw.replace(/[’]/g, "'");
  const text = combined || msg.text?.toLowerCase().replace(/[’]/g, "'") || '';
  if (!text) {
    return { isBad: true, reason: 'no-text' };
  }

  const record = (reason: string, matchedPattern?: string): BadAnswerResult => ({
    isBad: true,
    reason,
    matchedPattern,
    combinedText: combined,
  });

  if (text.length < 10) return record('too-short');

  const alwaysPattern = ALWAYS_REJECT_PATTERNS.find((pattern) => pattern.test(combined));
  if (alwaysPattern) return record('always-reject', alwaysPattern.source);

  if (apologyPatterns.test(combined)) return record('apology');
  if (irrelevantPatterns.test(combined)) return record('irrelevant');
  if (isAnswerBad(combined)) return record('keyword');

  const filters = typeof window !== 'undefined' ? window.__lastUserFilters : undefined;
  if (hasTrustedReference(msg, filters)) {
    return { isBad: false, reason: 'trusted-link' };
  }

  if (containsLink(msg, combined)) return record('untrusted-link');
  if (filters && hasMissingContext(combined, filters)) return record('missing-context');

  const lastUserMessage = typeof window !== 'undefined' ? window.__lastUserMessage : undefined;
  if (lastUserMessage && combined.includes(lastUserMessage)) {
    return record('echo');
  }

  return { isBad: false };
};

const getTidioRoots = (): Array<Document | ShadowRoot | HTMLElement> => {
  const roots: Array<Document | ShadowRoot | HTMLElement> = [];

  const iframe = document.querySelector<HTMLIFrameElement>("iframe[src*='tidio']");
  if (iframe) {
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (doc) {
      roots.push(doc);
    }
  }

  const shadowHost = document.querySelector('#tidio-chat');
  if (shadowHost && shadowHost.shadowRoot) {
    roots.push(shadowHost.shadowRoot);
  }

  roots.push(document);
  return roots;
};

const suppressLastBotMessage = () => {
  if (typeof window !== 'undefined' && window.tidioChatApi?.hideLastBotMessage) {
    try {
      window.tidioChatApi.hideLastBotMessage();
      return true;
    } catch {
      // fallthrough to DOM method
    }
  }

  const targets = getTidioRoots();
  for (const root of targets) {
    const messages = root.querySelectorAll<HTMLElement>(botSelectors.join(', '));
    if (!messages.length) {
      continue;
    }

    const lastBotMessage = messages[messages.length - 1];
    if (lastBotMessage) {
      lastBotMessage.textContent = '';
      lastBotMessage.classList.add('custom-hidden');
      return true;
    }
  }

  return false;
};

const TidioListener = () => {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.tidioChatApi = window.tidioChatApi || (window as any)?.tidioChatApi;
    window.__tidioDebugLog = window.__tidioDebugLog || [];

    let retries = 0;
    let retryTimeout: number | null = null;
    const cleanupFns: Array<() => void> = [];
    let observer: MutationObserver | null = null;
    const apiHandlers: Array<{ event: string; handler: (payload: any) => void }> = [];
    let apiInterval: number | null = null;

    const handleIncomingMessage = (payload: any, source: MessageSource, node?: HTMLElement) => {
      const normalizedMessage = normalizeMessage(payload, source, node);
      console.log('TidioListener: incoming message:', normalizedMessage);

      if (normalizedMessage.from === 'visitor' && normalizedMessage.text) {
        window.__latestUserMessage = normalizedMessage.text;
        window.__lastUserMessage = normalizedMessage.text.toLowerCase().trim();
        window.__lastUserFilters = parseQuestion(normalizedMessage.text);
        pushDebugLog({ type: 'user', text: normalizedMessage.text, filters: window.__lastUserFilters });
      }

      const shouldEvaluate =
        normalizedMessage.from === 'bot' ||
        (source === 'dom' && normalizedMessage.from !== 'visitor') ||
        normalizedMessage.from === 'unknown';

      if (shouldEvaluate) {
        const evaluation = evaluateBadAnswer(normalizedMessage);
        if (evaluation.isBad) {
          window.__tidioBadAnswerDetected = normalizedMessage;
          console.debug('TidioListener: Detected bad/irrelevant answer', evaluation);
          pushDebugLog({
            type: 'bot',
            text: normalizedMessage.text || '',
            reason: evaluation.reason,
            matchedPattern: evaluation.matchedPattern,
          });
          suppressLastBotMessage();
          const question = (window.__latestUserMessage || '').trim();
          if (question) {
            sendToBackend(question, normalizedMessage.text || '', getCurrentLocale(), window.__lastUserFilters);
          } else {
            console.warn('TidioListener: No user question captured for correction');
          }
        } else if (evaluation.reason === 'trusted-link') {
          pushDebugLog({
            type: 'bot',
            text: normalizedMessage.text || '',
            reason: 'trusted-link',
          });
        }
      }
    };

    const attachMutationObserver = () => {
      if (observer || typeof MutationObserver === 'undefined') {
        return;
      }

      const target = document.body;
      if (!target) return;

      observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (!(node instanceof HTMLElement)) return;

            const isTidioNode =
              TIDIO_DOM_SELECTORS.some((selector) => {
                try {
                  return node.matches(selector);
                } catch {
                  return false;
                }
              }) ||
              TIDIO_DOM_SELECTORS.some((selector) => !!node.closest(selector));

            if (!isTidioNode) return;

            const textContent = node.innerText?.trim() || node.textContent?.trim();
            if (!textContent) return;

            handleIncomingMessage({ node, text: textContent }, 'dom', node);
          });
        });
      });

      observer.observe(target, { childList: true, subtree: true });
      cleanupFns.push(() => {
        observer?.disconnect();
        observer = null;
      });

      console.log('TidioListener: MutationObserver attached');
    };

    const attachTidioApiListeners = (): boolean => {
      const api = window.tidioChatApi;
      if (!api || typeof api.on !== 'function') {
        return false;
      }

      const registerHandler = (event: string, handler: (payload: any) => void) => {
        api.on?.(event, handler);
        apiHandlers.push({ event, handler });
      };

      TIDIO_EVENTS.forEach((event) => {
        registerHandler(event, (payload: any) => handleIncomingMessage(payload, 'api'));
      });

      registerHandler('messageFromUser', (payload: any) =>
        handleIncomingMessage({ ...payload, from: 'visitor' }, 'api')
      );

      cleanupFns.push(() => {
        apiHandlers.forEach(({ event, handler }) => api.off?.(event, handler));
        apiHandlers.length = 0;
      });

      console.log('TidioListener: tidioChatApi attached');
      return true;
    };

    const attemptAttach = () => {
      if (attachTidioApiListeners()) {
        return;
      }

      if (retries >= MAX_RETRIES) {
        attachMutationObserver();
        return;
      }

      retries += 1;
      retryTimeout = window.setTimeout(attemptAttach, RETRY_DELAY_MS);
    };

    const handleTidioReady = () => {
      window.tidioChatApi = window.tidioChatApi || (window as any)?.tidioChatApi;
      attemptAttach();
    };

    document.addEventListener('tidioChat-ready', handleTidioReady);
    cleanupFns.push(() => document.removeEventListener('tidioChat-ready', handleTidioReady));

    apiInterval = window.setInterval(() => {
      if (window.tidioChatApi && typeof window.tidioChatApi.on === 'function') {
        handleTidioReady();
        if (apiInterval !== null) {
          window.clearInterval(apiInterval);
          apiInterval = null;
        }
      }
    }, 500);

    attemptAttach();

    return () => {
      if (retryTimeout !== null) {
        window.clearTimeout(retryTimeout);
      }
      if (apiInterval !== null) {
        window.clearInterval(apiInterval);
      }
      cleanupFns.forEach((cleanup) => {
        try {
          cleanup();
        } catch {
          // no-op
        }
      });
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return null;
};

export default TidioListener;

