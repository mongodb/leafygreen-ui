import React, { useEffect, useState } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { usePrevious } from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { isDefined } from '@leafygreen-ui/lib';
import { Body, Description, Label } from '@leafygreen-ui/typography';

import { getLgIds } from '../testing';

import { WIDTH_ANIMATION_SPEED } from './constants';
import {
  useComputedTransitionDuration,
  useIdIdentifiers,
  useRotatingItems,
  useScreenReaderAnnouncer,
} from './hooks';
import {
  getAnimatedTextStyles,
  getBarFillStyles,
  getBarTrackStyles,
  getContainerStyles,
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
  getPercentage,
  getValueAriaAttributes,
  resolveProgressBarProps,
} from './utils';
export function ProgressBar(props: ProgressBarProps) {
  const {
    size,
    label,
    description: descriptionProp,
    variant,
    darkMode,
    formatValue,
    showIcon,
    'aria-label': ariaLabel,
    'data-lgid': dataLgId,
    className,

    role,
    value,
    maxValue,
    disabled,
    isIndeterminate,
    enableAnimation,
    ...rest
  } = resolveProgressBarProps(props);

  const { theme } = useDarkMode(darkMode);

  const { barId, labelId, descId } = useIdIdentifiers({
    role,
    label,
    description: descriptionProp,
  });

  const lgIds = getLgIds(dataLgId);

  const screenReaderMessage = useScreenReaderAnnouncer({
    role,
    value,
    maxValue,
    variant,
  });

  // track animation mode changes for animated transition
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

  // track description text changes for animated transition
  const description = useRotatingItems(descriptionProp);
  const prevDescription = usePrevious(description);
  const [isNewDescription, setIsNewDescription] = useState(false);

  useEffect(() => {
    // if description is changed, apply fade-in transition
    if (isDefined(prevDescription) && description !== prevDescription) {
      setIsNewDescription(true);
    }
  }, [description, prevDescription]);

  // get width and animation duration for determinate progress bars
  const displayWidth = isDefined(value)
    ? getPercentage(value, maxValue)
    : undefined;

  const widthAnimationDuration = useComputedTransitionDuration({
    currentValue: displayWidth,
    speed: WIDTH_ANIMATION_SPEED,
  });

  const getWidthStyles = () => {
    if (isIndeterminate) {
      return;
    }

    // use CSS variables for width and animation duration to prevent
    // unnecessary re-generation of emotion classes on every width change
    return {
      '--width': `${displayWidth}%`,
      '--width-animation-duration': `${widthAnimationDuration}ms`,
    } as React.CSSProperties;
  };

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <div
        data-lgid={lgIds.root}
        aria-disabled={disabled}
        className={getContainerStyles(className)}
        {...rest}
      >
        <div className={headerStyles}>
          <Label
            data-lgid={lgIds.root} // handled by <Label> internally
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
              style={getWidthStyles()}
              className={getBarFillStyles({
                theme,
                variant,
                disabled,
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
            data-lgid={lgIds.root} // handled by <Description> internally
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
