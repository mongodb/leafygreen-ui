import React, { useCallback, useEffect, useState } from 'react';

import { css, cx } from '@leafygreen-ui/emotion';
import {
  useAutoScroll,
  useBackdropClick,
  useEventListener,
  useIsomorphicLayoutEffect,
  usePrevious,
} from '@leafygreen-ui/hooks';
import { CheckedVariant } from '@leafygreen-ui/input-option';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import Popover, { Align, Justify } from '@leafygreen-ui/popover';

import { DescendantContext, useDescendants } from '../DescendantContext';
import { DropdownContext } from '../DropdownContext';
import { HighlightContext } from '../HighlightContext';
import { handleKeyboardNavigation, useMergeRefs } from '../utils';

import {
  baseMenuStyle,
  menuListStyle,
  menuThemeStyles,
} from './Dropdown.styles';
import { DropdownProps, HighlightBehavior } from './Dropdown.types';

// clean up input-option props and type errors
// test in mongo nav
// add data-focus and data-select
// fix dropdown group transition styling
// add generated story
// document all new props & get feedback on props
// add separator
export const Dropdown = React.forwardRef(
  (
    {
      align = Align.Bottom,
      adjustOnMutation = false,
      children,
      className,
      checkedVariant = CheckedVariant.Blue,
      darkMode: darkModeProp,
      highlightBehavior = HighlightBehavior.Focus,
      justify = Justify.End,
      maxWidth,
      open,
      portalClassName,
      portalContainer,
      popoverZIndex,
      scrollContainer,
      setOpen,
      shouldClose = () => true,
      spacing = 6,
      triggerRef,
      usePortal = true,
      ...rest
    }: DropdownProps,
    forwardRef,
  ) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);
    const { ref, ...contextProps } = useDescendants();
    const dropdownRef = useMergeRefs(forwardRef, ref);
    const [highlightedRef, setHighlightedRef] = useState<HTMLElement | null>(
      null,
    );
    const [firstOpen, setFirstOpen] = useState(false);
    const previousOpenState = usePrevious(open);

    // Gets list of registered item refs and filters out disabled items
    // We use this to accurately cycle highlighted state
    const enabledRefs = contextProps?.list?.current
      ?.filter(element => {
        const id = element._internalId;
        return !contextProps?.map?.current?.[id].disabled;
      })
      .map(element => element.element);

    // Keeps currently highlighted item in state
    // And manually moves focus to appropriate item if `highlightBehavior` is set to 'focus'
    const setHighlighted = useCallback(
      (ref: HTMLElement | null) => {
        setHighlightedRef(ref);

        if (highlightBehavior === HighlightBehavior.Focus && ref) {
          ref.focus();
        }
      },
      [highlightBehavior],
    );

    // Check that this is the first time we're opening the Dropdown
    // Will use this to move focus to the first element but the check below will be true before
    // `enabledRefs` has been populated
    useEffect(() => {
      if (open && previousOpenState === false) {
        setFirstOpen(true);
      }
    }, [open, previousOpenState, setFirstOpen]);

    // If first open and `enabledRefs` contains the appropriate refs
    // Move focus to first enabled ref
    useEffect(() => {
      if (firstOpen && enabledRefs?.[0]) {
        setHighlighted(enabledRefs[0]);
        setFirstOpen(false);
      }

      if (highlightBehavior === HighlightBehavior.AriaSelected) {
        triggerRef?.current?.focus();
      }
    }, [firstOpen, enabledRefs, setHighlighted, highlightBehavior, triggerRef]);

    // Updates highlightedRef when a DropdownGroup's IconButton is clicked to the appropriate item
    useIsomorphicLayoutEffect(() => {
      const focusedEl = document.activeElement;

      const foundEl = enabledRefs?.find(el => el.contains(focusedEl));

      if (foundEl) {
        setHighlighted(foundEl);
      }
    }, [setHighlighted, enabledRefs]);

    const handleClose = () => {
      if (shouldClose()) {
        setOpen(false);
        setHighlighted(null);
        triggerRef?.current?.focus();
      }
    };

    // Attaches global listeners
    useEventListener(
      'keydown',
      event =>
        handleKeyboardNavigation({
          event,
          enabledRefs,
          currentRef: highlightedRef,
          handleRefChange: setHighlighted,
          handleClose,
          refEl: triggerRef,
        }),
      { enabled: open },
    );
    useBackdropClick(handleClose, [ref!, triggerRef], open);
    useAutoScroll({ current: highlightedRef }, ref!);

    const popoverProps = {
      popoverZIndex,
      ...(usePortal
        ? {
            spacing,
            usePortal,
            portalClassName,
            portalContainer,
            scrollContainer,
          }
        : { spacing, usePortal }),
    };

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <DescendantContext.Provider value={contextProps}>
          <HighlightContext.Provider
            value={{
              checkedVariant,
              highlightBehavior,
              highlightedRef,
              setHighlightedRef: setHighlighted,
            }}
          >
            <DropdownContext.Provider
              value={{ handleDropdownClose: handleClose }}
            >
              <Popover
                active={open}
                align={align}
                adjustOnMutation={adjustOnMutation}
                justify={justify}
                refEl={triggerRef}
                {...popoverProps}
              >
                <div className={cx(baseMenuStyle, menuThemeStyles[theme])}>
                  {/* Need to stop propagation, otherwise Menu will closed automatically when clicked */}
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events*/}
                  <div
                    role="listbox"
                    ref={dropdownRef}
                    onClick={e => e.stopPropagation()}
                    className={cx(
                      menuListStyle,
                      css`
                        max-width: ${maxWidth}px;
                      `,
                      className,
                    )}
                    tabIndex={-1}
                    {...rest}
                  >
                    {children}
                  </div>
                </div>
              </Popover>
            </DropdownContext.Provider>
          </HighlightContext.Provider>
        </DescendantContext.Provider>
      </LeafyGreenProvider>
    );
  },
);

Dropdown.displayName = 'Dropdown';
