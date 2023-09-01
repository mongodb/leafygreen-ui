import React, { useMemo } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import InlineDefinition from '@leafygreen-ui/inline-definition';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import {
  chipButtonBaseDisabledStyles,
  chipButtonDisabledStyle,
  chipButtonStyle,
  chipButtonThemeStyle,
  chipTextDismissSizeStyle,
  chipTextSizeStyle,
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

    const truncatedName = useMemo(() => {
      if (isTruncated && typeof label === 'string') {
        const ellipsis = '…';
        const chars = chipCharacterLimit - 3; // ellipsis dots included in the char limit

        switch (chipTruncationLocation) {
          case 'start': {
            const end = label.substring(label.length - chars).trim();
            return ellipsis + end;
          }

          case 'middle': {
            const start = label.substring(0, chars / 2).trim();
            const end = label.substring(label.length - chars / 2).trim();
            return start + ellipsis + end;
          }

          case 'end': {
            const start = label.substring(0, chars).trim();
            return start + ellipsis;
          }

          default: {
            return label;
          }
        }
      }

      return label;
    }, [chipCharacterLimit, chipTruncationLocation, label, isTruncated]);

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
          className={cx(chipTextSizeStyle[size], {
            [chipTextDismissSizeStyle[size]]: !!onDismiss,
          })}
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
          <button
            aria-label={`Deselect ${label}`}
            aria-disabled={disabled}
            disabled={disabled}
            className={cx(
              chipButtonStyle,
              chipButtonThemeStyle(variant, theme),
              {
                [cx(
                  chipButtonDisabledStyle[theme],
                  chipButtonBaseDisabledStyles,
                )]: disabled,
              },
            )}
            onClick={onDismiss}
          >
            <Icon glyph="X" />
          </button>
        )}
      </span>
    );
  },
);
Chip.displayName = 'Chip';
