import React, { useEffect, useState } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { getNodeTextContent } from '@leafygreen-ui/lib';
import { Body, Description, Label } from '@leafygreen-ui/typography';

import {
  containerStyles,
  FADEOUT_DURATION,
  getBarFillStyles,
  getBarTrackStyles,
  getHeaderIconStyles,
  getHeaderValueStyles,
  headerStyles,
} from './ProgressBar.styles';
import { AnimationMode, ProgressBarProps, Size } from './ProgressBar.types';
import {
  getAnimationMode,
  getFormattedValue,
  getHeaderIcon,
  getValueAriaAttributes,
  iconsPendingCompletion,
  resolveProgressBarProps,
} from './ProgressBar.utils';
export function ProgressBar(props: ProgressBarProps) {
  const { value, maxValue, disabled, color, isIndeterminate, enableAnimation } =
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

  // set HTML attributes based on type
  const role = type === 'meter' ? 'meter' : 'progressbar';
  const progressBarId = `${role}-${getNodeTextContent(label) || 'default'}`;

  // if progress bar was previously indeterminate and is turning determinate, apply fadeout transition
  const [animationMode, setAnimationMode] = useState<AnimationMode>(
    getAnimationMode({
      type,
      isIndeterminate,
      enableAnimation,
    }),
  );

  useEffect(() => {
    const shouldTransitionOut =
      animationMode === AnimationMode.Indeterminate && !isIndeterminate;

    if (!shouldTransitionOut) return;

    setAnimationMode(AnimationMode.Transition);

    const timeout = setTimeout(() => {
      setAnimationMode(
        getAnimationMode({
          type,
          isIndeterminate,
          enableAnimation,
        }),
      );
    }, FADEOUT_DURATION);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIndeterminate]);

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
              color,
              disabled,
              value,
              maxValue,
              animationMode,
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
