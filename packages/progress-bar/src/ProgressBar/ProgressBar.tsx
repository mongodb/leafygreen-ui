import React, { useEffect, useState } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { usePrevious } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { isDefined } from '@leafygreen-ui/lib';
import { Body, Description, Label } from '@leafygreen-ui/typography';

import { iconsPendingCompletion } from '../constants';
import { DEFAULT_LGID_ROOT, getLgIds } from '../testing';

import { useScreenReaderAnnouncer } from './hooks';
import {
  containerStyles,
  getAnimatedTextStyles,
  getBarFillStyles,
  getBarTrackStyles,
  getHeaderIconStyles,
  getHeaderValueStyles,
  getInvisibleStyles,
  headerStyles,
  truncatedTextStyles,
} from './ProgressBar.styles';
import { AnimationMode, ProgressBarProps, Size } from './ProgressBar.types';
import {
  getAnimationMode,
  getFormattedValue,
  getHeaderIcon,
  getProgressBarIdentifiers,
  getValueAriaAttributes,
  resolveProgressBarProps,
} from './utils';
export function ProgressBar(props: ProgressBarProps) {
  const { value, maxValue, disabled, color, isIndeterminate, enableAnimation } =
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
    'data-lgid': dataLgId = DEFAULT_LGID_ROOT,
  } = props;

  const { theme } = useDarkMode(darkMode);

  const { role, barId, labelId, descId, liveId } = getProgressBarIdentifiers(
    type,
    label,
    description,
  );

  const lgIds = getLgIds(dataLgId);

  const showIcon = iconsPendingCompletion.includes(color)
    ? showIconProp && value === maxValue
    : showIconProp;

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
    if (isDefined(prevDescription) && description !== prevDescription) {
      setIsNewDescription(true);
    }
  }, [description, prevDescription]);
  const screenReaderMessage = useScreenReaderAnnouncer({
    type,
    value,
    maxValue,
    color,
  });

  return (
    <div
      className={containerStyles}
      aria-disabled={disabled}
      data-lgid={lgIds.root}
    >
      <div className={headerStyles}>
        <Label
          id={labelId}
          htmlFor={barId}
          darkMode={darkMode}
          disabled={disabled}
          className={truncatedTextStyles}
          data-lgid={lgIds.label}
        >
          {label}
        </Label>

        {formatValue && (
          <Body
            className={getHeaderValueStyles({ theme, disabled })}
            darkMode={darkMode}
            data-lgid={lgIds.valueText}
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
          data-lgid={lgIds.track}
          className={getBarTrackStyles({ theme, size })}
        >
          <div
            data-lgid={lgIds.fill}
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
          data-lgid={lgIds.description}
          className={cx({ [getAnimatedTextStyles()]: isNewDescription })}
          // if on fade-in transition, reset state after animation ends
          onAnimationEnd={() => setIsNewDescription(false)}
        >
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
