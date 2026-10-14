import { GoogleGenerativeAI } from '@google/generative-ai';
import { SYSTEM_INSTRUCTION } from './systemPrompt.js';

const modelName = process.env.GEMINI_MODEL || 'gemini-3-flash-preview';

function getModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY не задан');
  }
  const client = new GoogleGenerativeAI(apiKey);
  return client.getGenerativeModel({
    model: modelName,
    systemInstruction: SYSTEM_INSTRUCTION,
  });
}

function toGeminiHistory(history) {
  if (!Array.isArray(history)) return [];

  const items = history.filter(
    (item) => item?.text && (item.role === 'user' || item.role === 'agent'),
  );

  const firstUserIndex = items.findIndex((item) => item.role === 'user');
  if (firstUserIndex === -1) return [];

  const normalized = [];
  for (const item of items.slice(firstUserIndex)) {
    const role = item.role === 'agent' ? 'model' : 'user';
    const text = String(item.text);
    const last = normalized[normalized.length - 1];

    if (last && last.role === role) {
      last.parts[0].text += `\n${text}`;
      continue;
    }

    normalized.push({ role, parts: [{ text }] });
  }

  if (normalized[0]?.role !== 'user') return [];

  return normalized;
}

export async function generateAgentReply(message, history = []) {
  const model = getModel();
  const trimmed = String(message || '').trim();
  if (!trimmed) {
    throw new Error('Пустое сообщение');
  }

  const past = toGeminiHistory(history);
  const chat = model.startChat({ history: past });
  const result = await chat.sendMessage(trimmed);
  const text = result.response.text()?.trim();

  if (!text) {
    throw new Error('Пустой ответ от модели');
  }

  return text;
}
