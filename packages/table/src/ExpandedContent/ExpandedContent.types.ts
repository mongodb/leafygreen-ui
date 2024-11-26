import { ComponentPropsWithRef } from 'react';
import { RowData } from '@tanstack/react-table';
import { VirtualItem } from '@tanstack/react-virtual';

import { LeafyGreenTableRow } from '../useLeafyGreenTable';
export interface ExpandedContentProps<T extends RowData>
  extends ComponentPropsWithRef<'tr'> {
  row: LeafyGreenTableRow<T>;
  /**
   * Virtual row object passed from the `useLeafyGreenVirtualTable` hook
   */
  virtualRow?: VirtualItem;
}
