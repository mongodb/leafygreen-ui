import { getByLgId, queryBySelector } from '@lg-tools/test-harnesses';

import { DEFAULT_LGID_ROOT, getLgIds } from '../getLgIds';

import { TestUtilsReturnType } from './getTestUtils.types';

export const getTestUtils = (
  lgId: `lg-${string}` = DEFAULT_LGID_ROOT,
): TestUtilsReturnType => {
  const lgIds = getLgIds(lgId);

  /**
   * Queries the DOM for the element using the `data-lgid` data attribute.
   * Will throw if no element is found.
   */
  const element: HTMLTableElement = getByLgId!(lgIds.root);

  const getAllHeaders = (): Array<HTMLTableCellElement> => {
    const allHeaders = element.querySelectorAll<HTMLTableCellElement>(
      `[data-lgid=${lgIds.header}]`,
    );

    if (!allHeaders.length)
      throw new Error('Unable to find any <th> elements.');

    return Array.from(allHeaders);
  };

  const getHeaderByIndex = (index: number) => {
    const allHeader = getAllHeaders();
    const header = allHeader[index];
    if (!header) return null;

    const getSortIcon = () =>
      queryBySelector<HTMLButtonElement>(
        header,
        `[data-lgid=${lgIds.sortIcon}]`,
      );

    return {
      getElement: () => header,
      getSortIcon: () => getSortIcon(),
    };
  };

  const getSelectAllCheckbox = () => {
    const checkbox = queryBySelector<HTMLInputElement>(
      element,
      `[data-lgid=${lgIds.selectAllCheckbox}] input`,
    );

    return checkbox;
  };

  const getAllVisibleRows = () => {
    const allRows = element.querySelectorAll<HTMLTableRowElement>(
      `[data-lgid=${lgIds.row}]`,
    );

    if (!allRows.length)
      throw new Error('Unable to find any visible `tr` elements.');

    return Array.from(allRows);
  };

  const getRowByIndex = (index: number) => {
    const allRows = getAllVisibleRows();
    const row = allRows[index];
    if (!row) return null;

    const getAllCells = () => {
      const allCells = row.querySelectorAll<HTMLTableCellElement>(
        `[data-lgid=${lgIds.cell}]`,
      );

      if (!allCells.length)
        throw new Error('Unable to find any visible `td` elements.');

      return Array.from(allCells);
    };

    const getCheckbox = () =>
      queryBySelector<HTMLInputElement>(
        row,
        `[data-lgid=${lgIds.checkbox}] input`,
      );

    const getExpandButton = () =>
      queryBySelector<HTMLButtonElement>(
        row,
        `[data-lgid=${lgIds.expandButton}]`,
      );

    const isExpanded = () => row.matches(`[data-expanded="true"]`);
    const isSelected = () => row.matches(`[data-selected="true"]`);
    const isDisabled = () => row.matches(`[aria-disabled="true"]`);

    return {
      getElement: () => row,
      getAllCells: () => getAllCells(),
      getCheckbox: () => getCheckbox(),
      getExpandButton: () => getExpandButton(),
      isExpanded: () => isExpanded(),
      isSelected: () => isSelected(),
      isDisabled: () => isDisabled(),
    };
  };

  const getAllVisibleSelectedRows = () => {
    const allRows = element.querySelectorAll<HTMLTableRowElement>(
      `[data-lgid=${lgIds.row}][data-selected="true"]`,
    );

    return Array.from(allRows);
  };

  return {
    getTable: () => element,
    getAllHeaders: () => getAllHeaders(),
    getHeaderByIndex: (index: number) => getHeaderByIndex(index),
    getSelectAllCheckbox: () => getSelectAllCheckbox(),
    getAllVisibleRows: () => getAllVisibleRows(),
    getRowByIndex: (index: number) => getRowByIndex(index),
    getAllVisibleSelectedRows: () => getAllVisibleSelectedRows(),
  };
};
