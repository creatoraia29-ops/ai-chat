import { generateAgentReply } from '../server/gemini.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не поддерживается' });
  }

  const { message, history } = req.body ?? {};

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Нужно поле message' });
  }

  try {
    const text = await generateAgentReply(message, history);
    return res.status(200).json({ text, role: 'agent' });
  } catch (error) {
    console.error('[chat]', error);
    const status = error.message?.includes('GEMINI_API_KEY') ? 503 : 500;
    return res.status(status).json({
      error:
        status === 503
          ? 'Сервер не настроен: добавьте GEMINI_API_KEY в Vercel'
          : 'Не удалось получить ответ от ассистента',
    });
  }
}
