import { HTMLElementProps } from '@leafygreen-ui/lib';

export interface DropdownLabelProps
  extends HTMLElementProps<'div', HTMLDivElement> {
  /**
   * Title for the group of options
   */
  label: string;

  /**
   * Children associated with the label group
   */
  children: React.ReactNode;
}
