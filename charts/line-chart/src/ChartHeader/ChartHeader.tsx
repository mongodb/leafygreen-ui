import React from 'react';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { DarkModeProps } from '@leafygreen-ui/lib';
import { Body } from '@leafygreen-ui/typography';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { buttonContainerStyles, getHeaderStyles } from './ChartHeader.styles';

interface ChartHeaderProps extends DarkModeProps {
  label?: string;

  /**
   * Close button options.
   */
  closeButtonProps?: {
    /**
     * Controls whether the close button is shown.
     */
    show?: boolean;
    /**
     * Callback for when the close button is clicked.
     */
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  };

  /**
   * Expand button options.
   */
  expandButtonProps?: {
    /**
     * Controls whether the expand button is shown.
     */
    show: boolean;
    /**
     * Callback for when the expand button is clicked.
     */
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  };

  /**
   * Reset button options.
   */
  resetButtonProps?: {
    /**
     * Controls whether the reset button is shown.
     */
    show: boolean;
    /**
     * Callback for when the expand button is clicked.
     */
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  };
}

export function ChartHeader({
  darkMode: darkModeProp,
  label,
}: ChartHeaderProps) {
  const { theme } = useDarkMode(darkModeProp);

  return (
    <header className={getHeaderStyles(theme)}>
      <Body weight="regular" baseFontSize={16}>
        {label}
      </Body>
      <div className={buttonContainerStyles}>
        <IconButton aria-label="Reset Zoom" darkMode={darkModeProp}>
          <Icon glyph="Return" aria-hidden />
        </IconButton>
        <IconButton aria-label="Expand Chart" darkMode={darkModeProp}>
          <Icon glyph="FullScreenEnter" aria-hidden />
        </IconButton>
        <IconButton aria-label="Close Chart" darkMode={darkModeProp}>
          <Icon glyph="X" aria-hidden />
        </IconButton>
      </div>
    </header>
  );
}
