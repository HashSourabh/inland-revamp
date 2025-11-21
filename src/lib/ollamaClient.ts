export async function askOllama(prompt: string): Promise<string> {
  if (!prompt || typeof prompt !== 'string') {
    throw new Error('Prompt must be a non-empty string');
  }

  let response: Response;
  try {
    response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.1:8b',
        prompt,
        stream: false,
      }),
    });
  } catch {
    throw new Error('Unable to reach Ollama. Is it running on port 11434?');
  }

  if (!response.ok) {
    let errorMessage = 'Ollama request failed';
    try {
      const errorBody = await response.json();
      errorMessage = errorBody?.error || errorMessage;
    } catch {
      errorMessage = await response.text();
    }

    if (
      errorMessage.toLowerCase().includes('model') &&
      errorMessage.toLowerCase().includes('not found')
    ) {
      throw new Error("Ollama model 'llama3.1:8b' not found. Pull it with `ollama pull llama3.1`.");
    }

    throw new Error(errorMessage || 'Failed to generate response from Ollama.');
  }

  const data = await response.json().catch(() => null);
  if (!data || typeof data.response !== 'string') {
    throw new Error('Unexpected response from Ollama.');
  }

  return data.response.trim();
}



