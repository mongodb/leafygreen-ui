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
  indeterminateProgressBarFillStyles,
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
        className={cx(headerValueStyles, getHeaderValueStyles(theme, disabled))}
        darkMode={darkMode}
      >
        {getValueDisplay(value, maxValue, formatValue)}

        {showIcon &&
          getHeaderIcon(variant, disabled, {
            className: cx(
              headerIconStyles,
              getHeaderIconStyles(theme, variant, disabled),
            ),
          })}
      </Body>
    );
  };

  const getAriaAttributes = () => {
    if (!hasValue) return {};

    const { value, maxValue = DEFAULT_MAX_VALUE } = rest;

    return {
      'aria-valuemin': 0,
      'aria-valuenow': value,
      'aria-valuemax': maxValue,
    };
  };

  const getTypedProgressBarFillStyles = () => {
    if (!hasValue) return indeterminateProgressBarFillStyles;

    const { value, maxValue = DEFAULT_MAX_VALUE } = rest;

    return getDeterminateProgressBarFillStyles(getPercentage(value, maxValue));
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
        {hasValue && renderValueDisplay()}
      </div>

      <div
        role="progressbar"
        id={progressBarId}
        aria-label={getNodeTextContent(label)}
        {...getAriaAttributes()}
      >
        <div
          data-testid="progress-bar-track"
          className={cx(
            progressBarTrackStyles,
            getProgressBarTrackStyles(theme, size),
          )}
        >
          <div
            data-testid="progress-bar-fill"
            className={cx(
              progressBarFillStyles,
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
