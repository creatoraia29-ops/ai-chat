import { useEffect, useRef, useState } from 'react';

export function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState('');
  const fieldRef = useRef(null);

  useEffect(() => {
    fieldRef.current?.focus();
  }, []);

  function syncHeight(element) {
    element.style.height = 'auto';
    element.style.height = `${Math.min(element.scrollHeight, 120)}px`;
  }

  function submit() {
    if (disabled || !value.trim()) return;
    onSend(value);
    setValue('');
    if (fieldRef.current) {
      fieldRef.current.style.height = 'auto';
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  }

  return (
    <form
      className="chat-widget__composer"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <label className="chat-widget__sr" htmlFor="chat-message">
        Сообщение
      </label>
      <textarea
        id="chat-message"
        ref={fieldRef}
        rows={1}
        placeholder="Напишите сообщение…"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          syncHeight(event.target);
        }}
        onKeyDown={handleKeyDown}
      />
      <button type="submit" aria-label="Отправить" disabled={disabled || !value.trim()}>
        <SendIcon />
      </button>
    </form>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2 .01 7z" />
    </svg>
  );
}
