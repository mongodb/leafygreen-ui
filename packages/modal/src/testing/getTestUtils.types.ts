export interface GetTestUtilsReturnType<T extends HTMLElement> {
  findModal: () => Promise<T>;
  getModal: () => T;
  queryModal: () => T | null;
}
