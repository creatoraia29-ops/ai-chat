import { AGENT } from '../mock/agent.js';
import { useTheme } from '../context/ThemeContext.jsx';

export function ChatHeader({ onClose, onMinimize }) {
  const { theme, toggleTheme } = useTheme();
  const nextThemeLabel = theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему';

  return (
    <header className="chat-widget__header">
      <div className="chat-widget__agent">
        <span className="chat-widget__avatar" style={{ background: AGENT.avatarColor }}>
          {AGENT.initials}
        </span>
        <span className="chat-widget__agent-text">
          <span className="chat-widget__agent-name">{AGENT.name}</span>
          <span className="chat-widget__agent-status">
            <span className="chat-widget__status-dot" aria-hidden="true" />
            {AGENT.statusLabel}
            <span className="chat-widget__agent-role"> · {AGENT.role}</span>
          </span>
        </span>
      </div>
      <div className="chat-widget__header-actions">
        <button
          type="button"
          className="chat-widget__icon-btn"
          aria-label={nextThemeLabel}
          onClick={toggleTheme}
        >
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
        <button
          type="button"
          className="chat-widget__icon-btn"
          aria-label="Свернуть чат"
          onClick={onMinimize}
        >
          <MinusIcon />
        </button>
        <button
          type="button"
          className="chat-widget__icon-btn"
          aria-label="Закрыть чат"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      </div>
    </header>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.5 3.2a8.2 8.2 0 1 0 6.3 12.6A7 7 0 0 1 14.5 3.2Z"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        d="M12 3v2.2M12 18.8V21M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M3 12h2.2M18.8 12H21M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" d="M6 12h12" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        d="M7 7l10 10M17 7 7 17"
      />
    </svg>
  );
}
