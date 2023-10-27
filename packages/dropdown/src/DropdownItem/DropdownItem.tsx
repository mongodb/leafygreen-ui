import React from 'react';

import { InputOption, InputOptionContent } from '@leafygreen-ui/input-option';
import { keyMap } from '@leafygreen-ui/lib';
import { InferredPolymorphic } from '@leafygreen-ui/polymorphic';

import { useDropdownContext } from '../DropdownContext';
import { useFocusableDropdownItem, useMergeRefs } from '../utils';

import { DropdownItemProps } from './DropdownItem.types';

export const DropdownItem = InferredPolymorphic<DropdownItemProps, 'div'>(
  (
    {
      children,
      disabled,
      active,
      description,
      leftGlyph,
      rightGlyph,
      onClick,
      ...rest
    }: DropdownItemProps,
    forwardRef,
  ) => {
    const { handleDropdownClose, renderedContext } = useDropdownContext();

    const {
      checkedVariant,
      ref,
      index,
      onFocus,
      onBlur,
      tabIndex,
      ['data-selected']: dataSelected,
    } = useFocusableDropdownItem({ disabled });

    const itemRef = useMergeRefs(forwardRef, ref);
    const label = `menu item ${index}`;

    const handleClick = (e: React.SyntheticEvent) => {
      e.preventDefault();
      onClick?.(e as React.MouseEvent);
      handleDropdownClose?.();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === keyMap.Enter) {
        handleClick(e);
      }
    };

    return (
      <InputOption
        renderedContext={renderedContext}
        role="option"
        ref={itemRef}
        aria-labelledby={label}
        disabled={disabled}
        highlighted={dataSelected}
        checked={active}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tab-index={tabIndex}
        checkedVariant={checkedVariant}
        {...rest}
      >
        <InputOptionContent
          description={description}
          leftGlyph={leftGlyph}
          rightGlyph={rightGlyph}
        >
          {children}
        </InputOptionContent>
      </InputOption>
    );
  },
);

DropdownItem.displayName = 'DropdownItem';
