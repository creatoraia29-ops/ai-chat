import { AGENT } from '../mock/agent.js';

export function TypingIndicator() {
  return (
    <div className="chat-widget__row chat-widget__row--agent" aria-live="polite">
      <div className="chat-widget__typing">
        <span className="chat-widget__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="chat-widget__typing-label">{AGENT.name} печатает…</span>
      </div>
    </div>
  );
}
