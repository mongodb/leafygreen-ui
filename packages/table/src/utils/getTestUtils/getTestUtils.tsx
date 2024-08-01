import { getByLgId, queryBySelector } from '@lg-tools/test-harnesses';

import { LGIDS } from '../../constants';
import { LeafyGreenTable, LGRowData } from '../../useLeafyGreenTable';

import { TestUtilsReturnType } from './getTestUtils.types';

export const getTestUtils = <T extends LGRowData>(
  lgId: string = LGIDS.root,
  table?: LeafyGreenTable<T>,
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
      `[data-lgid=${LGIDS.selectAllCheckbox}] input`,
    );

    return checkbox;
  };

  const getAllVisibleRows = () => {
    const allRows = element.querySelectorAll<HTMLTableRowElement>(
      `[data-lgid=${LGIDS.row}][aria-hidden="false"]`,
    );

    return Array.from(allRows);
  };

  const getRowByIndex = (index: number) => {
    const allRows = getAllVisibleRows();
    const row = allRows[index];
    if (!row) return null;

    const allCells = Array.from(
      row.querySelectorAll<HTMLTableCellElement>(`[data-lgid=${LGIDS.cell}]`),
    );

    const checkbox = queryBySelector<HTMLInputElement>(
      row,
      `[data-lgid=${LGIDS.checkbox}] input`,
    );

    const getExpandButton = queryBySelector<HTMLButtonElement>(
      row,
      `[data-lgid=${LGIDS.expandButton}]`,
    );

    const isExpanded = row.matches(`[data-expanded="true"]`);
    const isSelected = row.matches(`[data-selected="true"]`);

    return {
      getElement: () => row,
      getAllCells: () => allCells,
      getCheckbox: () => checkbox,
      getExpandButton: () => getExpandButton,
      isExpanded: () => isExpanded,
      isSelected: () => isSelected,
    };
  };

  const getAllVisibleSelectedRows = () => {
    const allRows = element.querySelectorAll<HTMLTableRowElement>(
      `[data-lgid=${LGIDS.row}][aria-hidden="false"][data-selected="true"]`,
    );

    return Array.from(allRows);
  };

  // const getTotalRowCount = () => {
  //   return table.getRowModel().rows.length;
  // };

  // const getTotalSelectedRowCount = () => {
  //   return table.getSelectedRowModel().flatRows.length;
  // };

  return {
    getTable: () => element,
    getAllHeaders: () => getAllHeaders(),
    getHeaderByIndex: (index: number) => getHeaderByIndex(index),
    getSelectAllCheckbox: () => getSelectAllCheckbox(),
    getAllVisibleRows: () => getAllVisibleRows(),
    getRowByIndex: (index: number) => getRowByIndex(index),
    getAllVisibleSelectedRows: () => getAllVisibleSelectedRows(),
    // getTotalRowCount: () => getTotalRowCount(),
    // getTotalSelectedRowCount: () => getTotalSelectedRowCount(),
  };
};
