import React from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { isDefined } from '@leafygreen-ui/lib';
import { Body, Description, Label } from '@leafygreen-ui/typography';

import { useScreenReaderAnnouncer } from './hooks';
import {
  containerStyles,
  getBarFillStyles,
  getBarTrackStyles,
  getHeaderIconStyles,
  getHeaderValueStyles,
  getInvisibleStyles,
  headerStyles,
} from './ProgressBar.styles';
import { ProgressBarProps, Size } from './ProgressBar.types';
import {
  getFormattedValue,
  getHeaderIcon,
  getProgressBarIdentifiers,
  getValueAriaAttributes,
  iconsPendingCompletion,
  resolveProgressBarProps,
} from './ProgressBar.utils';
export function ProgressBar(props: ProgressBarProps) {
  const { value, maxValue, disabled, color, isIndeterminate } =
    resolveProgressBarProps(props);

  const {
    type,
    label,
    'aria-label': ariaLabel,
    size = Size.Default,
    description,
    darkMode = false,
    formatValue,
    showIcon: showIconProp = false,
  } = props;

  const { theme } = useDarkMode(darkMode);

  const { role, barId, labelId, descId, liveId } = getProgressBarIdentifiers(
    type,
    label,
    description,
  );

  const showIcon = iconsPendingCompletion.includes(color)
    ? showIconProp && value === maxValue
    : showIconProp;

  const screenReaderMessage = useScreenReaderAnnouncer({
    type,
    value,
    maxValue,
    color,
  });

  return (
    <div className={containerStyles} aria-disabled={disabled}>
      <div className={headerStyles}>
        <Label
          id={labelId}
          htmlFor={barId}
          darkMode={darkMode}
          disabled={disabled}
        >
          {label}
        </Label>

        {formatValue && (
          <Body
            className={getHeaderValueStyles({ theme, disabled })}
            darkMode={darkMode}
          >
            {isDefined(value) &&
              getFormattedValue(value, maxValue, formatValue)}

            {showIcon &&
              getHeaderIcon({
                color,
                disabled,
                props: {
                  className: getHeaderIconStyles({ theme, color, disabled }),
                },
              })}
          </Body>
        )}
      </div>

      <div
        role={role}
        id={barId}
        aria-labelledby={labelId}
        aria-label={ariaLabel}
        aria-describedby={descId}
        aria-controls={liveId}
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
              color,
              disabled,
              isIndeterminate,
              value,
              maxValue,
            })}
          ></div>
        </div>
      </div>

      {description && (
        <Description id={descId} darkMode={darkMode} disabled={disabled}>
          {description}
        </Description>
      )}

      {screenReaderMessage && (
        <div
          role="status"
          id={liveId}
          aria-live="polite"
          aria-atomic="true"
          className={getInvisibleStyles()}
        >
          {screenReaderMessage}
        </div>
      )}
    </div>
  );
}

ProgressBar.displayName = 'ProgressBar';
