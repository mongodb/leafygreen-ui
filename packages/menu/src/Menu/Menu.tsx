import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import isUndefined from 'lodash/isUndefined';
import PropTypes from 'prop-types';

import { css, cx } from '@leafygreen-ui/emotion';
import {
  useAvailableSpace,
  useBackdropClick,
  useEventListener,
  useForceRerender,
} from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { isComponentType, keyMap, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import Popover, { Align, Justify } from '@leafygreen-ui/popover';

import { MenuContext } from '../MenuContext/MenuContext';
import MenuSeparator from '../MenuSeparator/MenuSeparator';
import { SubMenu, type SubMenuProps } from '../SubMenu/';
import { ElementOf } from '../types';

import { MenuProps } from './Menu.types';

const rootMenuStyle = css`
  width: 210px;
  border-radius: 12px;
  overflow: auto;
  padding: 14px 0;
`;

const rootMenuThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.black};
  `,
  [Theme.Dark]: css`
    background-color: ${palette.gray.light2};
  `,
};

const scrollContainerStyle = css`
  overflow: auto;
  list-style: none;
  margin-block-start: 0px;
  margin-block-end: 0px;
  padding-inline-start: 0px;
  padding: 0px;
`;

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
 * @param props.usePortal Boolean to describe if content should be portaled to end of DOM, or appear in DOM tree.
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
    usePortal = true,
    open: controlledOpen,
    setOpen: controlledSetOpen,
    darkMode: darkModeProp,
    children,
    className,
    refEl,
    trigger,
    portalClassName,
    portalContainer,
    scrollContainer,
    popoverZIndex,
    ...rest
  }: MenuProps,
  forwardRef,
) {
  const { theme, darkMode } = useDarkMode(darkModeProp);

  const hasSetInitialFocus = useRef(false);
  const hasSetInitialOpen = useRef(false);

  const [, setClosed] = useState(false);
  const currentSubMenuRef = useRef<ElementOf<typeof SubMenu> | null>(null);
  const [uncontrolledOpen, uncontrolledSetOpen] = useState(false);
  const popoverRef = useRef<HTMLUListElement | null>(null);

  const setOpen =
    (typeof controlledOpen === 'boolean' && controlledSetOpen) ||
    uncontrolledSetOpen;
  const open = controlledOpen ?? uncontrolledOpen;
  const handleClose = useCallback(() => {
    if (shouldClose()) {
      setOpen(false);
    }
  }, [setOpen, shouldClose]);

  // Used to trigger a state update when the current subMenu changes since the current subMenu is stored in a ref to avoid extra rerenders on initial load.
  const updateCurrentSubMenu = useForceRerender();

  const triggerRef = useRef<HTMLElement>(null);
  // This hook causes a second re-render on initial load. `useAvailableSpace` uses `useViewportSize` internally, which has internal state that causes re-renders.
  const availableSpace = useAvailableSpace(refEl || triggerRef, spacing);
  const memoizedAvailableSpace = useMemo(
    () => availableSpace,
    [availableSpace],
  );
  const maxMenuHeightValue = !isUndefined(memoizedAvailableSpace)
    ? `${Math.min(memoizedAvailableSpace, maxHeight)}px`
    : 'unset';

  const { updatedChildren, refs } = React.useMemo(() => {
    if (
      children == null ||
      ['boolean', 'number', 'string'].includes(typeof children)
    ) {
      return { updatedChildren: undefined, refs: [] };
    }

    const titleArr: Array<string> = [];
    const refs: Array<HTMLElement> = [];

    function updateChildren(children: React.ReactNode): React.ReactNode {
      return React.Children.map(children, child => {
        if (!React.isValidElement(child) || child.props?.disabled) {
          return child;
        }

        const { props } = child;

        let currentChildRef: HTMLElement | null = null;

        const setRef = (ref: HTMLElement) => {
          if (ref == null) {
            return;
          }

          refs.push(ref);
          currentChildRef = ref;

          if (open && hasSetInitialFocus.current === false) {
            setFocus(refs[0]);
            hasSetInitialFocus.current = true;
          }
        };

        const title = props?.title ?? false;

        const onFocus = ({ target }: React.FocusEvent<HTMLElement>) => {
          focusedRef.current = target;
        };

        if (
          isComponentType<ElementOf<typeof SubMenu>>(child, 'SubMenu') &&
          title
        ) {
          if (titleArr.includes(title)) {
            throw new Error('SubMenu titles must be unique');
          }

          titleArr.push(title);

          const shouldOpenActiveSubMenu =
            !currentSubMenuRef.current &&
            props.active &&
            !hasSetInitialOpen.current;

          // This opens the active submenu on inital load
          if (shouldOpenActiveSubMenu) {
            // Using a ref here prevents an extra rerender on initial load.
            currentSubMenuRef.current = child;
            hasSetInitialOpen.current = true;
          }

          const isCurrentSubMenu =
            (currentSubMenuRef.current?.props as SubMenuProps)?.title === title;

          return React.cloneElement(child, {
            ref: setRef,
            open: isCurrentSubMenu,
            setOpen: (state: boolean) => {
              if (currentChildRef) {
                focusedRef.current = currentChildRef;
              }

              currentSubMenuRef.current = state ? child : null;
              hasSetInitialOpen.current = true;
              // Force update since the updated currentSubMenu is set in a ref.
              updateCurrentSubMenu();
            },
            onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => {
              if (e.keyCode === keyMap.ArrowLeft && isCurrentSubMenu) {
                currentSubMenuRef.current = null;
                hasSetInitialOpen.current = true;
                updateCurrentSubMenu();
              }

              if (e.keyCode === keyMap.ArrowRight) {
                currentSubMenuRef.current = child;
                hasSetInitialOpen.current = true;
                updateCurrentSubMenu();
              }
            },
            onFocus,
            children: updateChildren(props.children),
            onExited: () => {
              setClosed(curr => !curr);
            },
          });
        }

        if (isComponentType(child, 'MenuItem')) {
          return React.cloneElement(child, {
            ref: setRef,
            onFocus,
            onClick: (e: React.MouseEvent) => {
              child.props?.onClick?.(e);
              handleClose();
            },
          });
        }

        if (isComponentType(child, 'FocusableMenuItem')) {
          return React.cloneElement(child, {
            ref: setRef,
            onFocus,
          });
        }

        if (isComponentType(child, 'MenuSeparator')) {
          return <MenuSeparator {...props} />;
        }

        if (props?.children) {
          const { children, ...rest } = props;
          return React.cloneElement(child, {
            children: updateChildren(props.children),
            ...rest,
          });
        }

        return child;
      });
    }

    return { updatedChildren: updateChildren(children), refs };
  }, [children, open, updateCurrentSubMenu, handleClose]);

  const focusedRef = useRef<HTMLElement | null>(refs[0] || null);

  const setFocus = (el: HTMLElement | null) => {
    if (el == null) {
      return;
    }

    focusedRef.current = el;
    el.focus();
  };

  useEffect(() => {
    if (open) {
      hasSetInitialFocus.current = false;
      hasSetInitialOpen.current = false;
    }
  }, [open]);

  useBackdropClick(handleClose, [popoverRef, triggerRef], open);

  function handleKeyDown(e: KeyboardEvent) {
    let refToFocus: HTMLElement;

    switch (e.keyCode) {
      case keyMap.ArrowDown:
        e.preventDefault(); // Prevents page scrolling
        refToFocus =
          refs[(refs.indexOf(focusedRef.current!) + 1) % refs.length];

        setFocus(refToFocus);
        break;

      case keyMap.ArrowUp:
        e.preventDefault(); // Prevents page scrolling
        refToFocus =
          refs[
            (refs.indexOf(focusedRef.current!) - 1 + refs.length) % refs.length
          ];
        setFocus(refToFocus);
        break;

      case keyMap.Tab:
        e.preventDefault(); // Prevent tabbing outside of portal and outside of the DOM when `usePortal={true}`
        handleClose();
        setFocus((refEl || triggerRef)?.current); // Focus the trigger on close
        break;

      case keyMap.Escape:
        handleClose();
        setFocus((refEl || triggerRef)?.current); // Focus the trigger on close
        break;

      case keyMap.Space:
      case keyMap.Enter:
        if (!open) {
          setFocus(refs[0]);
        }
        break;
    }
  }

  useEventListener('keydown', handleKeyDown, { enabled: open });

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

  const providerData = useMemo(() => {
    return { theme, darkMode };
  }, [theme, darkMode]);

  const popoverContent = (
    <MenuContext.Provider value={providerData}>
      <Popover
        key="popover"
        active={open}
        align={align}
        justify={justify}
        refEl={refEl}
        adjustOnMutation={adjustOnMutation}
        {...popoverProps}
      >
        <div
          className={cx(
            rootMenuStyle,
            rootMenuThemeStyles[theme],
            css`
              max-height: ${maxMenuHeightValue};
            `,
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
            ref={popoverRef}
          >
            {updatedChildren}
          </ul>
        </div>
      </Popover>
    </MenuContext.Provider>
  );

  if (trigger) {
    const triggerClickHandler = (event?: React.MouseEvent) => {
      setOpen((curr: boolean) => !curr);

      if (trigger && typeof trigger !== 'function') {
        trigger.props?.onClick?.(event);
      }

      // We stop the native event from bubbling, but allow the React.Synthetic event to bubble
      // This way click handlers on parent components will still fire,
      // but this click event won't propagate up to the document and immediately close the menu.
      event?.nativeEvent?.stopPropagation?.();
    };

    if (typeof trigger === 'function') {
      return trigger({
        onClick: triggerClickHandler,
        ref: triggerRef,
        children: popoverContent,
        ['aria-expanded']: open,
        ['aria-haspopup']: true,
      });
    }

    const renderedTrigger = React.cloneElement(trigger, {
      ref: triggerRef,
      onClick: triggerClickHandler,
      children: (
        <>
          {trigger.props.children}
          {popoverContent}
        </>
      ),
      ['aria-expanded']: open,
      ['aria-haspopup']: true,
    });

    return renderedTrigger;
  }

  return popoverContent;
});

Menu.displayName = 'Menu';

Menu.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  align: PropTypes.oneOf(Object.values(Align)),
  justify: PropTypes.oneOf(Object.values(Justify)),
  refEl: PropTypes.shape({
    current:
      typeof window !== 'undefined'
        ? PropTypes.instanceOf(Element)
        : PropTypes.any,
  }),
  usePortal: PropTypes.bool,
  trigger: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  darkMode: PropTypes.bool,
} as any;

export default Menu;
