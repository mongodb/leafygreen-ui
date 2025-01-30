export interface GetTestUtilsReturnType<T extends HTMLElement> {
  getDrawer: () => T;
  isOpen: () => boolean;
}
