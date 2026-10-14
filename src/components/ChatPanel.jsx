import { ChatHeader } from './ChatHeader.jsx';
import { ChatInput } from './ChatInput.jsx';
import { MessageList } from './MessageList.jsx';

export function ChatPanel({ messages, isTyping, onSend, onClose, onMinimize }) {
  return (
    <section className="chat-widget__panel" role="dialog" aria-label="Чат с консультантом">
      <ChatHeader onClose={onClose} onMinimize={onMinimize} />
      <MessageList messages={messages} isTyping={isTyping} />
      <ChatInput onSend={onSend} disabled={isTyping} />
    </section>
  );
}
