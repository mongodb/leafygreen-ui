import React, { useMemo } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import InlineDefinition from '@leafygreen-ui/inline-definition';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';

import { DismissButton } from '../DismissButton';
import { getTruncatedName } from '../utils/getTruncatedName';

import {
  chipInlineDefinitionClassName,
  chipTextClassName,
  getTextStyles,
  getWrapperStyles,
  inlineDefinitionStyles,
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
      className,
      dismissButtonAriaLabel,
      glyph,
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
          getWrapperStyles(baseFontSize, variant, theme, disabled),
          className,
        )}
        {...rest}
      >
        <span
          data-testid="chip-text"
          className={cx(
            getTextStyles(baseFontSize, variant, theme, disabled, !!onDismiss),
            chipTextClassName,
          )}
        >
          {glyph ?? glyph}
          {isTruncated ? (
            <InlineDefinition
              darkMode={darkMode}
              definition={label}
              align="bottom"
              className={chipInlineDefinitionClassName}
              tooltipClassName={inlineDefinitionStyles}
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
