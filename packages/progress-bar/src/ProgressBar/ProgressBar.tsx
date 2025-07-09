import React, { useEffect, useState } from 'react';

import { usePrevious } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { getNodeTextContent } from '@leafygreen-ui/lib';
import { Body, Description, Label } from '@leafygreen-ui/typography';

import { iconsPendingCompletion } from '../constants';

import {
  containerStyles,
  getAnimatedTextStyles,
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

  const [animationMode, setAnimationMode] = useState<AnimationMode>(
    getAnimationMode({
      type,
      isIndeterminate,
      enableAnimation,
    }),
  );

  useEffect(() => {
    setAnimationMode(currentMode => {
      const newMode = getAnimationMode({
        type,
        isIndeterminate,
        enableAnimation,
      });

      // if previously indeterminate and now turning determinate, apply fade-out transition
      if (currentMode === AnimationMode.Indeterminate && !isIndeterminate) {
        return AnimationMode.Transition;
      }

      return currentMode === newMode ? currentMode : newMode;
    });
  }, [type, isIndeterminate, enableAnimation]);

  const [isNewDescription, setIsNewDescription] = useState(false);
  const prevDescription = usePrevious(description);

  useEffect(() => {
    // if description is changed, apply fade-in transition
    if (description !== prevDescription) {
      setIsNewDescription(true);
    }
  }, [description, prevDescription]);

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
            // if on fade-out transition, revert back to base mode
            onTransitionEnd={() => {
              if (animationMode === AnimationMode.Transition) {
                setAnimationMode(
                  getAnimationMode({
                    type,
                    isIndeterminate,
                    enableAnimation,
                  }),
                );
              }
            }}
          ></div>
        </div>
      </div>

      {description && (
        <Description
          darkMode={darkMode}
          disabled={disabled}
          className={getAnimatedTextStyles(isNewDescription)}
          // if on fade-in transition, reset state after animation ends
          onAnimationEnd={() => setIsNewDescription(false)}
        >
          {description}
        </Description>
      )}
    </div>
  );
}

ProgressBar.displayName = 'ProgressBar';
