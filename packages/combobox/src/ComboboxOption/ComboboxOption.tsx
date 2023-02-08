import React, { useCallback, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@leafygreen-ui/checkbox';
import { css, cx } from '@leafygreen-ui/emotion';
import { useForwardedRef, useIdAllocator } from '@leafygreen-ui/hooks';
import Icon, { isComponentGlyph } from '@leafygreen-ui/icon';
import { palette } from '@leafygreen-ui/palette';

import {
  ComboboxOptionProps,
  InternalComboboxOptionProps,
} from '../Combobox.types';
import { ComboboxContext } from '../ComboboxContext';
import { wrapJSX } from '../utils';

import {
  checkIconStyle,
  comboboxOptionActiveStyle,
  comboboxOptionBaseStyle,
  comboboxOptionDisabledStyle,
  comboboxOptionSizeStyle,
  comboboxOptionThemeStyle,
  disallowPointer,
  displayNameStyle,
  flexSpan,
} from './ComboboxOption.styles';

/**
 * Component
 */
export const InternalComboboxOption = React.forwardRef<
  HTMLLIElement,
  InternalComboboxOptionProps
>(
  (
    {
      displayName,
      glyph,
      isSelected,
      isFocused,
      disabled,
      setSelected,
      className,
    }: InternalComboboxOptionProps,
    forwardedRef,
  ) => {
    const { multiselect, darkMode, theme, withIcons, inputValue, size } =
      useContext(ComboboxContext);
    const optionTextId = useIdAllocator({ prefix: 'combobox-option-text' });
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

    const renderedIcon = useMemo(() => {
      if (glyph) {
        if (isComponentGlyph(glyph)) {
          return glyph;
        }
        console.error(
          '`ComboboxOption` instance did not render icon because it is not a known glyph element.',
          glyph,
        );
      }
    }, [glyph]);

    const renderedChildren = useMemo(() => {
      // Multiselect
      if (multiselect) {
        const checkbox = (
          <Checkbox
            aria-labelledby={optionTextId}
            checked={isSelected}
            tabIndex={-1}
            disabled={disabled}
            darkMode={darkMode}
            className={css`
              // TODO: Remove when this is resolved:
              // https://jira.mongodb.org/browse/PD-2171
              & > label > div {
                margin-top: 0;
              }
            `}
          />
        );

        return (
          <>
            <span className={cx(flexSpan, disallowPointer)}>
              {withIcons ? renderedIcon : checkbox}
              <span id={optionTextId} className={displayNameStyle(isSelected)}>
                {wrapJSX(displayName, inputValue, 'strong')}
              </span>
            </span>
            {withIcons && checkbox}
          </>
        );
      }

      // Single select
      return (
        <>
          <span className={cx(flexSpan, disallowPointer)}>
            {renderedIcon}
            <span className={displayNameStyle(isSelected)}>
              {wrapJSX(displayName, inputValue, 'strong')}
            </span>
          </span>
          {isSelected && (
            <Icon
              glyph="Checkmark"
              className={checkIconStyle[size]}
              color={darkMode ? palette.blue.light1 : palette.blue.base}
            />
          )}
        </>
      );
    }, [
      multiselect,
      renderedIcon,
      isSelected,
      displayName,
      inputValue,
      size,
      darkMode,
      optionTextId,
      disabled,
      withIcons,
    ]);

    return (
      <li
        ref={optionRef}
        role="option"
        aria-selected={isFocused}
        aria-label={displayName}
        tabIndex={-1}
        className={cx(
          comboboxOptionBaseStyle,
          comboboxOptionSizeStyle[size],
          comboboxOptionThemeStyle[theme],
          {
            [comboboxOptionActiveStyle[theme]]: isFocused,
            [comboboxOptionDisabledStyle[theme]]: disabled,
          },
          className,
        )}
        onClick={handleOptionClick}
        onKeyDown={handleOptionClick}
      >
        {renderedChildren}
      </li>
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
