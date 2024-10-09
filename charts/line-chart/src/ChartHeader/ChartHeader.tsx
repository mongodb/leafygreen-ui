import React from 'react';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { DarkModeProps } from '@leafygreen-ui/lib';
import { Body } from '@leafygreen-ui/typography';
import Icon from '@leafygreen-ui/icon';
import { getButtonStyles, getHeaderStyles } from './ChartHeader.styles';

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

export function ChartHeader({ darkMode, label }: ChartHeaderProps) {
  const { theme } = useDarkMode(darkMode);

  return (
    <header className={getHeaderStyles(theme)}>
      <Body weight="regular" baseFontSize={16}>
        {label}
      </Body>
      <div>
        <button
          type="button"
          aria-label="Reset Zoom"
          className={getButtonStyles(theme)}
        >
          <Icon glyph="Return" aria-hidden />
        </button>
        <button
          type="button"
          aria-label="Expand Chart"
          className={getButtonStyles(theme)}
        >
          <Icon glyph="FullScreenEnter" aria-hidden />
        </button>
        <button
          type="button"
          aria-label="Close Chart"
          className={getButtonStyles(theme)}
        >
          <Icon glyph="X" aria-hidden />
        </button>
      </div>
    </header>
  );
}
