import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Size, Variant } from '@leafygreen-ui/tokens';
import { Body, Description, Label } from '@leafygreen-ui/typography';

import {
  containerStyles,
  getHeaderIconStyles,
  getProgressBarFillStyles,
  getProgressBarTrackStyles,
  headerStyles,
  headerValueStyles,
  progressBarFillStyles,
  progressBarTrackStyles,
} from './ProgressBar.styles';
import { ProgressBarProps } from './ProgressBar.types';
import { getHeaderIcon } from './ProgressBar.utils';

export function ProgressBar({
  type,
  value,
  variant = Variant.Info,
  label,
  valueType = 'fraction',
  maxValue = 100,
  valueUnits,
  showIcon = false,
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
      ? `${Math.round((value / maxValue) * 100)}%`
      : `${value}`
    : '';

  const valueUnitsDisplay = valueUnits ? ` ${valueUnits}` : '';

  return (
    <div className={cx(containerStyles)}>
      <div className={cx(headerStyles)}>
        <Label htmlFor={'temporary'}>{label}</Label>
        <Body className={cx(headerValueStyles)}>
          {`${valueDisplay}${valueUnitsDisplay}`}
          {showIcon &&
            getHeaderIcon(variant, {
              className: cx(getHeaderIconStyles(theme, variant)),
            })}
        </Body>
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
            )}
          ></div>
        </div>
      </div>

      <Description>{description}</Description>
    </div>
  );
}

ProgressBar.displayName = 'ProgressBar';
