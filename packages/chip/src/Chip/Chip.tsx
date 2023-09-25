import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import InlineDefinition from '@leafygreen-ui/inline-definition';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';

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
import { ChipProps, TruncationLocation, Variant } from './Chip.types';

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  (
    {
      chipTruncationLocation = TruncationLocation.None,
      chipCharacterLimit,
      disabled = false,
      variant = Variant.Blue,
      baseFontSize = BaseFontSize.Body1,
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

    /**
     * Returns true if chipCharacterLimit is defined, the chipTruncationLocation isn't `none`, and the label is a valid string with a length that is greater than the chipCharacterLimit.
     * @returns `boolean`
     */
    const isTruncated =
      Number.isInteger(chipCharacterLimit) &&
      chipTruncationLocation !== 'none' &&
      typeof label === 'string' &&
      !!label &&
      (label as string).length > (chipCharacterLimit as number);

    const truncatedName = useMemo(
      () =>
        getTruncatedName(
          chipCharacterLimit as number,
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
          chipWrapperSizeStyle(baseFontSize),
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
            chipTextSizeStyle(baseFontSize),
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
        {!!onDismiss && (
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
  baseFontSize: PropTypes.oneOf(Object.values(BaseFontSize)),
  variant: PropTypes.oneOf(Object.values(Variant)),
  onDismiss: PropTypes.func,
  dismissButtonAriaLabel: PropTypes.string,
};
