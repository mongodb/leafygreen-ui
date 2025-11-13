import React from 'react';

import { Button, Size as ButtonSize } from '@leafygreen-ui/button';
import ArrowDownIcon from '@leafygreen-ui/icon/dist/ArrowDown';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import {
  scrollButtonContainerStyles,
  scrollButtonStyles,
} from './ScrollToLatestButton.styles';
import { ScrollToLatestButtonProps } from './ScrollToLatestButton.types';

export const ScrollToLatestButton = ({
  darkMode: darkModeProp,
  onClick,
  visible,
}: ScrollToLatestButtonProps) => {
  const { darkMode } = useDarkMode(darkModeProp);

  if (!visible) {
    return null;
  }

  return (
    <div className={scrollButtonContainerStyles}>
      <Button
        aria-label="Scroll to latest message"
        className={scrollButtonStyles}
        darkMode={darkMode}
        onClick={onClick}
        rightGlyph={<ArrowDownIcon />}
        size={ButtonSize.Small}
      >
        Scroll to latest
      </Button>
    </div>
  );
};

ScrollToLatestButton.displayName = 'ScrollToLatestButton';
