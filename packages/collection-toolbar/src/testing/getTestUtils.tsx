import { findByLgId, getByLgId, queryByLgId } from '@lg-tools/test-harnesses';

import { LgIdString } from '@leafygreen-ui/lib';

import { CollectionToolbarFiltersSubComponentProperty } from '../shared.types';
import { DEFAULT_LGID_ROOT, getLgIds } from '../utils';

import { TestUtilsReturnType } from './getTestUtils.types';

export const getTestUtils = <T extends HTMLElement = HTMLElement>(
  lgId: LgIdString = DEFAULT_LGID_ROOT,
): TestUtilsReturnType<T> => {
  const lgIds = getLgIds(lgId);

  const findCollectionToolbar = () => findByLgId!<T>(lgIds.root);
  const getCollectionToolbar = () => getByLgId!<T>(lgIds.root);
  const queryCollectionToolbar = () => queryByLgId!<T>(lgIds.root);

  const getTitle = () => getByLgId!<T>(lgIds.title);
  const findTitle = () => findByLgId!<T>(lgIds.title);
  const queryTitle = () => queryByLgId!<T>(lgIds.title);

  const getPagination = () => getByLgId!<T>(`${lgIds.pagination}-navigation`);
  const findPagination = () => findByLgId!<T>(`${lgIds.pagination}-navigation`);
  const queryPagination = () =>
    queryByLgId!<T>(`${lgIds.pagination}-navigation`);

  const getFilters = () => getByLgId!<T>(lgIds.filters);
  const findFilters = () => findByLgId!<T>(lgIds.filters);
  const queryFilters = () => queryByLgId!<T>(lgIds.filters);

  const getFilterByType = (
    type: CollectionToolbarFiltersSubComponentProperty,
  ) => getByLgId!<T>(`${lgIds.filters}-${type}`);
  const findFilterByType = (
    type: CollectionToolbarFiltersSubComponentProperty,
  ) => findByLgId!<T>(`${lgIds.filters}-${type}`);
  const queryFilterByType = (
    type: CollectionToolbarFiltersSubComponentProperty,
  ) => queryByLgId!<T>(`${lgIds.filters}-${type}`);

  return {
    findCollectionToolbar,
    getCollectionToolbar,
    queryCollectionToolbar,
    getTitle,
    findTitle,
    queryTitle,
    getPagination,
    findPagination,
    queryPagination,
    getFilters,
    findFilters,
    queryFilters,
    getFilterByType,
    findFilterByType,
    queryFilterByType,
  };
};
