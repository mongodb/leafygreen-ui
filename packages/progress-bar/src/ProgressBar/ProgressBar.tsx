import React from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { getNodeTextContent } from '@leafygreen-ui/lib';
import { Body, Description, Label } from '@leafygreen-ui/typography';

import {
  containerStyles,
  getBarFillStyles,
  getBarTrackStyles,
  getHeaderIconStyles,
  getHeaderValueStyles,
  headerStyles,
} from './ProgressBar.styles';
import { ProgressBarProps, Size } from './ProgressBar.types';
import {
  getFormattedValue,
  getHeaderIcon,
  getValueAriaAttributes,
  iconsVisibleOnComplete,
  resolveProgressBarProps,
} from './ProgressBar.utils';
export function ProgressBar(props: ProgressBarProps) {
  const { value, maxValue, disabled, variant, isIndeterminate } =
    resolveProgressBarProps(props);

  const {
    type: role,
    label,
    size = Size.Default,
    description,
    darkMode = false,
    formatValue,
    showIcon: showIconProps = false,
  } = props;

  const { theme } = useDarkMode(darkMode);

  const showIcon = iconsVisibleOnComplete.includes(variant)
    ? showIconProps && value === maxValue
    : showIconProps;

  const progressBarId = `${role}-${getNodeTextContent(label) || 'default'}`;

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
            {value != null && getFormattedValue(value, maxValue, formatValue)}

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
        role={role}
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
              isIndeterminate,
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
