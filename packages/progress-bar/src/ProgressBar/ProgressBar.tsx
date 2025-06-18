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
  DEFAULT_MAX_VALUE,
  getHeaderIcon,
  getPercentage,
  getValueDisplay,
  iconsOnCompletion,
} from './ProgressBar.utils';

export function ProgressBar({
  variant = Variant.Info,
  label,
  size = Size.Default,
  description,
  darkMode = false,
  disabled = false,
  ...rest
}: ProgressBarProps) {
  const { theme } = useDarkMode(darkMode);

  const hasValue = !rest.isIndeterminate;

  const renderValueDisplay = () => {
    if (!hasValue) return null;

    const {
      value,
      maxValue = DEFAULT_MAX_VALUE,
      formatValue,
      showIcon: showIconProps = false,
      enableAnimation = false,
    } = rest;

    if (!formatValue) return null;

    const showIcon = iconsOnCompletion.includes(variant)
      ? showIconProps && value === maxValue
      : showIconProps;

    return (
      <Body
        className={cx(headerValueStyles, getHeaderValueStyles(theme))}
        darkMode={darkMode}
      >
        {getValueDisplay(value, maxValue, formatValue)}

        {showIcon &&
          getHeaderIcon(variant, {
            className: cx(
              headerIconStyles,
              getHeaderIconStyles(theme, variant),
            ),
          })}
      </Body>
    );
  };

  const getAriaAttributes = () => {
    if (!hasValue) return {};

    return {
      'aria-valuemin': 0,
      'aria-valuenow': rest.value,
      'aria-valuemax': rest.maxValue ?? DEFAULT_MAX_VALUE,
    };
  };

  const progressBarId = `progress-bar-${label || 'default'}`;

  return (
    <div className={cx(containerStyles)}>
      <div className={cx(headerStyles)}>
        <Label htmlFor={progressBarId} darkMode={darkMode}>
          {label}
        </Label>
        {hasValue && renderValueDisplay()}
      </div>

      <div
        role="progressbar"
        id={progressBarId}
        aria-label={getNodeTextContent(label)}
        {...getAriaAttributes()}
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
              hasValue &&
                getDeterminateProgressBarFillStyles(
                  getPercentage(rest.value, rest.maxValue ?? DEFAULT_MAX_VALUE),
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
