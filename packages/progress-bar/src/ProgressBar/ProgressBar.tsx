import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
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
  iconsOnCompletion,
} from './ProgressBar.utils';

export function ProgressBar({
  type,
  value,
  variant = Variant.Info,
  label,
  valueType = 'fraction',
  maxValue = 100,
  valueUnits,
  showValue = true,
  showIcon: showIconProps = false,
  size = Size.Default,
  description,
  darkMode = false,
  disabled = false,
  ...rest
}: ProgressBarProps) {
  const { theme } = useDarkMode(darkMode);

  const valueDisplay = value
    ? valueType === 'fraction'
      ? `${value}/${maxValue}`
      : valueType === 'percentage'
      ? getPercentage(value, maxValue)
      : value
    : '';

  const valueUnitsDisplay = valueType === 'percentage' ? '%' : valueUnits || '';

  const showIcon = iconsOnCompletion.includes(variant)
    ? showIconProps && value === maxValue
    : showIconProps;

  return (
    <div className={cx(containerStyles)}>
      <div className={cx(headerStyles)}>
        {label && <Label htmlFor={`progress bar for ${label}`}>{label}</Label>}
        {(showValue || showIcon) && (
          <Body className={cx(headerValueStyles, getHeaderValueStyles(theme))}>
            {showValue && `${valueDisplay}${valueUnitsDisplay}`}
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
        aria-label={label}
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

      {description && <Description>{description}</Description>}
    </div>
  );
}

ProgressBar.displayName = 'ProgressBar';
