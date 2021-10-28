import { css, cx } from '@leafygreen-ui/emotion';
import { kebabCase, startCase } from 'lodash';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  ComboboxOptionProps,
  InternalComboboxOptionProps,
} from './Combobox.types';
import { ComboboxContext } from './ComboboxContext';

/**
 * Styles
 */

const comboboxOptionStyle = css`
  position: relative;
  display: flex;
  align-items: center;
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

  &:hover,
  &:focus {
    outline: none;
    background-color: var(--lg-combobox-item-active-color);

    &:before {
      background-color: var(--lg-combobox-item-wedge-color);
    }
  }
`;

/**
 * Component
 */

export function InternalComboboxOption({
  value,
  // displayName,
  children,
  glyph,
  isSelected,
  isFocused,
  setSelected,
  className,
}: InternalComboboxOptionProps) {
  const { multiselect } = useContext(ComboboxContext);

  const optionRef = useRef<HTMLLIElement>(null);

  // const value = valueProp ?? kebabCase(displayName);
  // const renderedChildren = children ?? displayName ?? startCase(value);
  // const isSelected = value === selected;
  // const isFocused = value === focusedOption;

  useEffect(() => {
    if (isFocused) {
      optionRef.current?.focus();
    }
  }, [isFocused]);

  const handleOptionClick = () => {
    setSelected();
  };

  return (
    <li
      ref={optionRef}
      role="option"
      aria-selected={isSelected}
      tabIndex={-1}
      className={cx(comboboxOptionStyle, className)}
      onClick={handleOptionClick}
      onKeyPress={handleOptionClick}
    >
      {children}
      {isSelected ? ' ✅' : ''}
    </li>
  );
}
InternalComboboxOption.displayName = 'ComboboxOption';

export default function ComboboxOption(_: ComboboxOptionProps): JSX.Element {
  throw Error('`ComboboxOption` must be a child of a `Combobox` instance');
}
ComboboxOption.displayName = 'ComboboxOption';
