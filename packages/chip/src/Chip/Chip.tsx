import React, { useMemo } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import InlineDefinition from '@leafygreen-ui/inline-definition';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { DismissButton } from '../DismissButton';
import { getTruncatedName } from '../utils/getTruncatedName';

import {
  chipTextDisabledStyles,
  chipTextDismissSizeStyle,
  chipTextSizeStyle,
  chipTextStyles,
  chipWrapperBaseStyle,
  chipWrapperSizeStyle,
  chipWrapperThemeStyle,
  disabledBaseChipWrapperStyles,
  disabledChipWrapperStyle,
} from './Chip.styles';
import { ChipProps, Size, Variant } from './Chip.types';

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  (
    {
      label,
      chipTruncationLocation = 'end',
      chipCharacterLimit = 15,
      disabled = false,
      size = Size.Default,
      variant = Variant.Blue,
      darkMode: darkModeProp,
      onDismiss,
      popoverZIndex,
      className,
      dismissButtonAriaLabel,
      ...rest
    }: ChipProps,
    forwardedRef,
  ) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);

    const isTruncated =
      !!chipCharacterLimit &&
      !!chipTruncationLocation &&
      chipTruncationLocation !== 'none' &&
      typeof label === 'string' &&
      (label as string).length > chipCharacterLimit;

    const truncatedName = useMemo(
      () =>
        getTruncatedName(
          chipCharacterLimit,
          chipTruncationLocation,
          label,
          isTruncated,
        ),
      [chipCharacterLimit, chipTruncationLocation, label, isTruncated],
    );

    return (
      <span
        ref={forwardedRef}
        className={cx(
          chipWrapperBaseStyle,
          chipWrapperThemeStyle(variant, theme),
          chipWrapperSizeStyle(size),
          {
            [cx(
              disabledChipWrapperStyle[theme],
              disabledBaseChipWrapperStyles,
            )]: disabled,
          },
          className,
        )}
        {...rest}
      >
        <span
          className={cx(
            chipTextStyles(variant, theme),
            chipTextSizeStyle[size],
            {
              [chipTextDismissSizeStyle[size]]: !!onDismiss,
              [chipTextDisabledStyles[theme]]: disabled,
            },
          )}
        >
          {isTruncated ? (
            <InlineDefinition
              darkMode={darkMode}
              definition={label}
              align="bottom"
              popoverZIndex={popoverZIndex}
            >
              {truncatedName}
            </InlineDefinition>
          ) : (
            label
          )}
        </span>
        {onDismiss && (
          <DismissButton
            label={label}
            onDismiss={onDismiss}
            disabled={disabled}
            variant={variant}
            dismissButtonAriaLabel={dismissButtonAriaLabel}
          />
        )}
      </span>
    );
  },
);
Chip.displayName = 'Chip';
