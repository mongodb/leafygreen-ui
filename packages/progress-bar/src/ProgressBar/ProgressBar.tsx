import React from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { getNodeTextContent } from '@leafygreen-ui/lib';
import { Size, Variant } from '@leafygreen-ui/tokens';
import { Body, Description, Label } from '@leafygreen-ui/typography';

import {
  containerStyles,
  getBarFillStyles,
  getBarTrackStyles,
  getHeaderIconStyles,
  getHeaderValueStyles,
  headerStyles,
} from './ProgressBar.styles';
import { ProgressBarProps } from './ProgressBar.types';
import {
  DEFAULT_MAX_VALUE,
  getFormattedValue,
  getHeaderIcon,
  getValueAriaAttributes,
  iconsVisibleOnComplete,
} from './ProgressBar.utils';

export function ProgressBar({
  variant = Variant.Info,
  label,
  size = Size.Default,
  description,
  darkMode = false,
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

  const disabled = isDeterminate ? rest.disabled ?? false : false;

  const showIcon = iconsVisibleOnComplete.includes(variant)
    ? showIconProps && isDeterminate && value === maxValue
    : showIconProps;

  const progressBarId = `progress-bar-${
    getNodeTextContent(label) || 'default'
  }`;

  return (
    <div className={containerStyles} aria-disabled={disabled}>
      <div className={headerStyles}>
        <Label htmlFor={progressBarId} darkMode={darkMode} disabled={disabled}>
          {label}
        </Label>

        {formatValue && (
          <Body
            className={getHeaderValueStyles({ theme, disabled })}
            darkMode={darkMode}
          >
            {value && getFormattedValue(value, maxValue, formatValue)}

            {showIcon &&
              getHeaderIcon({
                variant,
                disabled,
                props: {
                  className: getHeaderIconStyles({ theme, variant, disabled }),
                },
              })}
          </Body>
        )}
      </div>

      <div
        role="progressbar"
        id={progressBarId}
        aria-label={progressBarId}
        {...getValueAriaAttributes(value, maxValue)}
      >
        <div
          data-testid="progress-bar-track"
          className={getBarTrackStyles({ theme, size })}
        >
          <div
            data-testid="progress-bar-fill"
            className={getBarFillStyles({
              theme,
              variant,
              disabled,
              isDeterminate,
              value,
              maxValue,
            })}
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
