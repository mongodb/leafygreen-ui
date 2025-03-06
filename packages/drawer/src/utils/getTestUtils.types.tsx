import { GetTestUtilsReturnType as ButtonTestUtilsReturnType } from '@leafygreen-ui/button';

export interface GetTestUtilsReturnType<T extends HTMLElement> {
  findDrawer: () => Promise<T>;
  getDrawer: () => T;
  queryDrawer: () => T | null;
  getCloseButtonUtils: () => ButtonTestUtilsReturnType<HTMLButtonElement>;
  isOpen: () => boolean;
}
