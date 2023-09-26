import { HTMLElementProps } from '@leafygreen-ui/lib';
import { PopoverProps } from '@leafygreen-ui/popover';

import { DropdownWidthBasis } from '../Select/Select.types';

export interface ListMenuProps
  extends HTMLElementProps<'ul', HTMLLIElement>,
    Omit<PopoverProps, 'active' | 'refEl' | 'onClick'> {
  children: React.ReactNode;
  id: string;
  referenceElement: React.MutableRefObject<HTMLElement | null>;
  className?: string;
  labelId?: string;
  dropdownWidthBasis: DropdownWidthBasis;
}
