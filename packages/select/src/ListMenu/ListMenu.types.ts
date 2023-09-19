import { PopoverProps } from '@leafygreen-ui/popover';

import { DropdownWidthBasis } from '../Select/Select.types';

export type ListMenuProps = {
  children: React.ReactNode;
  id: string;
  referenceElement: React.MutableRefObject<HTMLElement | null>;
  className?: string;
  labelId?: string;
  dropdownWidthBasis: DropdownWidthBasis;
} & Omit<PopoverProps, 'active' | 'refEl'>;
