import React, { useEffect, useState } from 'react';

import { InputOption, InputOptionContent } from '@leafygreen-ui/input-option';
import { PolymorphicAs } from '@leafygreen-ui/polymorphic';

import { DescendantContext, useDescendant } from '../DescendantContext';
import { HighlightBehavior } from '../Dropdown/Dropdown.types';
import { useHighlightContext } from '../HighlightContext';
import { useMergeRefs } from '../utils';

import { DropdownItemProps } from './DropdownItem.types';

export const DropdownItem = React.forwardRef(
  (
    {
      children,
      disabled,
      as,
      active,
      className,
      description,
      leftGlyph,
      rightGlyph,
      ...rest
    }: DropdownItemProps<PolymorphicAs>,
    forwardRef,
  ) => {
    const { index, ref } = useDescendant(DescendantContext, {
      disabled,
    });
    const { highlightBehavior, highlightedRef, setHighlightedRef } =
      useHighlightContext();
    const itemRef = useMergeRefs(forwardRef, ref);
    const [_, force] = useState({});

    const label = `menu item ${index}`;

    useEffect(() => {
      if (index && index < 0) {
        force({});
      }
    }, [index]);

    const highlighted = highlightedRef === ref.current;

    const onFocus = () => {
      if (highlightBehavior === HighlightBehavior.Focus) {
        setHighlightedRef?.(ref.current);
      }
    };

    const onBlur = () => {
      if (highlightBehavior === HighlightBehavior.Focus) {
        setHighlightedRef?.(null);
      }
    };

    return (
      <InputOption
        role="menuitem"
        as={as}
        ref={itemRef}
        aria-labelledby={label}
        disabled={disabled}
        highlighted={highlighted}
        checked={active}
        className={className}
        onFocus={onFocus}
        onBlur={onBlur}
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
