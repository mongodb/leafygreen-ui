export interface DropdownElements {
  /**
   * Returns an array of options
   */
  getOptions: () => Array<HTMLLIElement>;

  /**
   * Returns an individual option
   */
  getOptionByValue: (value: string) => HTMLLIElement | null;

  /**
   * Returns the dropdown popover
   */
  getPopover: () => HTMLDivElement | null;
}
