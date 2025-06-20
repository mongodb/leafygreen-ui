import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { getNodeTextContent } from '@leafygreen-ui/lib';
import { Size, Variant } from '@leafygreen-ui/tokens';
import { Body, Description, Label } from '@leafygreen-ui/typography';

import {
  containerStyles,
  getDeterminateProgressBarFillStyles,
  getHeaderIconStyles,
  getHeaderValueStyles,
  getProgressBarFillStyles,
  getProgressBarTrackStyles,
  headerStyles,
  indeterminateProgressBarFillStyles,
} from './ProgressBar.styles';
import { ProgressBarProps } from './ProgressBar.types';
import {
  DEFAULT_MAX_VALUE,
  getFormattedValue,
  getHeaderIcon,
  getPercentage,
  getValueAriaAttributes,
  iconsVisibleOnComplete,
} from './ProgressBar.utils';

export function ProgressBar({
  variant = Variant.Info,
  label,
  size = Size.Default,
  description,
  darkMode = false,
  disabled = false,
  formatValue,
  showIcon: showIconProps = false,
  ...rest
}: ProgressBarProps) {
  const { theme } = useDarkMode(darkMode);

  const isDeterminate = !rest.isIndeterminate;

  const value = rest.value ?? undefined;

  const maxValue = isDeterminate
    ? rest.maxValue ?? DEFAULT_MAX_VALUE
    : undefined;

  const showIcon = iconsVisibleOnComplete.includes(variant)
    ? showIconProps && isDeterminate && value === maxValue
    : showIconProps;

  const getTypedProgressBarFillStyles = () => {
    if (!isDeterminate) return indeterminateProgressBarFillStyles;

    if (value)
      return getDeterminateProgressBarFillStyles(
        getPercentage(value, maxValue),
      );
  };

  const progressBarId = `progress-bar-${
    getNodeTextContent(label) || 'default'
  }`;

  return (
    <div className={cx(containerStyles)} aria-disabled={disabled}>
      <div className={cx(headerStyles)}>
        <Label htmlFor={progressBarId} darkMode={darkMode} disabled={disabled}>
          {label}
        </Label>

        {formatValue && (
          <Body
            className={cx(getHeaderValueStyles(theme, disabled))}
            darkMode={darkMode}
          >
            {value && getFormattedValue(value, maxValue, formatValue)}

            {showIcon &&
              getHeaderIcon(variant, disabled, {
                className: cx(getHeaderIconStyles(theme, variant, disabled)),
              })}
          </Body>
        )}
      </div>

      <div
        role="progressbar"
        id={progressBarId}
        aria-label={progressBarId}
        {...(value && getValueAriaAttributes(value, maxValue))}
      >
        <div
          data-testid="progress-bar-track"
          className={cx(getProgressBarTrackStyles(theme, size))}
        >
          <div
            data-testid="progress-bar-fill"
            className={cx(
              getProgressBarFillStyles(theme, variant, disabled),
              getTypedProgressBarFillStyles(),
            )}
          ></div>
        </div>
      </div>

      {description && (
        <Description darkMode={darkMode} disabled={disabled}>
          {description}
        </Description>
      )}
    </div>
  );
}

ProgressBar.displayName = 'ProgressBar';
