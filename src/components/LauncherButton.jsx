import { useState } from 'react';

const LAUNCHER_USED_KEY = 'chat-widget-launcher-used';

const SAND_GRAINS = [
  { left: '10%', top: '8%', dx: '-14px', dy: '38px', delay: '0s', size: '3px', color: '#e6c98a' },
  { left: '22%', top: '2%', dx: '-8px', dy: '46px', delay: '0.05s', size: '2px', color: '#d7b56d' },
  { left: '34%', top: '0%', dx: '-2px', dy: '42px', delay: '0.12s', size: '3px', color: '#f0ddb0' },
  { left: '46%', top: '0%', dx: '3px', dy: '48px', delay: '0.04s', size: '2px', color: '#c9a15a' },
  { left: '58%', top: '2%', dx: '8px', dy: '40px', delay: '0.16s', size: '3px', color: '#e8d09a' },
  { left: '72%', top: '8%', dx: '14px', dy: '44px', delay: '0.08s', size: '2px', color: '#b8904e' },
  { left: '84%', top: '18%', dx: '16px', dy: '36px', delay: '0.2s', size: '3px', color: '#efd7a4' },
  { left: '4%', top: '22%', dx: '-16px', dy: '34px', delay: '0.18s', size: '2px', color: '#d4b06a' },
  { left: '16%', top: '16%', dx: '-10px', dy: '50px', delay: '0.28s', size: '2px', color: '#f3e2bc' },
  { left: '78%', top: '16%', dx: '12px', dy: '52px', delay: '0.24s', size: '2px', color: '#c49a52' },
  { left: '28%', top: '10%', dx: '-6px', dy: '54px', delay: '0.32s', size: '2px', color: '#e2c07a' },
  { left: '64%', top: '12%', dx: '7px', dy: '50px', delay: '0.36s', size: '3px', color: '#f6e6c4' },
  { left: '40%', top: '6%', dx: '0px', dy: '56px', delay: '0.1s', size: '2px', color: '#cda866' },
  { left: '52%', top: '8%', dx: '4px', dy: '52px', delay: '0.4s', size: '2px', color: '#ddc08a' },
  { left: '8%', top: '34%', dx: '-12px', dy: '30px', delay: '0.14s', size: '2px', color: '#e9d3a0' },
  { left: '88%', top: '32%', dx: '12px', dy: '32px', delay: '0.22s', size: '2px', color: '#c4a15c' },
];

function readLauncherUsed() {
  try {
    return localStorage.getItem(LAUNCHER_USED_KEY) === '1';
  } catch {
    return false;
  }
}

export function LauncherButton({ isOpen, unreadCount, onClick }) {
  const label = isOpen ? 'Закрыть чат' : 'Открыть чат';
  const [hasClicked, setHasClicked] = useState(readLauncherUsed);
  const showSand = !hasClicked && !isOpen;

  function handleClick() {
    if (!hasClicked) {
      setHasClicked(true);
      try {
        localStorage.setItem(LAUNCHER_USED_KEY, '1');
      } catch {
        // эффект просто не сохранится между визитами
      }
    }
    onClick();
  }

  return (
    <div className="chat-widget__launcher-wrap">
      {showSand && (
        <span className="chat-widget__sand" aria-hidden="true">
          {SAND_GRAINS.map((grain) => (
            <span
              key={`${grain.left}-${grain.delay}`}
              className="chat-widget__grain"
              style={{
                left: grain.left,
                top: grain.top,
                '--dx': grain.dx,
                '--dy': grain.dy,
                '--delay': grain.delay,
                '--size': grain.size,
                '--color': grain.color,
              }}
            />
          ))}
        </span>
      )}
      <button
        type="button"
        className={`chat-widget__launcher${isOpen ? ' chat-widget__launcher--open' : ''}${showSand ? ' chat-widget__launcher--sand' : ''}`}
        aria-label={label}
        aria-expanded={isOpen}
        onClick={handleClick}
      >
        {isOpen ? <CloseIcon /> : <AgentAvatar />}
      </button>
      {!isOpen && unreadCount > 0 && (
        <span className="chat-widget__badge">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </div>
  );
}

function AgentAvatar() {
  return (
    <svg className="chat-widget__avatar-mark" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="32" fill="#f7f8f7" />
      <path d="M14 64v-14c0-8 7-14 18-14s18 6 18 14v14" fill="#1a9f5c" />
      <path d="M22 30c0-8 4.2-13 10-13s10 5 10 13" fill="#2c3330" />
      <circle cx="32" cy="30" r="10" fill="#f3d2b8" />
      <path
        d="M19 31c1.2-11 6.2-17 13-17s11.8 6 13 17"
        fill="none"
        stroke="#2c3330"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <rect x="15.5" y="27" width="5.5" height="10" rx="2.4" fill="#2c3330" />
      <rect x="43" y="27" width="5.5" height="10" rx="2.4" fill="#2c3330" />
      <circle cx="28.5" cy="30" r="1.15" fill="#2c3330" />
      <circle cx="35.5" cy="30" r="1.15" fill="#2c3330" />
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
        d="M6 6l12 12M18 6 6 18"
      />
    </svg>
  );
}
