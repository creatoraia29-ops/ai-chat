import { FALLBACK_REPLY, REPLY_RULES } from '../mock/replies.js';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

function pickMockReply(userText) {
  const normalized = userText.toLowerCase();
  const rule = REPLY_RULES.find((item) =>
    item.keywords.some((keyword) => normalized.includes(keyword)),
  );
  return rule ? rule.reply : FALLBACK_REPLY;
}

function toApiHistory(messages) {
  return messages
    .filter((item) => item.role === 'user' || item.role === 'agent')
    .map((item) => ({
      role: item.role,
      text: item.text,
    }));
}

export async function fetchAgentReply(userText, messagesBeforeSend) {
  if (USE_MOCK) {
    await new Promise((resolve) => {
      setTimeout(resolve, 800 + Math.floor(Math.random() * 700));
    });
    return pickMockReply(userText);
  }

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: userText,
      history: toApiHistory(messagesBeforeSend),
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const hint = data.error || 'Проверьте, что запущен backend (npm run dev:server) и задан GEMINI_API_KEY.';
    throw new Error(hint);
  }

  if (!data.text) {
    throw new Error('Сервер вернул пустой ответ');
  }

  return data.text;
}
