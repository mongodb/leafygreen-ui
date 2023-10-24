import React, { useRef, useState } from 'react';
import { Transition } from 'react-transition-group';

import { css, cx } from '@leafygreen-ui/emotion';
import { useEventListener } from '@leafygreen-ui/hooks';
import ChevronDownIcon from '@leafygreen-ui/icon/dist/ChevronDown';
import ChevronUpIcon from '@leafygreen-ui/icon/dist/ChevronUp';
import IconButton from '@leafygreen-ui/icon-button';
import { InputOption, InputOptionContent } from '@leafygreen-ui/input-option';
import { keyMap } from '@leafygreen-ui/lib';
import {
  PolymorphicAs,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';

import { useFocusableDropdownItem, useMergeRefs } from '../utils';

import { DropdownGroupProps } from './DropdownGroup.types';

export const DropdownGroup = React.forwardRef(
  (
    {
      title,
      children,
      onClick,
      description,
      className,
      leftGlyph,
      hasAction,
      active = false,
      disabled = false,
      as: asProp,
      ...rest
    }: DropdownGroupProps<PolymorphicAs>,
    forwardRef,
  ) => {
    const { Component: as } = useInferredPolymorphic(asProp, rest, 'div');
    const chevronRef = useRef<HTMLElement | null>(null);

    const {
      ref,
      index,
      onFocus,
      onBlur,
      tabIndex,
      ['data-selected']: dataSelected,
    } = useFocusableDropdownItem({ disabled });

    const itemRef = useMergeRefs(forwardRef, ref);
    const [open, setOpen] = useState(false);
    const label = `menu item ${index}`;

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();

      if (!chevronRef?.current?.contains(e.target as Node)) {
        onClick?.(e);

        if (!hasAction) {
          setOpen(curr => !curr);
        }
      }
    };

    const ChevronIcon = open ? ChevronDownIcon : ChevronUpIcon;

    const handleChevronClick = (e: React.MouseEvent) => {
      e.preventDefault();
      // we stop the event from propagating and closing the entire menu
      e.nativeEvent.stopImmediatePropagation();

      setOpen(curr => !curr);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === keyMap.ArrowLeft) {
        setOpen(false);
      }

      if (e.key === keyMap.ArrowRight) {
        setOpen(true);
      }

      if (e.key === keyMap.Space || e.key === keyMap.Enter) {
        handleClick(e);
      }
    };

    useEventListener('keydown', handleKeyDown, { enabled: dataSelected });

    const numberOfMenuItems = React.Children.toArray(children).length;

    return (
      <>
        <InputOption
          role="option"
          as={as as PolymorphicAs}
          ref={itemRef}
          aria-labelledby={label}
          disabled={disabled}
          highlighted={dataSelected}
          checked={active}
          className={className}
          onClick={handleClick}
          onFocus={onFocus}
          onBlur={onBlur}
          tab-index={tabIndex}
          {...rest}
        >
          <InputOptionContent
            description={description}
            leftGlyph={leftGlyph}
            rightGlyph={
              <IconButton
                ref={chevronRef}
                onClick={handleChevronClick}
                aria-labelledby="close icon"
              >
                <ChevronIcon />
              </IconButton>
            }
          >
            {title}
          </InputOptionContent>
        </InputOption>
        <Transition
          in={open}
          timeout={{ enter: 0, exit: 150 }}
          mountOnEnter
          unmountOnExit
        >
          {(state: string) => {
            return (
              <div
                role="group"
                className={cx(
                  css`
                    height: 0;
                    transition: height 150ms ease-in-out;
                  `,
                  {
                    [css`
                      height: ${36 * numberOfMenuItems}px;
                    `]: state === 'entered',
                  },
                )}
              >
                {children}
              </div>
            );
          }}
        </Transition>
      </>
    );
  },
);

DropdownGroup.displayName = 'DropdownGroup';
