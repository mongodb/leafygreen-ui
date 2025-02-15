import { GetTestUtilsReturnType as ButtonTestUtilsReturnType } from '@leafygreen-ui/button';

export interface GetTestUtilsReturnType<T extends HTMLElement> {
  getCloseButtonUtils: () => ButtonTestUtilsReturnType<HTMLButtonElement>;
  getDrawer: () => T;
  isOpen: () => boolean;
}
