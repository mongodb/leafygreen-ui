import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import InfoWithCircleIcon from '@leafygreen-ui/icon/dist/InfoWithCircle';
import { Size, Variant } from '@leafygreen-ui/tokens';
import { Body, Description, Label } from '@leafygreen-ui/typography';

import {
  baseStyles,
  headerStyles,
  headerValueStyles,
  progressBarStyles,
} from './ProgressBar.styles';
import { ProgressBarProps } from './ProgressBar.types';

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
  const valueDisplay = value
    ? valueType === 'fraction'
      ? `${value}/${maxValue}`
      : valueType === 'percentage'
      ? `${Math.round((value / maxValue) * 100)}%`
      : `${value}`
    : '';

  const valueUnitsDisplay = valueUnits ? ` ${valueUnits}` : '';

  return (
    <div className={cx(baseStyles)}>
      <div className={cx(headerStyles)}>
        <Label htmlFor={'temporary'}>{label}</Label>
        <Body className={cx(headerValueStyles)}>
          {`${valueDisplay}${valueUnitsDisplay}`}

          {/* temporary */}
          {showIcon && <InfoWithCircleIcon />}
        </Body>
      </div>

      <div
        role="progressbar"
        className={cx(progressBarStyles)}
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={maxValue}
      ></div>

      <Description>{description}</Description>
    </div>
  );
}

ProgressBar.displayName = 'ProgressBar';
