import React, { useCallback, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@leafygreen-ui/checkbox';
import { cx } from '@leafygreen-ui/emotion';
import { useForwardedRef, useIdAllocator } from '@leafygreen-ui/hooks';
import Icon, { isComponentGlyph } from '@leafygreen-ui/icon';
import { InputOption, InputOptionContent } from '@leafygreen-ui/input-option';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { palette } from '@leafygreen-ui/palette';

import {
  ComboboxOptionProps,
  InternalComboboxOptionProps,
} from '../Combobox.types';
import { ComboboxContext } from '../ComboboxContext';
import { wrapJSX } from '../utils';

import {
  checkBoxBaseStyles,
  checkIconStyle,
  comboboxOptionSizeStyle,
  displayNameStyle,
} from './ComboboxOption.styles';

/**
 * Internal ComboboxOption Component for use within Combobox only.
 *
 * Prefer using {@link ComboboxOption}
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
      disabled,
      setSelected,
      className,
      description = '',
      ...rest
    }: InternalComboboxOptionProps,
    forwardedRef,
  ) => {
    const { darkMode } = useDarkMode();
    const { multiselect, size, withIcons, inputValue } =
      useContext(ComboboxContext);
    const optionRef = useForwardedRef(forwardedRef, null);
    const optionTextId = useIdAllocator({ prefix: 'combobox-option-text' });

    const handleOptionClick = useCallback(
      (e: React.SyntheticEvent) => {
        // stopPropagation will not stop the keyDown event (only click)
        // since the option is never `focused`, only `aria-selected`
        // the keyDown event does not actually fire on the option element
        e.stopPropagation();

        if (!disabled) {
          setSelected();
        }
      },
      [disabled, setSelected],
    );

    const icon = useMemo((): JSX.Element => {
      if (glyph) {
        if (isComponentGlyph(glyph)) {
          return glyph;
        }
        console.error(
          '`ComboboxOption` instance did not render icon because it is not a known glyph element.',
          glyph,
        );
      }

      return <></>;
    }, [glyph]);

    const checkbox = (
      <Checkbox
        aria-labelledby={optionTextId}
        checked={isSelected}
        tabIndex={-1}
        disabled={disabled}
        darkMode={darkMode}
        className={checkBoxBaseStyles}
      />
    );

    const checkMark = (
      <Icon
        glyph="Checkmark"
        className={checkIconStyle[size]}
        color={darkMode ? palette.blue.light1 : palette.blue.base}
      />
    );

    const multiSelectLeftGlyph = withIcons ? icon : checkbox;
    const multiSelectRightGlyph = withIcons && checkbox;

    const singleSelectLeftGlyph = withIcons
      ? icon
      : isSelected
      ? checkMark
      : null;
    const singleSelectRightGlyph = withIcons && isSelected && checkMark;

    return (
      <InputOption
        {...rest}
        as="li"
        ref={optionRef}
        highlighted={isFocused}
        disabled={disabled}
        aria-label={displayName}
        darkMode={darkMode}
        className={cx(comboboxOptionSizeStyle(size), className)}
        onClick={handleOptionClick}
        onKeyDown={handleOptionClick}
      >
        <InputOptionContent
          leftGlyph={multiselect ? multiSelectLeftGlyph : singleSelectLeftGlyph}
          rightGlyph={
            multiselect ? multiSelectRightGlyph : singleSelectRightGlyph
          }
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

ComboboxOption.propTypes = {
  displayName: PropTypes.string,
  value: PropTypes.string,
  glyph: PropTypes.node,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  description: PropTypes.string,
};
