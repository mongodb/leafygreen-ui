import { HTMLElementProps } from '@leafygreen-ui/lib';

export interface DropdownLabelProps
  extends HTMLElementProps<'div', HTMLDivElement> {
  /**
   * Text shown above the group's options.
   */
  label: string;

  /**
   * Children associated with the label of the group
   */
  children: React.ReactNode;
}
