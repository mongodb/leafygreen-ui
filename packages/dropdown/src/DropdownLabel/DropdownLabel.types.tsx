import { HTMLElementProps } from '@leafygreen-ui/lib';

export interface DropdownLabelProps
  extends HTMLElementProps<'div', HTMLDivElement> {
  className?: string;
  label: string;
  children: React.ReactNode;
}
