import type { NextApiRequest, NextApiResponse } from 'next';
import { buildCorrectedAnswer, type ParsedFilters } from '@/utils/tidioAnswer';

type SuccessResponse = {
  success: true;
  answer: string;
};

type ErrorResponse = {
  error: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<SuccessResponse | ErrorResponse>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { question, badAnswer, locale, filters } = req.body ?? {};

  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Missing question' });
  }

  if (!badAnswer || typeof badAnswer !== 'string') {
    return res.status(400).json({ error: 'Missing bad answer' });
  }

  const normalizedLocale = typeof locale === 'string' && locale.length === 2 ? locale : 'en';
  const presetFilters: ParsedFilters | undefined =
    filters && typeof filters === 'object' ? (filters as ParsedFilters) : undefined;
  const { answer } = buildCorrectedAnswer(question, normalizedLocale, presetFilters);

  return res.status(200).json({
    success: true,
    answer,
  });
}

