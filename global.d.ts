export {};

declare global {
  interface Window {
    tidioChatApi?: {
      on?: (event: string, handler: (...args: any[]) => void) => void;
      off?: (event: string, handler: (...args: any[]) => void) => void;
      displayMessage?: (payload: { type: string; message: string }) => void;
      hideLastBotMessage?: () => void;
      [key: string]: any;
    };
    __latestUserMessage?: string;
    __lastUserMessage?: string;
    __lastUserFilters?: import('@/utils/tidioAnswer').ParsedFilters;
    __tidioBadAnswerDetected?: import('@/components/TidioListener').TidioMessage;
    __correctedAnswer?: string;
    __tidioDebugLog?: Array<{
      timestamp: number;
      [key: string]: any;
    }>;
  }
}

