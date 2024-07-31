import { getByLgId, queryBySelector } from '@lg-tools/test-harnesses';

import { LGIDS } from '../../constants';

import { TestUtilsReturnType } from './getTestUtils.types';

export const getTestUtils = (
  lgId: string = LGIDS.root,
): TestUtilsReturnType => {
  /**
   * Queries the DOM for the element using the `data-lgid` data attribute.
   * Will throw if no element is found.
   */
  const element: HTMLTableElement = getByLgId!(lgId);

  const getAllHeaders = (): Array<HTMLTableCellElement> => {
    const allHeaders = element.querySelectorAll<HTMLTableCellElement>(
      `[data-lgid=${LGIDS.header}]`,
    );

    if (!allHeaders.length)
      throw new Error('Unable to find any <th> elements.');

    return Array.from(allHeaders);
  };

  const getHeaderByIndex = (index: number) => {
    const allHeader = getAllHeaders();
    const header = allHeader[index];
    if (!header) return null;

    const sortIcon = () =>
      queryBySelector<HTMLButtonElement>(
        header,
        `[data-lgid=${LGIDS.sortIcon}]`,
      );

    return {
      getElement: () => header,
      getSortIcon: () => sortIcon(),
    };
  };

  const getSelectAllCheckbox = () => {
    const checkbox = queryBySelector<HTMLInputElement>(
      element,
      `[data-lgid=${LGIDS.selectAllCheckbox} input]`,
    );

    return checkbox;
  };

  const getAllVisibleRows = () => {
    const allRows = element.querySelectorAll<HTMLTableRowElement>(
      `[data-lgid=${LGIDS.row}][aria-hidden="false"]`,
    );

    if (!allRows.length) throw new Error('Unable to find any <tr> elements.');

    return Array.from(allRows);
  };

  return {
    getTable: () => element,
    getAllHeaders: () => getAllHeaders(),
    getHeaderByIndex: (index: number) => getHeaderByIndex(index),
    getSelectAllCheckbox: () => getSelectAllCheckbox(),
    getAllVisibleRows: () => getAllVisibleRows(),
  };
};
