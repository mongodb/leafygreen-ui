import React from 'react';

import RefreshIcon from '@leafygreen-ui/icon/dist/Refresh';
import { InputOption } from '@leafygreen-ui/input-option';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { palette } from '@leafygreen-ui/palette';

import { loadingOptionIcon, loadingOptionStyles } from './LoadingOption.styles';

export const LoadingOption = () => {
  const { darkMode } = useDarkMode();

  return (
    <InputOption
      data-testid="lg-search-input-loading-option"
      aria-label="Loading results"
      isInteractive={false}
      className={loadingOptionStyles}
    >
      <RefreshIcon
        color={darkMode ? palette.blue.light1 : palette.blue.base}
        className={loadingOptionIcon}
      />
      <span>Loading results</span>
    </InputOption>
  );
};
