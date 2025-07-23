export interface DropdownElements<T extends HTMLElement = HTMLLIElement> {
  /**
   * Returns an array of options
   */
  getOptions: () => Array<T>;

  /**
   * Returns an individual option
   */
  getOptionByValue: (value: string) => T | null;

  /**
   * Returns the dropdown popover
   */
  getPopover: () => HTMLDivElement | null;
}
