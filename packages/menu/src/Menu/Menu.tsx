import React, { useCallback, useRef, useState } from 'react';

import {
  getDescendantById,
  useInitDescendants,
} from '@leafygreen-ui/descendants';
import { css, cx } from '@leafygreen-ui/emotion';
import { useBackdropClick, useEventListener } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { isDefined, keyMap, Theme } from '@leafygreen-ui/lib';
import Popover, {
  Align,
  DismissMode,
  getPopoverRenderModeProps,
  Justify,
  RenderMode,
} from '@leafygreen-ui/popover';

import { LGIDs } from '../constants';
import { useHighlightReducer } from '../HighlightReducer';
import {
  MenuContext,
  MenuDescendantsContext,
} from '../MenuContext/MenuContext';

import { useMenuHeight } from './utils/useMenuHeight';
import {
  getDarkInLightModeMenuStyles,
  getMenuStyles,
  scrollContainerStyle,
} from './Menu.styles';
import { MenuProps } from './Menu.types';

/**
 *
 * Menus are used when a user needs to take an action.
 *
 * In a menu a user takes an action (like copy/delete a property or navigate to a different section/screen).
 *
 * @param props.children Content to appear inside of Menu.
 * @param props.open Boolean to describe whether or not Menu is open.
 * @param props.setOpen Callback to change the open state of the Menu.
 * @param props.shouldClose Callback to determine whether or not Menu should close when user tries to close it.
 * @param props.className Classname applied to Menu.
 * @param props.align Alignment of Menu relative to another element: `top`, `bottom`, `left`, `right`.
 * @param props.justify Justification of Menu relative to another element: `start`, `middle`, `end`.
 * @param props.refEl Reference element that Menu should be positioned against.
 * @param props.renderMode Options to render the popover element: `inline`, `portal`, `top-layer`.
 * @param props.trigger Trigger element can be ReactNode or function, and, if present, internally manages active state of Menu.
 * @param props.darkMode Determines whether or not the component will be rendered in dark theme.
 */
export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(function Menu(
  {
    align = Align.Bottom,
    justify = Justify.End,
    adjustOnMutation = false,
    shouldClose = () => true,
    spacing = 6,
    maxHeight = 344,
    initialOpen = false,
    open: controlledOpen,
    setOpen: controlledSetOpen,
    darkMode: darkModeProp,
    renderDarkMenu = true,
    children,
    className,
    refEl,
    trigger,
    renderMode = RenderMode.TopLayer,
    portalClassName,
    portalContainer,
    portalRef,
    scrollContainer,
    popoverZIndex,
    ...rest
  }: MenuProps,
  forwardRef,
) {
  const { theme, darkMode } = useDarkMode(darkModeProp);

  const popoverRef = useRef<HTMLDivElement | null>(null);
  const defaultTriggerRef = useRef<HTMLElement>(null);
  const triggerRef = refEl ?? defaultTriggerRef;
  const keyboardUsedRef = useRef<boolean>(false);

  const [uncontrolledOpen, uncontrolledSetOpen] = useState(initialOpen);

  const setOpen =
    (typeof controlledOpen === 'boolean' && controlledSetOpen) ||
    uncontrolledSetOpen;
  const open = controlledOpen ?? uncontrolledOpen;
  const handleClose = useCallback(() => {
    if (shouldClose()) {
      keyboardUsedRef.current = false;
      setOpen(false);
    }
  }, [setOpen, shouldClose]);

  const maxMenuHeightValue = useMenuHeight({
    refEl: triggerRef,
    spacing,
    maxHeight,
  });

  useBackdropClick(handleClose, [popoverRef, triggerRef], open);

  const { getDescendants, Provider: MenuDescendantsProvider } =
    useInitDescendants(MenuDescendantsContext);

  // Tracks the currently highlighted (focused) item index
  // Fires `.focus()` when the index is updated
  const { highlight, moveHighlight, setHighlight } = useHighlightReducer(
    getDescendants,
    _next => {
      if (isDefined(_next)) {
        const nextDescendant = getDescendantById(_next.id, getDescendants());
        const descendantElement = nextDescendant?.ref.current;
        descendantElement?.focus();
      }
    },
  );

  // Callback fired when the popover transition finishes.
  // Handling on this event ensures that the `descendants` elements
  // exist in the DOM before attempting to set `focus`
  const handlePopoverOpen = () => {
    if (keyboardUsedRef.current) {
      moveHighlight('first');
    }
  };

  // Fired on global keyDown event
  function handleKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case keyMap.ArrowDown:
        e.preventDefault(); // Prevents page scrolling
        moveHighlight('next');
        break;

      case keyMap.ArrowUp:
        e.preventDefault(); // Prevents page scrolling
        moveHighlight('prev');
        break;

      case keyMap.Tab:
        e.preventDefault(); // Prevent tabbing outside of portal and outside of the DOM when `renderMode="portal"`
        handleClose();
        triggerRef?.current?.focus(); // Focus the trigger on close
        break;

      case keyMap.Escape:
        handleClose();
        triggerRef?.current?.focus(); // Focus the trigger on close
        break;

      case keyMap.Space:
      case keyMap.Enter:
        if (!open) {
          moveHighlight('first');
        }
        break;
    }
  }

  useEventListener('keydown', handleKeyDown, { enabled: open });

  const popoverProps = {
    popoverZIndex,
    spacing,
    ...getPopoverRenderModeProps({
      dismissMode: DismissMode.Manual,
      portalClassName,
      portalContainer,
      portalRef,
      renderMode,
      scrollContainer,
    }),
  } as const;

  const popoverContent = (
    <MenuDescendantsProvider>
      <MenuContext.Provider
        value={{
          theme,
          darkMode,
          highlight,
          setHighlight,
          moveHighlight,
          renderDarkMenu,
        }}
      >
        <Popover
          key="popover"
          active={open}
          align={align}
          justify={justify}
          refEl={triggerRef}
          adjustOnMutation={adjustOnMutation}
          onEntered={handlePopoverOpen}
          data-testid={LGIDs.root}
          data-lgid={LGIDs.root}
          ref={popoverRef}
          {...popoverProps}
        >
          <div
            data-theme={theme}
            className={cx(
              getMenuStyles({ theme }),
              css`
                max-height: ${maxMenuHeightValue};
              `,
              {
                // TODO: Remove dark-in-light mode styles
                // after https://jira.mongodb.org/browse/LG-3974
                [getDarkInLightModeMenuStyles()]:
                  theme === Theme.Light && renderDarkMenu,
              },
              className,
            )}
            ref={forwardRef}
          >
            {/* Need to stop propagation, otherwise Menu will closed automatically when clicked */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events*/}
            <ul
              {...rest}
              className={scrollContainerStyle}
              role="menu"
              onClick={e => e.stopPropagation()}
            >
              {children}
            </ul>
          </div>
        </Popover>
      </MenuContext.Provider>
    </MenuDescendantsProvider>
  );

  if (trigger) {
    const triggerClickHandler = (event?: React.MouseEvent) => {
      event?.preventDefault();

      // If enter or space key is pressed, event detail is 0 https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event#usage_notes
      if (event?.detail === 0) {
        keyboardUsedRef.current = true;
      }

      setOpen(curr => !curr);

      if (trigger && typeof trigger !== 'function') {
        trigger.props?.onClick?.(event);
      }
    };

    if (typeof trigger === 'function') {
      return (
        <>
          {trigger({
            onClick: triggerClickHandler,
            ref: triggerRef,
            ['aria-expanded']: open,
            ['aria-haspopup']: true,
          })}
          {popoverContent}
        </>
      );
    }

    const renderedTrigger = React.cloneElement(trigger, {
      ref: triggerRef,
      onClick: triggerClickHandler,
      ['aria-expanded']: open,
      ['aria-haspopup']: true,
    });

    return (
      <>
        {renderedTrigger}
        {popoverContent}
      </>
    );
  }

  return popoverContent;
});

Menu.displayName = 'Menu';

export default Menu;
