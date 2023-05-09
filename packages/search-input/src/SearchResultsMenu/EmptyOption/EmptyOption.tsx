import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { MenuOption } from '@leafygreen-ui/menu-option';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import {
  emptyOptionStyles,
  emptyOptionThemeStyles,
} from './EmptyOption.styles';

export const EmptyOption = () => {
  const { theme } = useDarkMode();

  return (
    <MenuOption
      aria-label="No results found"
      isInteractive={false}
      className={cx(emptyOptionStyles, emptyOptionThemeStyles[theme])}
    >
      <span>No results found</span>
    </MenuOption>
  );
};
