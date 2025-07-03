import { GetTestUtilsReturnType as GetButtonTestUtilsReturnType } from '@leafygreen-ui/button/testing';
import { TestUtilsReturnType as ToolbarTestUtilsReturnType } from '@leafygreen-ui/toolbar/testing';

export interface GetTestUtilsReturnType<T extends HTMLElement> {
  findDrawer: () => Promise<T>;
  getDrawer: () => T;
  queryDrawer: () => T | null;
  getCloseButtonUtils: () => GetButtonTestUtilsReturnType<HTMLButtonElement>;
  isOpen: () => boolean;
  getToolbarTestUtils: () => ToolbarTestUtilsReturnType;
}
