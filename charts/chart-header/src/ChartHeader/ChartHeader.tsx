import React from 'react';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Body } from '@leafygreen-ui/typography';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { buttonContainerStyles, getHeaderStyles } from './ChartHeader.styles';
import { ChartHeaderProps } from './ChartHeader.types';

export function ChartHeader({
  darkMode: darkModeProp,
  closeButtonProps,
  expandButtonProps,
  resetButtonProps,
  label,
}: ChartHeaderProps) {
  const { theme } = useDarkMode(darkModeProp);

  console.log(label);

  return (
    <header className={getHeaderStyles(theme)}>
      <Body weight="regular" baseFontSize={16}>
        {label}
      </Body>
      <div className={buttonContainerStyles}>
        {resetButtonProps?.show && (
          <IconButton
            aria-label="Reset Zoom"
            darkMode={darkModeProp}
            onClick={resetButtonProps.onClick}
          >
            <Icon glyph="Return" aria-hidden />
          </IconButton>
        )}
        {expandButtonProps?.show && (
          <IconButton
            aria-label="Expand Chart"
            darkMode={darkModeProp}
            onClick={expandButtonProps?.onClick}
          >
            <Icon glyph="FullScreenEnter" aria-hidden />
          </IconButton>
        )}
        {closeButtonProps?.show && (
          <IconButton
            aria-label="Close Chart"
            darkMode={darkModeProp}
            onClick={closeButtonProps.onClick}
          >
            <Icon glyph="X" aria-hidden />
          </IconButton>
        )}
      </div>
    </header>
  );
}
