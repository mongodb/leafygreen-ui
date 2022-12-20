import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { InputOption } from '@leafygreen-ui/input-option';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import {
  emptyOptionStyles,
  emptyOptionThemeStyles,
} from './EmptyOption.styles';

export const EmptyOption = () => {
  const { theme } = useDarkMode();

  return (
    <InputOption
      aria-label="No results found"
      isInteractive={false}
      className={cx(emptyOptionStyles, emptyOptionThemeStyles[theme])}
    >
      <span>No results found</span>
    </InputOption>
  );
};
