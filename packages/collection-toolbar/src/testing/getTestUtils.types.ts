export interface TestUtilsReturnType<T extends HTMLElement = HTMLElement> {
  findCollectionToolbar: () => Promise<T>;
  getCollectionToolbar: () => T;
  queryCollectionToolbar: () => T | null;

  getTitle: () => T;
  findTitle: () => Promise<T>;
  queryTitle: () => T | null;
}
