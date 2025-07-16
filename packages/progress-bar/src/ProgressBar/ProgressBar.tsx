import React, { useEffect, useState } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { usePrevious } from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { isDefined } from '@leafygreen-ui/lib';
import { Body, Description, Label } from '@leafygreen-ui/typography';

import { DEFAULT_LGID_ROOT, getLgIds } from '../testing';

import {
  DEFAULT_SIZE,
  DEFAULT_VARIANT,
  iconsPendingCompletion,
} from './constants';
import { useIdIdentifiers, useScreenReaderAnnouncer } from './hooks';
import {
  containerStyles,
  getAnimatedTextStyles,
  getBarFillStyles,
  getBarTrackStyles,
  getHeaderIconStyles,
  getHeaderValueStyles,
  headerStyles,
  hiddenStyles,
  truncatedTextStyles,
} from './ProgressBar.styles';
import { AnimationMode, ProgressBarProps } from './ProgressBar.types';
import {
  getAnimationMode,
  getFormattedValue,
  getHeaderIcon,
  getValueAriaAttributes,
  resolveProgressBarProps,
} from './utils';
export function ProgressBar(props: ProgressBarProps) {
  const { role, value, maxValue, disabled, isIndeterminate, enableAnimation } =
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

  const { barId, labelId, descId } = useIdIdentifiers(role, label, description);
  const lgIds = getLgIds(dataLgId);

  const showIcon = iconsPendingCompletion.includes(variant)
    ? showIconProp && value === maxValue
    : showIconProp;

  const [animationMode, setAnimationMode] = useState<AnimationMode>(
    getAnimationMode(isIndeterminate, enableAnimation),
  );

  const endTransitionAnimation = () => {
    if (animationMode === AnimationMode.Transition) {
      setAnimationMode(getAnimationMode(isIndeterminate, enableAnimation));
    }
  };

  useEffect(() => {
    setAnimationMode(currentMode => {
      const newMode = getAnimationMode(isIndeterminate, enableAnimation);

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
    <LeafyGreenProvider darkMode={darkMode}>
      <div
        data-lgid={lgIds.root}
        className={containerStyles}
        aria-disabled={disabled}
      >
        <div className={headerStyles}>
          <Label
            data-lgid={lgIds.label}
            id={labelId}
            htmlFor={barId}
            className={truncatedTextStyles}
            disabled={disabled}
          >
            {label}
          </Label>

          {formatValue && (
            <Body
              data-lgid={lgIds.valueText}
              className={getHeaderValueStyles({ theme, disabled })}
            >
              {isDefined(value) &&
                getFormattedValue(value, maxValue, formatValue)}

              {showIcon &&
                getHeaderIcon({
                  variant,
                  disabled,
                  props: {
                    className: getHeaderIconStyles({
                      theme,
                      variant,
                      disabled,
                    }),
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
              onTransitionEnd={endTransitionAnimation}
            ></div>
          </div>
        </div>

        {description && (
          <Description
            id={descId}
            disabled={disabled}
            data-lgid={lgIds.description}
            className={cx({ [getAnimatedTextStyles()]: isNewDescription })}
            // if on fade-in transition, reset state after animation ends
            onAnimationEnd={() => setIsNewDescription(false)}
          >
            {description}
          </Description>
        )}

        {!disabled && screenReaderMessage && (
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className={hiddenStyles}
          >
            {screenReaderMessage}
          </div>
        )}
      </div>
    </LeafyGreenProvider>
  );
}

ProgressBar.displayName = 'ProgressBar';
