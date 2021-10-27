import { css, cx } from '@leafygreen-ui/emotion';
import { kebabCase, startCase } from 'lodash';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ComboboxOptionProps } from './Combobox.types';
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

export default function ComboboxOption({
  value: valueProp,
  displayName,
  children,
  glyph,
  className,
}: ComboboxOptionProps) {
  const { multiselect, focusedOption, selected } = useContext(ComboboxContext);

  const optionRef = useRef<HTMLLIElement>(null);

  const value = valueProp ?? kebabCase(displayName);
  const renderedChildren = children ?? displayName ?? startCase(value);
  const isSelected = value === selected;
  const isFocused = value === focusedOption;

  useEffect(() => {
    if (isFocused) {
      optionRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <li
      ref={optionRef}
      role="option"
      aria-selected={isSelected}
      tabIndex={-1}
      className={cx(comboboxOptionStyle, className)}
    >
      {renderedChildren}
      {selected ? '✅' : ''}
    </li>
  );
}
