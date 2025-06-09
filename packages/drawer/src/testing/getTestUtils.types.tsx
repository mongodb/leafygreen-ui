import { GetTestUtilsReturnType as ButtonTestUtilsReturnType } from '@leafygreen-ui/button';
import { TestUtilsReturnType as ToolbarTestUtilsReturnType } from '@leafygreen-ui/toolbar/testing';

export interface GetTestUtilsReturnType<T extends HTMLElement> {
  findDrawer: () => Promise<T>;
  getDrawer: () => T;
  queryDrawer: () => T | null;
  getCloseButtonUtils: () => ButtonTestUtilsReturnType<HTMLButtonElement>;
  isOpen: () => boolean;
  getToolbarTestUtils: () => ToolbarTestUtilsReturnType;
}
