import { FormUtils } from '@lg-tools/test-harnesses';

export interface GetTestUtilsReturnType<T extends HTMLElement = HTMLElement> {
  findRoot: () => Promise<T>;
  getRoot: () => T;
  queryRoot: () => T | null;

  findButton: () => Promise<HTMLButtonElement>;
  getButton: () => HTMLButtonElement;
  queryButton: () => HTMLButtonElement | null;

  findTrigger: () => Promise<HTMLButtonElement>;
  getTrigger: () => HTMLButtonElement;
  queryTrigger: () => HTMLButtonElement | null;

  findMenu: () => Promise<HTMLElement>;
  getMenu: () => HTMLElement;
  queryMenu: () => HTMLElement | null;

  findMenuItems: () => Promise<Array<HTMLElement>>;
  getMenuItems: () => Array<HTMLElement>;
  queryMenuItems: () => Array<HTMLElement>;

  isDisabled: FormUtils['isDisabled'];
  openMenu: (options?: { withKeyboard?: boolean }) => Promise<void>;
  closeMenu: (options?: { withKeyboard?: boolean }) => Promise<void>;
}
