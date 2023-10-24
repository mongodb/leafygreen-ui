import React from 'react';

import { useEventListener } from '@leafygreen-ui/hooks';
import { InputOption, InputOptionContent } from '@leafygreen-ui/input-option';
import { keyMap } from '@leafygreen-ui/lib';
import {
  PolymorphicAs,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';

import { useDropdownContext } from '../DropdownContext';
import { useFocusableDropdownItem, useMergeRefs } from '../utils';

import { DropdownItemProps } from './DropdownItem.types';

export const DropdownItem = React.forwardRef(
  (
    {
      children,
      disabled,
      as: asProp,
      active,
      description,
      leftGlyph,
      rightGlyph,
      onClick,
      ...rest
    }: DropdownItemProps<PolymorphicAs>,
    forwardRef,
  ) => {
    const { Component: as } = useInferredPolymorphic(asProp, rest, 'div');
    const { handleDropdownClose } = useDropdownContext();

    const {
      ref,
      index,
      onFocus,
      onBlur,
      tabIndex,
      ['data-selected']: dataSelected,
    } = useFocusableDropdownItem({ disabled });

    const itemRef = useMergeRefs(forwardRef, ref);
    const label = `menu item ${index}`;

    const handleClick = (e: React.Event) => {
      e.preventDefault();
      onClick?.(e);
      handleDropdownClose?.();
    };

    const handleKeyDown = (e: React.Event) => {
      if (e.key === keyMap.Enter) {
        handleClick(e);
      }
    };

    useEventListener('keydown', handleKeyDown, { enabled: dataSelected });

    return (
      <InputOption
        role="option"
        as={as as PolymorphicAs}
        ref={itemRef}
        aria-labelledby={label}
        disabled={disabled}
        highlighted={dataSelected}
        checked={active}
        onFocus={onFocus}
        onBlur={onBlur}
        tab-index={tabIndex}
        onClick={handleClick}
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
