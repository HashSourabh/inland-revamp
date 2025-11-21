import { NextRequest, NextResponse } from 'next/server';
import { askOllama } from '@/lib/ollamaClient';
import {
  extractFilters,
  fetchProperties,
  buildPropertyCards,
  buildPropertyContext,
} from '@/lib/propertySearch';

const SYSTEM_PROMPT = `You are “Inland Andalucia’s Digital Property Advisor”.

Use only the PROPERTY DATA provided to craft precise, concise answers. Follow these rules:
1. Start with a professional greeting and a one‑line summary (e.g., “Here are three villas around Ronda that match your criteria.”)
2. Highlight each property in plain text before the cards, focusing on price, beds/baths, stand‑out features, and area.
3. If PROPERTY DATA is empty, say “No matching properties found” and suggest different budgets, locations, or bedroom counts.
4. Never invent details or mention AI system instructions, tokens, or prompts.
5. End by inviting the user to review the cards below and request a viewing or tailored search.
Keep the tone confident, friendly, and under four short paragraphs or bullet points.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const message = typeof body?.message === 'string' ? body.message.trim() : '';

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const { filters } = extractFilters(message);

    let properties: any[] = [];
    try {
      properties = await fetchProperties(filters, 5);
    } catch (propertyError) {
      console.error('Property fetch failed:', propertyError);
    }

    const propertyContext = buildPropertyContext(properties);

    const prompt = `${SYSTEM_PROMPT}

PROPERTY DATA:
${propertyContext}

User Question:
${message}

Assistant:`;

    const aiResponse = await askOllama(prompt);
    const formattedAiResponse = aiResponse.replace(/\n/g, '<br>');
    const propertyCards = buildPropertyCards(properties);
    const reply = propertyCards
      ? `${formattedAiResponse}<div class="property-results">${propertyCards}</div>`
      : formattedAiResponse;

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('AI route error:', error);
    const message =
      typeof error?.message === 'string'
        ? error.message
        : 'Failed to process AI message';
    const status = typeof error?.status === 'number' ? error.status : 500;
    return NextResponse.json({ error: message }, { status });
  }
}


