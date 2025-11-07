import React, { useCallback, useMemo, useState } from 'react';

import { getContainerStyles } from './ChatLayout.styles';
import { ChatLayoutProps } from './ChatLayout.types';
import { ChatLayoutContext } from './ChatLayoutContext';

/**
 * ChatLayout is a context provider that manages the pinned state of the side nav
 * and provides it to all child components. It uses CSS Grid to control the layout
 * and positioning the side nav and main content.
 */
export function ChatLayout({
  children,
  className,
  initialIsPinned = true,
  onTogglePinned,
  ...rest
}: ChatLayoutProps) {
  const [isPinned, setIsPinned] = useState(initialIsPinned);
  const [isSideNavHovered, setIsSideNavHovered] = useState(false);

  const togglePin = useCallback(() => {
    const newValue = !isPinned;
    setIsPinned(newValue);
    onTogglePinned?.(newValue);
  }, [isPinned, onTogglePinned]);

  const shouldRenderExpanded = isPinned || isSideNavHovered;

  const value = useMemo(
    () => ({
      isPinned,
      togglePin,
      isSideNavHovered,
      setIsSideNavHovered,
      shouldRenderExpanded,
    }),
    [
      isPinned,
      togglePin,
      isSideNavHovered,
      setIsSideNavHovered,
      shouldRenderExpanded,
    ],
  );

  return (
    <ChatLayoutContext.Provider value={value}>
      <div className={getContainerStyles({ className, isPinned })} {...rest}>
        {children}
      </div>
    </ChatLayoutContext.Provider>
  );
}

ChatLayout.displayName = 'ChatLayout';
