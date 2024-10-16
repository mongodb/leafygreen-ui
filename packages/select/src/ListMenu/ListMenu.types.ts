import { ComponentPropsWithoutRef } from 'react';

import { DropdownWidthBasis } from '../Select/Select.types';

export interface ListMenuProps extends ComponentPropsWithoutRef<'ul'> {
  children: React.ReactNode;
  id: string;
  referenceElement: React.MutableRefObject<HTMLElement | null>;
  className?: string;
  labelId?: string;
  dropdownWidthBasis: DropdownWidthBasis;
}
