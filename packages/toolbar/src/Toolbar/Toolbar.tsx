import React from 'react';

import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { getBaseStyles } from './Toolbar.styles';
import { type ToolbarProps } from './Toolbar.types';

export const Toolbar = React.forwardRef<HTMLUListElement, ToolbarProps>(
  ({ children, darkMode: darkModeProp }: ToolbarProps, forwardedRef) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <ul
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
          role="toolbar"
          ref={forwardedRef}
          className={getBaseStyles({ theme })}
          aria-controls="toolbar"
          aria-orientation="vertical"
          tabIndex={0}
        >
          {children}
        </ul>
      </LeafyGreenProvider>
    );
  },
);

Toolbar.displayName = 'Toolbar';
