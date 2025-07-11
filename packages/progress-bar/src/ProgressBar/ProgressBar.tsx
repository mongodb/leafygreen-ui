import React, { useEffect, useState } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { usePrevious } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { isDefined } from '@leafygreen-ui/lib';
import { Body, Description, Label } from '@leafygreen-ui/typography';

import {
  DEFAULT_SIZE,
  DEFAULT_VARIANT,
  iconsPendingCompletion,
} from '../constants';
import { DEFAULT_LGID_ROOT, getLgIds } from '../testing';

import { useScreenReaderAnnouncer } from './hooks';
import {
  containerStyles,
  getAnimatedTextStyles,
  getBarFillStyles,
  getBarTrackStyles,
  getHeaderIconStyles,
  getHeaderValueStyles,
  getHiddenStyles,
  headerStyles,
  truncatedTextStyles,
} from './ProgressBar.styles';
import { AnimationMode, ProgressBarProps } from './ProgressBar.types';
import {
  getAnimationMode,
  getFormattedValue,
  getHeaderIcon,
  getProgressBarIdentifiers,
  getValueAriaAttributes,
  resolveProgressBarProps,
} from './utils';
export function ProgressBar(props: ProgressBarProps) {
  const { value, maxValue, disabled, isIndeterminate, role, enableAnimation } =
    resolveProgressBarProps(props);

  const {
    size = DEFAULT_SIZE,
    label,
    description,
    variant = DEFAULT_VARIANT,
    darkMode = false,
    formatValue,
    showIcon: showIconProp = false,
    'aria-label': ariaLabel,
    'data-lgid': dataLgId = DEFAULT_LGID_ROOT,
  } = props;

  const { theme } = useDarkMode(darkMode);

  const { barId, labelId, descId, liveId } = getProgressBarIdentifiers(
    role,
    label,
    description,
  );

  const lgIds = getLgIds(dataLgId);

  const showIcon = iconsPendingCompletion.includes(variant)
    ? showIconProp && value === maxValue
    : showIconProp;

  const [animationMode, setAnimationMode] = useState<AnimationMode>(
    getAnimationMode({
      isIndeterminate,
      enableAnimation,
    }),
  );

  useEffect(() => {
    setAnimationMode(currentMode => {
      const newMode = getAnimationMode({
        isIndeterminate,
        enableAnimation,
      });

      // if previously indeterminate and now turning determinate, apply fade-out transition
      if (currentMode === AnimationMode.Indeterminate && !isIndeterminate) {
        return AnimationMode.Transition;
      }

      return currentMode === newMode ? currentMode : newMode;
    });
  }, [isIndeterminate, enableAnimation]);

  const [isNewDescription, setIsNewDescription] = useState(false);
  const prevDescription = usePrevious(description);

  useEffect(() => {
    // if description is changed, apply fade-in transition
    if (isDefined(prevDescription) && description !== prevDescription) {
      setIsNewDescription(true);
    }
  }, [description, prevDescription]);

  const screenReaderMessage = useScreenReaderAnnouncer({
    role,
    value,
    maxValue,
    variant,
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
              variant,
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
          className={getHiddenStyles()}
        >
          {screenReaderMessage}
        </div>
      )}
    </div>
  );
}

ProgressBar.displayName = 'ProgressBar';
