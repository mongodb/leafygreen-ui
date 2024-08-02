// export interface TableUtils<T extends HTMLElement = HTMLInputElement> {
export interface HeaderUtils {
  getElement: () => HTMLTableCellElement;
  getSortIcon: () => HTMLButtonElement | null;
}

export interface RowUtils {
  getElement: () => HTMLTableRowElement;
  getAllCells: () => Array<HTMLTableCellElement>;
  getCheckbox: () => HTMLInputElement | null;
  getExpandButton: () => HTMLButtonElement | null;
  isExpanded: () => boolean;
  isSelected: () => boolean;
  isDisabled: () => boolean;
}

export interface TestUtilsReturnType {
  /**
   * Returns the table node or `null` if the table node is not found.
   */
  getTable: () => HTMLTableElement;

  /**
   * Returns an array of <th> elements
   */
  getAllHeaders: () => Array<HTMLTableCellElement>;

  /**
   * Returns an individual <th> element.
   */
  getHeaderByIndex: (index: number) => HeaderUtils | null;

  /**
   * Returns the input node for the select all checkbox or `null` if the input node is not found.
   */
  getSelectAllCheckbox: () => HTMLInputElement | null;

  /**
   * Returns an array of all visible <tr>.
   */
  getAllVisibleRows: () => Array<HTMLTableRowElement>;

  /**
   * Returns an individual <tr>.
   */
  getRowByIndex: (index: number) => RowUtils | null;

  /**
   * Returns an array of all visible selected <tr>.
   */
  getAllVisibleSelectedRows: () => Array<HTMLTableRowElement>;

  /**
   * Returns the total number of <tr>. Does not include sub rows.
   */
  // getTotalRowCount: () => number;

  // getTotalSelectedRowCount: () => number;
}
