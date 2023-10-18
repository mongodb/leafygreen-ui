import React from 'react';

import { InputOption, InputOptionContent } from '@leafygreen-ui/input-option';
import {
  PolymorphicAs,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';

import { useFocusableDropdownItem, useMergeRefs } from '../utils';

import { DropdownItemProps } from './DropdownItem.types';

export const DropdownItem = React.forwardRef(
  (
    {
      children,
      disabled,
      as: asProp,
      active,
      className,
      description,
      leftGlyph,
      rightGlyph,
      ...rest
    }: DropdownItemProps<PolymorphicAs>,
    forwardRef,
  ) => {
    const { Component: as } = useInferredPolymorphic(asProp, rest, 'div');
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

    return (
      <InputOption
        role="option"
        as={as}
        ref={itemRef}
        aria-labelledby={label}
        disabled={disabled}
        highlighted={dataSelected}
        checked={active}
        className={className}
        onFocus={onFocus}
        onBlur={onBlur}
        tab-index={tabIndex}
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
