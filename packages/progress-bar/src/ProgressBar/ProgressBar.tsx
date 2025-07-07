import React, { useEffect, useRef, useState } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Body, Description, Label } from '@leafygreen-ui/typography';

import {
  containerStyles,
  getBarFillStyles,
  getBarTrackStyles,
  getHeaderIconStyles,
  getHeaderValueStyles,
  getInvisibleStyles,
  headerStyles,
} from './ProgressBar.styles';
import { ProgressBarProps, Size, Type } from './ProgressBar.types';
import {
  getDivAriaAttributes,
  getFormattedValue,
  getHeaderIcon,
  getLastAnnouncedThresholdIndex,
  getPercentage,
  getValueAriaAttributes,
  iconsPendingCompletion,
  resolveProgressBarProps,
  shouldAnnounceStatus,
} from './ProgressBar.utils';
export function ProgressBar(props: ProgressBarProps) {
  const { value, maxValue, disabled, color, isIndeterminate } =
    resolveProgressBarProps(props);

  const {
    type,
    label,
    size = Size.Default,
    description,
    darkMode = false,
    formatValue,
    showIcon: showIconProp = false,
  } = props;

  const { theme } = useDarkMode(darkMode);

  const showIcon = iconsPendingCompletion.includes(color)
    ? showIconProp && value === maxValue
    : showIconProp;

  const { role, barId, labelId, descId } = getDivAriaAttributes(type, label);

  // automatically announces live once past 50% and 100% progress for minimal disturbance
  // otherwise, progress only head if user reaches the bar via virtual cursor
  const [screenReaderMessage, setScreenReaderMessage] = useState<string>('');
  const lastAnnouncedThresholdIndex = useRef(-1);

  useEffect(() => {
    if (value == null) {
      setScreenReaderMessage('');
      lastAnnouncedThresholdIndex.current = -1;
      return;
    }

    const newThresholdIndex = getLastAnnouncedThresholdIndex(value, maxValue);

    if (newThresholdIndex === lastAnnouncedThresholdIndex.current) {
      return;
    } else {
      lastAnnouncedThresholdIndex.current = newThresholdIndex;
    }

    const announceStatus = shouldAnnounceStatus(color);

    const baseMessage = `Update: current progress is ${getPercentage(
      value,
      maxValue,
    )}% (${value} out of ${maxValue}).`;

    const message =
      announceStatus && color
        ? `${baseMessage} Status is ${color}.`
        : baseMessage;

    setScreenReaderMessage(message);
  }, [setScreenReaderMessage, value, maxValue, type, color]);

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
            {value != null && getFormattedValue(value, maxValue, formatValue)}

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
        aria-labelledby={label ? labelId : undefined}
        aria-label={!label ? role : undefined}
        aria-describedby={description ? descId : undefined}
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

      {type === Type.Loader && (
        <div
          role="status"
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
