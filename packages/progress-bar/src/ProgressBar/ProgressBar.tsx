import React, { useEffect, useState } from 'react';

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
import { AnimationMode, ProgressBarProps, Size } from './ProgressBar.types';
import {
  getFormattedValue,
  getHeaderIcon,
  getValueAriaAttributes,
  iconsVisibleOnComplete,
  resolveProgressBarProps,
} from './ProgressBar.utils';
export function ProgressBar(props: ProgressBarProps) {
  const {
    value,
    maxValue,
    disabled,
    variant,
    isIndeterminate,
    enableAnimation,
  } = resolveProgressBarProps(props);

  const {
    type,
    label,
    size = Size.Default,
    description,
    darkMode = false,
    formatValue,
    showIcon: showIconProps = false,
  } = props;

  const { theme } = useDarkMode(darkMode);

  const role = type === 'meter' ? 'meter' : 'progressbar';
  const id = `${role}-${getNodeTextContent(label) || 'default'}`;

  const showIcon = iconsVisibleOnComplete.includes(variant)
    ? showIconProps && value === maxValue
    : showIconProps;

  const [animationMode, setAnimationMode] = useState<AnimationMode>(
    isIndeterminate ? AnimationMode.Indeterminate : AnimationMode.Determinate,
  );

  // if progress bar was previously indeterminate and is now determinate, apply animated transition
  useEffect(() => {
    if (!isIndeterminate && animationMode === AnimationMode.Indeterminate) {
      setAnimationMode(AnimationMode.Transition);

      const id = setTimeout(() => {
        setAnimationMode(AnimationMode.Determinate);
      }, 500);

      return () => clearTimeout(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIndeterminate]);

  return (
    <div className={containerStyles} aria-disabled={disabled}>
      <div className={headerStyles}>
        <Label htmlFor={id} darkMode={darkMode} disabled={disabled}>
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
        id={id}
        aria-label={id}
        {...getValueAriaAttributes(value, maxValue)}
      >
        <div
          data-testid="progress-bar-track"
          className={getBarTrackStyles({ theme, size })}
        >
          <div
            data-testid="progress-bar-fill"
            className={getBarFillStyles({
              animationMode,
              theme,
              variant,
              disabled,
              value,
              maxValue,
              enableAnimation,
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
