import { LayoutData } from '../DrawerToolbarLayout/DrawerToolbarLayout.types';

export type ContextData = LayoutData | undefined;

export type DataId = LayoutData['id'];

export interface DrawerToolbarContextType {
  /**
   * This function is used to open the drawer with the given data.
   * @param id - The id of the drawer to open
   * @returns void
   */
  openDrawer: (id: DataId) => void;

  /**
   * This function is used to clear the active drawer data and indicates that the drawer should close.
   * @returns void
   */
  closeDrawer: () => void;

  /**
   * This function is used to handle toolbar button clicks with toggle behavior.
   * If the drawer is already open with the same content, it closes the drawer.
   * Otherwise, it opens the drawer with the new content.
   * @param id - The id of the drawer to toggle
   * @returns void
   */
  toggleDrawer: (id: DataId) => void;

  /**
   * Indicates whether the drawer should be closed. Used to manage transition states.
   * For example, during close animations, content should remain until the transition completes.
   */
  isDrawerOpen: boolean;

  /**
   * This function is used to get the active drawer content.
   * @returns The active drawer data
   */
  getActiveDrawerContent: () => ContextData;

  /**
   * Indicates whether the toolbar should be rendered. This is determined by the `visible` prop on the toolbar items. If all toolbar items have `visible` set to `false`, the toolbar will not be rendered.
   */
  shouldRenderToolbar: boolean;

  /**
   * An array of the visible toolbar items. This is determined by the `visible` prop on the toolbar items.
   */
  visibleToolbarItems: Array<LayoutData>;

  /**
   * An array of the toolbar items.
   */
  toolbarData: Array<LayoutData>;

  /**
   * Indicates whether the drawer was toggled closed with the toolbar. Used to manage focus management.
   */
  wasToggledClosedWithToolbar: boolean;
}

export interface DrawerToolbarProviderProps {
  /**
   * The children of the provider
   */
  children: React.ReactNode;

  /**
   * The data to be used in the drawer
   */
  data: Array<LayoutData>;
}
