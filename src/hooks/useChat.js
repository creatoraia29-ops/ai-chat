import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchAgentReply } from '../api/chat.js';
import { INITIAL_MESSAGES } from '../mock/initialMessages.js';

function createMessage(role, text) {
  return {
    id: crypto.randomUUID(),
    role,
    text,
    createdAt: new Date().toISOString(),
  };
}

export function useChat(isOpen) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(
    INITIAL_MESSAGES.filter((message) => message.role === 'agent').length,
  );
  const isOpenRef = useRef(isOpen);
  const isTypingRef = useRef(false);
  const messagesRef = useRef(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    isOpenRef.current = isOpen;
    if (isOpen) setUnreadCount(0);
  }, [isOpen]);

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isTypingRef.current) return;

    const historySnapshot = messagesRef.current;
    isTypingRef.current = true;
    setMessages((prev) => [...prev, createMessage('user', trimmed)]);
    setIsTyping(true);

    try {
      const replyText = await fetchAgentReply(trimmed, historySnapshot);
      setMessages((prev) => [...prev, createMessage('agent', replyText)]);
      if (!isOpenRef.current) {
        setUnreadCount((count) => count + 1);
      }
    } catch (error) {
      const fallback =
        error instanceof Error
          ? error.message
          : 'Не удалось отправить сообщение. Попробуйте ещё раз.';
      setMessages((prev) => [
        ...prev,
        createMessage(
          'agent',
          `Извините, сейчас не получается ответить: ${fallback}`,
        ),
      ]);
    } finally {
      isTypingRef.current = false;
      setIsTyping(false);
    }
  }, []);

  return { messages, isTyping, unreadCount, sendMessage };
}
