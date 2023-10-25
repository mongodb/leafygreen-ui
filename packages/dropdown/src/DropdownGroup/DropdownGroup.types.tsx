import { BaseItemProps } from '../types';

export interface DropdownGroupProps extends BaseItemProps {
  /*
   ** Title text for DropdownGroup
   */
  title?: string;

  /*
   ** Determines if the DropdownGroup both performs a function and opens a submenu
   */
  hasAction?: boolean;
}
