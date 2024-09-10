/**
 * Combobox Group Props
 */

export interface ComboboxGroupProps {
  /**
   * Label for the group of options
   */
  label: string;

  /**
   * Options in the group. Must be one or more `ComboboxOption` components
   */
  children: React.ReactNode;

  /**
   * Styling prop
   */
  className?: string;
}
