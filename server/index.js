const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { buildCorrectedAnswer } = require('./utils/tidioAnswer');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/ai/fix-answer', async (req, res) => {
  const { question, badAnswer, locale, filters } = req.body ?? {};

  if (!question) {
    return res.status(400).json({ error: 'Missing question' });
  }

  if (!badAnswer) {
    return res.status(400).json({ error: 'Missing bad answer' });
  }

  const normalizedLocale = typeof locale === 'string' && locale.length === 2 ? locale : 'en';
  const presetFilters = filters && typeof filters === 'object' ? filters : undefined;
  const { answer } = buildCorrectedAnswer(question, normalizedLocale, presetFilters);

  res.json({ success: true, answer });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

