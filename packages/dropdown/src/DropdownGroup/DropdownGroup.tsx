import React, { useRef, useState } from 'react';
import { Transition } from 'react-transition-group';

import { css, cx } from '@leafygreen-ui/emotion';
import { useEventListener } from '@leafygreen-ui/hooks';
import ChevronDownIcon from '@leafygreen-ui/icon/dist/ChevronDown';
import ChevronUpIcon from '@leafygreen-ui/icon/dist/ChevronUp';
import IconButton from '@leafygreen-ui/icon-button';
import { InputOption, InputOptionContent } from '@leafygreen-ui/input-option';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { keyMap } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { InferredPolymorphic } from '@leafygreen-ui/polymorphic';

import { useDropdownContext } from '../DropdownContext';
import { useFocusableDropdownItem, useMergeRefs } from '../utils';

import { DropdownGroupProps } from './DropdownGroup.types';

export const DropdownGroup = InferredPolymorphic<DropdownGroupProps, 'div'>(
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
      ...rest
    }: DropdownGroupProps,
    forwardRef,
  ) => {
    const { renderedContext } = useDropdownContext();
    const { darkMode } = useDarkMode();
    const chevronRef = useRef<HTMLElement | null>(null);
    const transitionRef = useRef<HTMLElement | null>(null);

    const {
      ref,
      index,
      onFocus,
      onBlur,
      tabIndex,
      highlighted: dataSelected,
    } = useFocusableDropdownItem({ disabled });

    const itemRef = useMergeRefs(forwardRef, ref);
    const [open, setOpen] = useState(false);
    const label = `menu item ${index}`;

    const handleClick = (e: React.SyntheticEvent) => {
      e.preventDefault();

      if (!chevronRef?.current?.contains(e.target as Node)) {
        onClick?.(e as React.MouseEvent);

        if (!hasAction) {
          setOpen(curr => !curr);
        }
      }
    };

    const ChevronIcon = open ? ChevronDownIcon : ChevronUpIcon;

    const handleChevronClick = (e: React.SyntheticEvent) => {
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
        handleClick(e as unknown as React.SyntheticEvent);
      }
    };

    useEventListener('keydown', handleKeyDown, { enabled: dataSelected });

    const numberOfMenuItems = React.Children.toArray(children).length;

    return (
      <>
        <InputOption
          renderedContext={renderedContext}
          role="option"
          ref={itemRef}
          aria-label={label}
          disabled={disabled}
          highlighted={dataSelected}
          checked={active}
          onClick={handleClick}
          onFocus={onFocus}
          onBlur={onBlur}
          tab-index={tabIndex}
          className={cx(
            css`
              display: flex;
            `,
            className,
          )}
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
          nodeRef={transitionRef}
        >
          {(state: string) => {
            return (
              <div
                role="group"
                className={cx(
                  css`
                    background-color: ${darkMode
                      ? palette.gray.dark2
                      : palette.white};
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
