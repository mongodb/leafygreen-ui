import React, { useCallback, useContext, useMemo } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useForwardedRef, useIdAllocator } from '@leafygreen-ui/hooks';
import { InputOption, InputOptionContent } from '@leafygreen-ui/input-option';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { ComboboxContext } from '../ComboboxContext';
import { ComboboxSize } from '../types';
import { wrapJSX } from '../utils';

import {
  displayNameStyle,
  largeStyles,
  multiselectIconLargePosition,
  multiselectIconPosition,
} from './ComboboxOption.styles';
import {
  ComboboxOptionProps,
  InternalComboboxOptionProps,
} from './ComboboxOption.types';
import { getGlyphs } from './getGlyphs';

/**
 * Internal ComboboxOption Component for use within Combobox only.
 *
 * Prefer using {@link ComboboxOption}
 * @internal
 */
export const InternalComboboxOption = React.forwardRef<
  HTMLLIElement,
  InternalComboboxOptionProps
>(
  (
    {
      glyph,
      isSelected,
      displayName,
      isFocused,
      setSelected,
      className,
      description,
      value,
      onClick,
      disabled = false,
      ...rest
    }: InternalComboboxOptionProps,
    forwardedRef,
  ) => {
    const { darkMode, theme } = useDarkMode();
    const { multiselect, size, withIcons, inputValue } =
      useContext(ComboboxContext);
    const optionRef = useForwardedRef(forwardedRef, null);
    const optionTextId = useIdAllocator({ prefix: 'combobox-option-text' });

    const handleOptionClick = useCallback(
      (e: React.SyntheticEvent<HTMLLIElement, Event>) => {
        // stopPropagation will not stop the keyDown event (only click)
        // since the option is never `focused`, only `aria-selected`
        // the keyDown event does not actually fire on the option element
        e.stopPropagation();

        if (!disabled) {
          setSelected();
          onClick?.(e, value);
        }
      },
      [disabled, onClick, setSelected, value],
    );

    const { leftGlyph, rightGlyph } = useMemo(
      () =>
        getGlyphs({
          withIcons,
          isSelected,
          glyph,
          theme,
          darkMode,
          size,
          disabled,
          multiselect,
          optionTextId,
          isFocused,
        }),
      [
        darkMode,
        disabled,
        glyph,
        isSelected,
        multiselect,
        optionTextId,
        size,
        theme,
        withIcons,
        isFocused,
      ],
    );

    // When multiselect and withoutIcons the Checkbox is aligned to the top instead of centered.
    const multiSelectWithoutIcons = multiselect && !withIcons;

    return (
      <InputOption
        {...rest}
        as="li"
        ref={optionRef}
        highlighted={isFocused}
        disabled={disabled}
        aria-label={displayName}
        darkMode={darkMode}
        className={cx(
          {
            [largeStyles]: size === ComboboxSize.Large,
            [multiselectIconPosition]: multiSelectWithoutIcons,
            [multiselectIconLargePosition]:
              multiSelectWithoutIcons && size === ComboboxSize.Large,
          },
          className,
        )}
        onClick={handleOptionClick}
        onKeyDown={handleOptionClick}
      >
        <InputOptionContent
          leftGlyph={leftGlyph}
          rightGlyph={rightGlyph}
          description={description}
        >
          <span id={optionTextId} className={displayNameStyle(isSelected)}>
            {wrapJSX(displayName, inputValue, 'strong')}
          </span>
        </InputOptionContent>
      </InputOption>
    );
  },
);
InternalComboboxOption.displayName = 'ComboboxOption';

export function ComboboxOption(_: ComboboxOptionProps): JSX.Element {
  throw Error('`ComboboxOption` must be a child of a `Combobox` instance');
}
ComboboxOption.displayName = 'ComboboxOption';
