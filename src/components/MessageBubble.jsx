export function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  const time = new Date(message.createdAt).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <article className={`chat-widget__row chat-widget__row--${isUser ? 'user' : 'agent'}`}>
      <div className={`chat-widget__bubble chat-widget__bubble--${isUser ? 'user' : 'agent'}`}>
        <p>{message.text}</p>
        <time dateTime={message.createdAt}>{time}</time>
      </div>
    </article>
  );
}
