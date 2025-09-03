import { ReactElement, ReactNode } from 'react';

// Selection context that gets passed to menu item handlers
export interface SelectionContext<T = any> {
  /** The currently selected content/data */
  selectedContent?: T;
  /** The DOM element that was right-clicked */
  targetElement?: HTMLElement;
  /** The mouse event that triggered the context menu */
  event?: React.MouseEvent;
  /** Any additional custom context data */
  customData?: Record<string, any>;
}

// Rich menu item configuration
export interface MenuItemConfig<T = any> {
  /** Display label for the menu item */
  label: string;
  /** Optional icon on the left */
  icon?: ReactElement;
  /** Optional icon on the right */
  rightIcon?: ReactElement;
  /** Optional description text below the label */
  description?: ReactNode;
  /** Whether the item is disabled */
  disabled?: boolean | ((context: SelectionContext<T>) => boolean);
  /** Whether the item is currently active/selected */
  active?: boolean | ((context: SelectionContext<T>) => boolean);
  /** Variant styling (default | destructive) */
  variant?: 'default' | 'destructive';
  /** Action handler with access to selection context */
  action?: (context: SelectionContext<T>) => void | Promise<void>;
  /** Keyboard shortcut text to display */
  shortcut?: string;
  /** Unique identifier for the menu item */
  id?: string;
  /** Whether this is a separator */
  isSeparator?: boolean;
  /** Submenu items */
  submenu?: Array<MenuItemConfig<T>>;
  /** Whether to show/hide this item based on context */
  visible?: boolean | ((context: SelectionContext<T>) => boolean);
}

export interface MenuState<T = any> {
  isVisible: boolean;
  position: { x: number; y: number };
  items: Array<MenuItemConfig<T>>;
  selectionContext: SelectionContext<T>;
}

// Provider context type
export interface ContextMenuContextType<T = any> {
  showMenu: (
    event: React.MouseEvent,
    items: Array<MenuItemConfig<T>>,
    selectionContext?: Partial<SelectionContext<T>>,
  ) => void;
  hideMenu: () => void;
  /** Register a global menu items provider */
  registerMenuProvider: (
    id: string,
    provider: (context: SelectionContext<T>) => Array<MenuItemConfig<T>>,
  ) => void;
  /** Unregister a global menu items provider */
  unregisterMenuProvider: (id: string) => void;
}

// Base props for components that handle context menus
export interface BaseContextMenuProps<T = any> {
  /** Menu items to show on right-click */
  menuItems?:
    | Array<MenuItemConfig<T>>
    | ((context: SelectionContext<T>) => Array<MenuItemConfig<T>>);
  /** Function to extract selected content from the wrapped element */
  getSelectionContext?: (
    event: React.MouseEvent,
    element: HTMLElement,
  ) => Partial<SelectionContext<T>>;
  /** Whether to prevent the default context menu */
  preventDefaultContextMenu?: boolean;
  /** Whether the context menu is disabled */
  disabled?: boolean;
}

// Enhanced provider props that can handle global context menus
export interface ContextMenuProviderProps<T = any>
  extends BaseContextMenuProps<T> {
  /** The content to provide context menu functionality to */
  children: ReactNode;
}

// Wrapper component props
export interface ContextMenuWrapperProps<T = any>
  extends BaseContextMenuProps<T> {
  /** The content to wrap */
  children: ReactNode;
  /** CSS class to apply to the wrapper */
  className?: string;
  /** Additional props to pass to the wrapper element */
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
}
