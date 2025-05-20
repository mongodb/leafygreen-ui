import { LayoutData } from '../DrawerToolbarLayout';

export type ContextData = LayoutData | undefined;

export type DataId = LayoutData['id'];

export interface DrawerToolbarContextType {
  /**
   * This function stores all the drawer data in the context.
   * @param data - An array of drawer data
   * @returns void
   */
  // registerAllData: (data: Array<ContextData>) => void;

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
   * This function is used to get the active drawer content.
   * @returns The active drawer data
   */
  getActiveDrawerContent: () => ContextData;
}
