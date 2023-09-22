import React, { useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';

import { css, cx } from '@leafygreen-ui/emotion';
import { useEventListener } from '@leafygreen-ui/hooks';
import ChevronDownIcon from '@leafygreen-ui/icon/dist/ChevronDown';
import ChevronUpIcon from '@leafygreen-ui/icon/dist/ChevronUp';
import IconButton from '@leafygreen-ui/icon-button';
import { InputOption, InputOptionContent } from '@leafygreen-ui/input-option';
import { keyMap } from '@leafygreen-ui/lib';
import { PolymorphicAs } from '@leafygreen-ui/polymorphic';

import { DescendantContext, useDescendant } from '../DescendantContext';
import { HighlightBehavior } from '../Dropdown/Dropdown.types';
import { useHighlightContext } from '../HighlightContext';
import { useMergeRefs } from '../utils';

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
      active = false,
      disabled = false,
      as = 'div',
      ...rest
    }: DropdownGroupProps<PolymorphicAs>,
    forwardRef,
  ) => {
    const { highlightBehavior, highlightedRef, setHighlightedRef } =
      useHighlightContext();
    const { index, ref } = useDescendant(DescendantContext, {
      disabled,
    });
    const itemRef = useMergeRefs(forwardRef, ref);
    const [open, setOpen] = useState(false);
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

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onClick?.(e);
    };

    const ChevronIcon = open ? ChevronDownIcon : ChevronUpIcon;

    const handleChevronClick = (e: React.MouseEvent) => {
      // we stop the event from propagating and closing the entire menu
      e.nativeEvent.stopImmediatePropagation();

      setOpen(curr => !curr);

      force({});
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === keyMap.ArrowLeft) {
        setOpen(false);
      }

      if (e.key === keyMap.ArrowRight) {
        setOpen(true);
      }
    };

    useEventListener('keydown', handleKeyDown, { enabled: highlighted });

    const numberOfMenuItems = React.Children.toArray(children).length;

    return (
      <>
        <InputOption
          role="option"
          as={as}
          ref={itemRef}
          aria-labelledby={label}
          disabled={disabled}
          highlighted={highlighted}
          checked={active}
          className={className}
          onClick={handleClick}
          onFocus={onFocus}
          onBlur={onBlur}
          {...rest}
        >
          <InputOptionContent
            description={description}
            leftGlyph={leftGlyph}
            rightGlyph={
              <IconButton
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
