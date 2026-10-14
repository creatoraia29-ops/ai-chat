import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { generateAgentReply } from './gemini.js';

const app = express();
const port = Number(process.env.PORT) || 3001;

app.use(cors({ origin: true }));
app.use(express.json({ limit: '32kb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    model: process.env.GEMINI_MODEL || 'gemini-3-flash-preview',
  });
});

app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body ?? {};

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Нужно поле message' });
  }

  try {
    const text = await generateAgentReply(message, history);
    return res.json({ text, role: 'agent' });
  } catch (error) {
    console.error('[chat]', error);
    const status = error.message?.includes('GEMINI_API_KEY') ? 503 : 500;
    return res.status(status).json({
      error:
        status === 503
          ? 'Сервер не настроен: добавьте GEMINI_API_KEY в .env'
          : 'Не удалось получить ответ от ассистента',
    });
  }
});

const server = app.listen(port, () => {
  console.log(`API: http://localhost:${port}`);
  if (!process.env.GEMINI_API_KEY) {
    console.warn('GEMINI_API_KEY не задан — /api/chat вернёт 503');
  }
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Порт ${port} уже занят. Остановите другой процесс API или смените PORT в .env`);
  } else {
    console.error(error);
  }
  process.exit(1);
});
