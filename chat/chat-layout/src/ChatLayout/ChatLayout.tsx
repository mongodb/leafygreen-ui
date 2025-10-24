import React, { useCallback, useState } from 'react';

import { getContainerStyles } from './ChatLayout.styles';
import { ChatLayoutProps } from './ChatLayout.types';
import { ChatLayoutContext } from './ChatLayoutContext';

/**
 * ChatLayout is a context provider that manages the pinned state of the side nav
 * and provides it to all child components.
 *
 * Context is primarily used by ChatSideNav and ChatMain.
 */
export function ChatLayout({
  children,
  className,
  initialIsPinned = true,
  onTogglePinned,
  ...rest
}: ChatLayoutProps) {
  const [isPinned, setIsPinned] = useState(initialIsPinned);

  const togglePin = useCallback(() => {
    const newValue = !isPinned;
    setIsPinned(newValue);
    onTogglePinned?.(newValue);
  }, [isPinned, onTogglePinned]);

  return (
    <ChatLayoutContext.Provider value={{ isPinned, togglePin }}>
      <div className={getContainerStyles({ className, isPinned })} {...rest}>
        {children}
      </div>
    </ChatLayoutContext.Provider>
  );
}

ChatLayout.displayName = 'ChatLayout';
