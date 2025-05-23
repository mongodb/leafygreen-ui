import { LayoutData } from '../DrawerToolbarLayout';

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
   * This function is used to close the drawer.
   * @returns void
   */
  closeDrawer: () => void;

  /**
   * This boolean is used to determine if the drawer should close. This prevents the drawer content from being removed immediately while the drawer is transitioning closed.
   */
  shouldCloseDrawer: boolean;

  /**
   * This function is used to get the active drawer content.
   * @returns The active drawer data
   */
  getActiveDrawerContent: () => ContextData;
}

export interface DrawerToolbarProviderProps {
  /**
   * The children of the provider
   */
  children: React.ReactNode;

  /**
   * The data to be used in the drawer
   */
  data: Array<ContextData>;
}
