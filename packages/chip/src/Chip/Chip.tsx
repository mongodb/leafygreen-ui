import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import InlineDefinition from '@leafygreen-ui/inline-definition';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { DismissButton } from '../DismissButton';
import { getTruncatedName } from '../utils/getTruncatedName';

import {
  chipInlineDefinitionClassName,
  chipTextClassName,
  chipTextDisabledStyles,
  chipTextDismissSizeStyle,
  chipTextSizeStyle,
  chipTextStyles,
  chipWrapperBaseDisabledStyles,
  chipWrapperBaseStyle,
  chipWrapperDisabledStyle,
  chipWrapperSizeStyle,
  chipWrapperThemeStyle,
} from './Chip.styles';
import { ChipProps, Size, TruncationLocation, Variant } from './Chip.types';

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  (
    {
      chipTruncationLocation = TruncationLocation.None,
      chipCharacterLimit = 15,
      disabled = false,
      size = Size.Default,
      variant = Variant.Blue,
      darkMode: darkModeProp,
      label,
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
      !!label &&
      (label as string).length > chipCharacterLimit;

    const truncatedName = useMemo(
      () =>
        getTruncatedName(
          chipCharacterLimit,
          chipTruncationLocation,
          label as string,
        ),
      [chipCharacterLimit, chipTruncationLocation, label],
    );

    return (
      <span
        ref={forwardedRef}
        aria-disabled={disabled}
        className={cx(
          chipWrapperBaseStyle,
          chipWrapperThemeStyle(variant, theme),
          chipWrapperSizeStyle(size),
          {
            [cx(
              chipWrapperDisabledStyle[theme],
              chipWrapperBaseDisabledStyles,
            )]: disabled,
          },
          className,
        )}
        {...rest}
      >
        <span
          data-testid="chip-text"
          className={cx(
            chipTextStyles(variant, theme),
            chipTextSizeStyle(size),
            {
              [chipTextDismissSizeStyle]: !!onDismiss,
              [chipTextDisabledStyles[theme]]: disabled,
            },
            chipTextClassName,
          )}
        >
          {isTruncated ? (
            <InlineDefinition
              darkMode={darkMode}
              definition={label}
              align="bottom"
              popoverZIndex={popoverZIndex}
              className={chipInlineDefinitionClassName}
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

Chip.propTypes = {
  label: PropTypes.string.isRequired,
  chipCharacterLimit: PropTypes.number,
  chipTruncationLocation: PropTypes.oneOf(Object.values(TruncationLocation)),
  popoverZIndex: PropTypes.number,
  size: PropTypes.oneOf(Object.values(Size)),
  variant: PropTypes.oneOf(Object.values(Variant)),
  onDismiss: PropTypes.func,
  dismissButtonAriaLabel: PropTypes.string,
};
