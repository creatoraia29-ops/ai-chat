import { ThemeProvider, useTheme } from '../context/ThemeContext.jsx';
import { useState } from 'react';
import { useChat } from '../hooks/useChat.js';
import { ChatPanel } from './ChatPanel.jsx';
import { LauncherButton } from './LauncherButton.jsx';

function ChatWidgetView() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isTyping, unreadCount, sendMessage } = useChat(isOpen);

  function openChat() {
    setIsOpen(true);
  }

  function closeChat() {
    setIsOpen(false);
  }

  return (
    <div className="chat-widget" data-theme={theme}>
      {isOpen && (
        <ChatPanel
          messages={messages}
          isTyping={isTyping}
          onSend={sendMessage}
          onClose={closeChat}
          onMinimize={closeChat}
        />
      )}
      <LauncherButton
        isOpen={isOpen}
        unreadCount={isOpen ? 0 : unreadCount}
        onClick={isOpen ? closeChat : openChat}
      />
    </div>
  );
}

export function ChatWidget() {
  return (
    <ThemeProvider>
      <ChatWidgetView />
    </ThemeProvider>
  );
}
