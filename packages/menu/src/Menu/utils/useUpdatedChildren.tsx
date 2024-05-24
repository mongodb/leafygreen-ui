import React, { useState } from 'react';

import { useForceRerender } from '@leafygreen-ui/hooks';
import { isComponentType, keyMap } from '@leafygreen-ui/lib';

import MenuSeparator from '../../MenuSeparator/MenuSeparator';
import { type SubMenuProps } from '../../SubMenu';
import { MenuProps, type SubMenuType } from '../Menu.types';

interface UpdatedChildrenArgs extends Pick<MenuProps, 'children' | 'open'> {
  hasSetInitialFocus: React.MutableRefObject<boolean>;
  hasSetInitialOpen: React.MutableRefObject<boolean>;
  focusedRef: React.MutableRefObject<HTMLElement | null>;
  currentSubMenuRef: React.MutableRefObject<SubMenuType | null>;
  setFocus: (el: HTMLElement | null) => void;
}

/** @deprecated */
export const useUpdatedChildren = ({
  children,
  open,
  focusedRef,
  hasSetInitialFocus,
  hasSetInitialOpen,
  currentSubMenuRef,
  setFocus,
}: UpdatedChildrenArgs) => {
  // Used to trigger a state update when the current subMenu changes since the current subMenu is stored in a ref to avoid extra rerenders on initial load.
  const updateCurrentSubMenu = useForceRerender();

  const [, setClosed] = useState(false);

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

        if (isComponentType<SubMenuType>(child, 'SubMenu') && title) {
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
              if (e.key === keyMap.ArrowLeft && isCurrentSubMenu) {
                currentSubMenuRef.current = null;
                hasSetInitialOpen.current = true;
                updateCurrentSubMenu();
              }

              if (e.key === keyMap.ArrowRight) {
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
  }, [
    children,
    currentSubMenuRef,
    focusedRef,
    hasSetInitialFocus,
    hasSetInitialOpen,
    open,
    setFocus,
    updateCurrentSubMenu,
  ]);

  return {
    updatedChildren,
    refs,
  };
};
