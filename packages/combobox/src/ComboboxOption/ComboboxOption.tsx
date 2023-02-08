import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { useForwardedRef } from '@leafygreen-ui/hooks';
import { InputOption } from '@leafygreen-ui/input-option';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import {
  ComboboxOptionProps,
  InternalComboboxOptionProps,
} from '../Combobox.types';
import { ComboboxContext } from '../ComboboxContext';

import {
  comboboxOptionBaseStyle,
  comboboxOptionSizeStyle,
} from './ComboboxOption.styles';
import { OptionContent } from './OptionContent';

/**
 * Component
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
      ...rest
    }: InternalComboboxOptionProps,
    forwardedRef,
  ) => {
    const { darkMode } = useDarkMode();
    const { size } = useContext(ComboboxContext);
    const optionRef = useForwardedRef(forwardedRef, null);

    const handleOptionClick = useCallback(
      (e: React.SyntheticEvent) => {
        // stopPropagation will not stop the keyDown event (only click)
        // since the option is never `focused`, only `aria-selected`
        // the keyDown event does not actually fire on the option element
        e.stopPropagation();

        // If user clicked on the option, or the checkbox
        // Ignore extra click events on the checkbox wrapper
        if (
          !disabled &&
          (e.target === optionRef.current ||
            (e.target as Element).tagName === 'INPUT')
        ) {
          setSelected();
        }
      },
      [disabled, optionRef, setSelected],
    );

    return (
      <InputOption
        {...rest}
        as="li"
        ref={optionRef}
        focused={isFocused}
        disabled={disabled}
        aria-label={displayName}
        darkMode={darkMode}
        className={cx(
          comboboxOptionBaseStyle,
          comboboxOptionSizeStyle[size],
          className,
        )}
        onClick={handleOptionClick}
        onKeyDown={handleOptionClick}
      >
        <OptionContent
          disabled={disabled}
          displayName={displayName}
          glyph={glyph}
          isSelected={isSelected}
        />
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
};
