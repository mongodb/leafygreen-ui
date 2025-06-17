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
  headerIconStyles,
  headerStyles,
  headerValueStyles,
  progressBarFillStyles,
  progressBarTrackStyles,
} from './ProgressBar.styles';
import { ProgressBarProps } from './ProgressBar.types';
import {
  getHeaderIcon,
  getPercentage,
  getValueDisplay,
  iconsOnCompletion,
} from './ProgressBar.utils';

export function ProgressBar({
  type,
  value,
  variant = Variant.Info,
  label,
  valueDisplayFormat = 'fraction',
  maxValue = 100,
  valueUnits,
  showValue = false,
  showIcon: showIconProps = false,
  size = Size.Default,
  description,
  darkMode = false,
  disabled = false,
  ...rest
}: ProgressBarProps) {
  const { theme } = useDarkMode(darkMode);

  const progressBarId = `progress-bar-${label || 'default'}`;

  const showIcon = iconsOnCompletion.includes(variant)
    ? showIconProps && value === maxValue
    : showIconProps;

  return (
    <div className={cx(containerStyles)}>
      <div className={cx(headerStyles)}>
        {/* Label is rendered even if empty for layout purposes */}
        <Label htmlFor={progressBarId} darkMode={darkMode}>
          {label}
        </Label>

        {(showValue || showIcon) && (
          <Body
            className={cx(headerValueStyles, getHeaderValueStyles(theme))}
            darkMode={darkMode}
          >
            {showValue &&
              getValueDisplay(value, maxValue, valueDisplayFormat, valueUnits)}

            {showIcon &&
              getHeaderIcon(variant, {
                className: cx(
                  headerIconStyles,
                  getHeaderIconStyles(theme, variant),
                ),
              })}
          </Body>
        )}
      </div>

      <div
        role="progressbar"
        id={progressBarId}
        aria-label={getNodeTextContent(label)}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={maxValue}
      >
        <div
          className={cx(
            progressBarTrackStyles,
            getProgressBarTrackStyles(theme, size),
          )}
        >
          <div
            className={cx(
              progressBarFillStyles,
              getProgressBarFillStyles(theme, variant, size),
              type === 'determinate' &&
                getDeterminateProgressBarFillStyles(
                  getPercentage(value, maxValue),
                ),
            )}
          ></div>
        </div>
      </div>

      {description && (
        <Description darkMode={darkMode}>{description}</Description>
      )}
    </div>
  );
}

ProgressBar.displayName = 'ProgressBar';
