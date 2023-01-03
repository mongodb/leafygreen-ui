import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export interface TableBodyProps extends HTMLElementProps<'tbody'> {
  table?: any; // return value of useLeafygreenTable
  renderingExpandableRows?: boolean;
}
