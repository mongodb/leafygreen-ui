import React, { useEffect, useState } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { getNodeTextContent } from '@leafygreen-ui/lib';
import { Size, Variant } from '@leafygreen-ui/tokens';
import { Body, Description, Label } from '@leafygreen-ui/typography';

import {
  containerStyles,
  getBarFillStyles,
  getBarTrackStyles,
  getDeterminateBarFillStyles,
  getFadeOutBarFillStyles,
  getHeaderIconStyles,
  getHeaderValueStyles,
  getIndeterminateBarFillStyles,
  headerStyles,
} from './ProgressBar.styles';
import { ProgressBarProps } from './ProgressBar.types';
import {
  DEFAULT_MAX_VALUE,
  getFormattedValue,
  getHeaderIcon,
  getPercentage,
  getValueAriaAttributes,
  iconsVisibleOnComplete,
  validateVariantUsage,
} from './ProgressBar.utils';

export function ProgressBar({
  variant = Variant.Info,
  label,
  size = Size.Default,
  description,
  darkMode = false,
  formatValue,
  showIcon: showIconProps = false,
  ...rest
}: ProgressBarProps) {
  const { theme } = useDarkMode(darkMode);

  const [mode, setMode] = useState(
    rest.isIndeterminate ? 'indeterminate' : 'determinate',
  );

  useEffect(() => {
    if (!rest.isIndeterminate && mode === 'indeterminate') {
      setMode('fading');

      const fadeTimeout = setTimeout(() => {
        setMode('determinate');
      }, 500);

      return () => clearTimeout(fadeTimeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rest.isIndeterminate]);

  const isDeterminate = !rest.isIndeterminate;

  const value = rest.value ?? undefined;
  const maxValue = isDeterminate
    ? rest.maxValue ?? DEFAULT_MAX_VALUE
    : undefined;

  const enableAnimation = (isDeterminate && rest.enableAnimation) ?? false;
  const disabled = (isDeterminate && rest.disabled) ?? false;

  const showIcon = iconsVisibleOnComplete.includes(variant)
    ? showIconProps && isDeterminate && value === maxValue
    : showIconProps;

  const getTypedProgressBarFillStyles = () => {
    if (mode === 'fading') {
      return cx(
        getIndeterminateBarFillStyles({ theme, variant }),
        getFadeOutBarFillStyles(),
      );
    }

    if (!isDeterminate && mode === 'indeterminate')
      return getIndeterminateBarFillStyles({ theme, variant });

    if (value && mode === 'determinate') {
      return getDeterminateBarFillStyles({
        theme,
        variant,
        disabled,
        enableAnimation,
        width: getPercentage(value, maxValue),
      });
    }
  };

  const progressBarId = `progress-bar-${
    getNodeTextContent(label) || 'default'
  }`;

  validateVariantUsage({
    variant,
    isDeterminate,
    enableAnimation,
  });

  return (
    <div className={cx(containerStyles)} aria-disabled={disabled}>
      <div className={cx(headerStyles)}>
        <Label htmlFor={progressBarId} darkMode={darkMode} disabled={disabled}>
          {label}
        </Label>

        {formatValue && (
          <Body
            className={cx(getHeaderValueStyles({ theme, disabled }))}
            darkMode={darkMode}
          >
            {value && getFormattedValue(value, maxValue, formatValue)}

            {showIcon &&
              getHeaderIcon({
                variant,
                disabled,
                props: {
                  className: cx(
                    getHeaderIconStyles({ theme, variant, disabled }),
                  ),
                },
              })}
          </Body>
        )}
      </div>

      <div
        role="progressbar"
        id={progressBarId}
        aria-label={progressBarId}
        {...getValueAriaAttributes(value, maxValue)}
      >
        <div
          data-testid="progress-bar-track"
          className={cx(getBarTrackStyles({ theme, size }))}
        >
          <div
            data-testid="progress-bar-fill"
            className={cx(getBarFillStyles(), getTypedProgressBarFillStyles())}
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
