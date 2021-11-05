import { css, cx } from '@leafygreen-ui/emotion';
import React, { useCallback, useContext, useMemo, useRef } from 'react';
import { uiColors } from '@leafygreen-ui/palette';
import { isComponentType } from '@leafygreen-ui/lib';
import Checkbox from '@leafygreen-ui/checkbox';
import Icon, { isComponentGlyph } from '@leafygreen-ui/icon';
import {
  ComboboxOptionProps,
  InternalComboboxOptionProps,
} from './Combobox.types';
import { ComboboxContext } from './ComboboxContext';

/**
 * Styles
 */

const comboboxOptionStyle = (multiselect: boolean) => css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  color: inherit;
  cursor: pointer;
  overflow: hidden;
  font-size: var(--lg-combobox-item-font-size);
  line-height: var(--lg-combobox-item-line-height);
  padding: var(--lg-combobox-item-padding-y) var(--lg-combobox-item-padding-x);

  &:before {
    content: '';
    position: absolute;
    left: 0;
    width: 4px;
    height: var(--lg-combobox-item-wedge-height);
    background-color: transparent;
    border-radius: 0 2px 2px 0;
  }

  &:hover {
    outline: none;
    background-color: var(--lg-combobox-item-hover-color);
  }

  &[aria-selected='true'] {
    outline: none;
    background-color: var(--lg-combobox-item-active-color);

    &:before {
      background-color: var(--lg-combobox-item-wedge-color);
    }
  }
`;

const flexSpan = css`
  display: inline-flex;
  gap: 8px;
  justify-content: start;
  align-items: inherit;
`;

const displayNameStyle = (isSelected: boolean) => css`
  font-weight: ${isSelected ? 'bold' : 'normal'};
`;
/**
 * Component
 */

export function InternalComboboxOption({
  value,
  displayName,
  // children,
  glyph,
  isSelected,
  isFocused,
  setSelected,
  className,
}: InternalComboboxOptionProps) {
  const { multiselect, darkMode, withIcons } = useContext(ComboboxContext);
  const optionRef = useRef<HTMLLIElement>(null);

  const handleOptionClick = useCallback(
    (e: React.SyntheticEvent) => {
      e.stopPropagation();
      // If user clicked on the option, or the checkbox
      // Ignore extra click events on the checkbox wrapper
      if (
        e.target === optionRef.current ||
        (e.target as Element).tagName === 'INPUT'
      ) {
        setSelected();
      }
    },
    [setSelected],
  );

  const renderedIcon = useMemo(() => {
    if (glyph) {
      if (isComponentGlyph(glyph) || isComponentType(glyph, 'Icon')) {
        return glyph;
      }
      console.error(
        '`ComboboxOption` instance did not render icon because it is not a known glyph element.',
        glyph,
      );
    }
  }, [glyph]);

  const renderedChildren = useMemo(() => {
    const renderedName = (
      <span className={displayNameStyle(isSelected)}>{displayName}</span>
    );

    // Multiselect
    if (multiselect) {
      const checkbox = (
        <Checkbox
          label=""
          aria-label={displayName}
          checked={isSelected}
          tabIndex={-1}
          animate={false}
        />
      );

      return (
        <>
          <span className={flexSpan}>
            {withIcons ? renderedIcon : checkbox}
            {renderedName}
          </span>
          {withIcons && checkbox}
        </>
      );
    }

    // Single select
    return (
      <>
        <span className={flexSpan}>
          {renderedIcon}
          {renderedName}
        </span>
        {isSelected && (
          <Icon
            glyph="Checkmark"
            color={darkMode ? uiColors.blue.light1 : uiColors.blue.base}
          />
        )}
      </>
    );
  }, [multiselect, renderedIcon, isSelected, darkMode, displayName, withIcons]);

  return (
    <li
      ref={optionRef}
      role="option"
      aria-selected={isFocused}
      tabIndex={-1}
      className={cx(comboboxOptionStyle(multiselect), className)}
      onClick={handleOptionClick}
      onKeyPress={handleOptionClick}
    >
      {renderedChildren}
    </li>
  );
}
InternalComboboxOption.displayName = 'ComboboxOption';

export default function ComboboxOption(_: ComboboxOptionProps): JSX.Element {
  throw Error('`ComboboxOption` must be a child of a `Combobox` instance');
}
ComboboxOption.displayName = 'ComboboxOption';
