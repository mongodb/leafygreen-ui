'use client';

import React, {
  createContext,
  CSSProperties,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Menu, MenuItem, MenuSeparator } from '@leafygreen-ui/menu';

import {
  ContextMenuContextType,
  ContextMenuProviderProps,
  ContextMenuWrapperProps,
  MenuItemConfig,
  MenuState,
  SelectionContext,
} from './ContextMenuProvider.types';

const ContextMenuContext = createContext<ContextMenuContextType | undefined>(
  undefined,
);

// Reusable function to handle context menu logic
const useContextMenuHandler = (
  showMenu: ContextMenuContextType['showMenu'],
  menuItems?: ContextMenuProviderProps['menuItems'],
  getSelectionContext?: ContextMenuProviderProps['getSelectionContext'],
  preventDefaultContextMenu = true,
  disabled = false,
) => {
  return useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (disabled || !menuItems) return;

      if (preventDefaultContextMenu) {
        event.preventDefault();
      }

      // Get selection context from the provided function or create default with window selection
      let selectionContext: Partial<SelectionContext> = {};

      if (getSelectionContext) {
        selectionContext = getSelectionContext(event, event.currentTarget);
      } else {
        // Default behavior: extract selected text from window selection
        const selection = window.getSelection();
        const selectedText = selection?.toString() || '';
        selectionContext = {
          selectedContent: selectedText,
        };
      }

      // Resolve menu items (can be array or function)
      const resolvedItems =
        typeof menuItems === 'function'
          ? menuItems({
              event,
              targetElement: event.currentTarget,
              ...selectionContext,
            })
          : menuItems;

      if (resolvedItems.length > 0) {
        showMenu(event, resolvedItems, selectionContext);
      }
    },
    [
      disabled,
      preventDefaultContextMenu,
      getSelectionContext,
      menuItems,
      showMenu,
    ],
  );
};

// Enhanced component that renders the Leafygreen menu with rich features
const LeafyGreenContextMenu: FC<{
  state: MenuState;
  hideMenu: () => void;
}> = ({ state, hideMenu }) => {
  // Filter visible items based on context
  const visibleItems = useMemo(() => {
    return state.items.filter(item => {
      if (typeof item.visible === 'function') {
        return item.visible(state.selectionContext);
      }

      return item.visible !== false;
    });
  }, [state.items, state.selectionContext]);

  // Helper to resolve boolean or function values
  const resolveValue = <T extends boolean>(
    value: T | ((context: SelectionContext) => T) | undefined,
    defaultValue: T,
  ): T => {
    if (typeof value === 'function') {
      return value(state.selectionContext);
    }

    return value ?? defaultValue;
  };

  if (!state.isVisible) return null;

  // This style object is for positioning the menu container
  const menuContainerStyle: CSSProperties = {
    position: 'absolute',
    zIndex: 50,
    top: state.position.y,
    left: state.position.x,
  };

  return (
    <div style={menuContainerStyle}>
      <Menu
        open={state.isVisible}
        setOpen={() => hideMenu()}
        renderDarkMenu={false}
      >
        {visibleItems.map((item, index) => {
          if (item.isSeparator) {
            return <MenuSeparator key={item.id || index} />;
          }

          const isDisabled = resolveValue(item.disabled, false);
          const isActive = resolveValue(item.active, false);

          return (
            <MenuItem
              key={item.id || index}
              disabled={isDisabled}
              active={isActive}
              variant={item.variant}
              glyph={item.icon}
              rightGlyph={item.rightIcon}
              description={item.description}
              onClick={() => {
                if (item.action && !isDisabled) {
                  item.action(state.selectionContext);
                }
                hideMenu();
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <span>{item.label}</span>
                {item.shortcut && (
                  <span
                    style={{
                      fontSize: '0.8em',
                      opacity: 0.7,
                      marginLeft: '16px',
                    }}
                  >
                    {item.shortcut}
                  </span>
                )}
              </div>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export const ContextMenuProvider: FC<ContextMenuProviderProps> = ({
  children,
  menuItems,
  getSelectionContext,
  preventDefaultContextMenu = true,
  disabled = false,
}) => {
  const [menuState, setMenuState] = useState<MenuState>({
    isVisible: false,
    position: { x: 0, y: 0 },
    items: [],
    selectionContext: {},
  });

  // Global menu providers registry
  const menuProvidersRef = useRef<
    Map<string, (context: SelectionContext) => Array<MenuItemConfig>>
  >(new Map());

  const showMenu = useCallback(
    (
      event: React.MouseEvent,
      items: Array<MenuItemConfig>,
      selectionContext: Partial<SelectionContext> = {},
    ) => {
      event.preventDefault();

      // Build complete selection context with default window selection if not provided
      const defaultSelection = window.getSelection()?.toString() || '';
      const fullContext: SelectionContext = {
        event,
        targetElement: event.currentTarget as HTMLElement,
        selectedContent: defaultSelection,
        ...selectionContext,
      };

      // Merge with global menu items from registered providers
      const globalItems: Array<MenuItemConfig> = [];
      menuProvidersRef.current.forEach(provider => {
        try {
          const providerItems = provider(fullContext);
          globalItems.push(...providerItems);
        } catch (error) {
          console.warn('Context menu provider failed:', error);
        }
      });

      // Combine provided items with global items
      const allItems = [...items, ...globalItems];

      setMenuState({
        isVisible: true,
        position: { x: event.pageX, y: event.pageY },
        items: allItems,
        selectionContext: fullContext,
      });
    },
    [],
  );

  const hideMenu = useCallback(() => {
    if (menuState.isVisible) {
      setMenuState(s => ({ ...s, isVisible: false }));
    }
  }, [menuState.isVisible]);

  const registerMenuProvider = useCallback(
    (
      id: string,
      provider: (context: SelectionContext) => Array<MenuItemConfig>,
    ) => {
      menuProvidersRef.current.set(id, provider);
    },
    [],
  );

  const unregisterMenuProvider = useCallback((id: string) => {
    menuProvidersRef.current.delete(id);
  }, []);

  // Global click and escape listeners
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't close if clicking inside the menu
      const target = e.target as Element;
      if (target.closest('[data-lgid^="menu"]')) return;
      hideMenu();
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        hideMenu();
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [hideMenu]);

  // Use the reusable context menu handler for global menus
  const handleContextMenu = useContextMenuHandler(
    showMenu,
    menuItems,
    getSelectionContext,
    preventDefaultContextMenu,
    disabled,
  );

  const contextValue = useMemo(
    () => ({
      showMenu,
      hideMenu,
      registerMenuProvider,
      unregisterMenuProvider,
    }),
    [showMenu, hideMenu, registerMenuProvider, unregisterMenuProvider],
  );

  // Render with or without global context menu handling
  if (menuItems && !disabled) {
    return (
      <ContextMenuContext.Provider value={contextValue}>
        <div onContextMenu={handleContextMenu} style={{ display: 'contents' }}>
          {children}
        </div>
        <LeafyGreenContextMenu state={menuState} hideMenu={hideMenu} />
      </ContextMenuContext.Provider>
    );
  }

  return (
    <ContextMenuContext.Provider value={contextValue}>
      {children}
      <LeafyGreenContextMenu state={menuState} hideMenu={hideMenu} />
    </ContextMenuContext.Provider>
  );
};

export const useContextMenu = (): ContextMenuContextType => {
  const context = useContext(ContextMenuContext);

  if (!context) {
    throw new Error('useContextMenu must be used within a ContextMenuProvider');
  }

  return context;
};

// Wrapper component that automatically handles context menus
export const ContextMenuWrapper: FC<ContextMenuWrapperProps> = ({
  children,
  menuItems = [],
  getSelectionContext,
  preventDefaultContextMenu = true,
  className,
  wrapperProps,
  disabled = false,
}) => {
  const { showMenu } = useContextMenu();

  // Use the reusable context menu handler
  const handleContextMenu = useContextMenuHandler(
    showMenu,
    menuItems,
    getSelectionContext,
    preventDefaultContextMenu,
    disabled,
  );

  return (
    <div
      {...wrapperProps}
      className={className}
      onContextMenu={handleContextMenu}
      style={{
        ...wrapperProps?.style,
        // Ensure the wrapper can receive context menu events
        position: wrapperProps?.style?.position || 'relative',
      }}
    >
      {children}
    </div>
  );
};
