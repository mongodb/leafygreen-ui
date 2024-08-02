export interface HeaderUtils {
  /**
   * Returns the <th> element
   */
  getElement: () => HTMLTableCellElement;

  /**
   * Returns the sort button or `null`
   */
  getSortIcon: () => HTMLButtonElement | null;
}

export interface RowUtils {
  /**
   * Returns the <tr> element
   */
  getElement: () => HTMLTableRowElement;

  /**
   * Returns an array with all <td> elements
   */
  getAllCells: () => Array<HTMLTableCellElement>;

  /**
   * Returns the input element or `null`
   */
  getCheckbox: () => HTMLInputElement | null;

  /**
   * Returns the expand button or `null`
   */
  getExpandButton: () => HTMLButtonElement | null;

  /**
   * Returns if the <tr>(row) is expanded
   */
  isExpanded: () => boolean;

  /**
   * Returns if the <tr>(row) is selected
   */
  isSelected: () => boolean;

  /**
   * Returns if the <tr>(row) is disabled
   */
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
}
