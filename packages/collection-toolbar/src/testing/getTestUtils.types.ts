import { CollectionToolbarFiltersSubComponentProperty } from '../shared.types';

export interface TestUtilsReturnType<T extends HTMLElement = HTMLElement> {
  findCollectionToolbar: () => Promise<T>;
  getCollectionToolbar: () => T;
  queryCollectionToolbar: () => T | null;

  getTitle: () => T;
  findTitle: () => Promise<T>;
  queryTitle: () => T | null;

  getPagination: () => T;
  findPagination: () => Promise<T>;
  queryPagination: () => T | null;

  getFilters: () => T;
  findFilters: () => Promise<T>;
  queryFilters: () => T | null;

  getFilterByType: (type: CollectionToolbarFiltersSubComponentProperty) => T;
  findFilterByType: (
    type: CollectionToolbarFiltersSubComponentProperty,
  ) => Promise<T>;
  queryFilterByType: (
    type: CollectionToolbarFiltersSubComponentProperty,
  ) => T | null;
}
