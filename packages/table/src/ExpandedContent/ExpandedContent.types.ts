import { RowData } from '@tanstack/react-table';
import { VirtualItem } from '@tanstack/react-virtual';

import { LeafyGreenTableRow } from '../useLeafyGreenTable';
export interface ExpandedContentProps<T extends RowData> {
  row: LeafyGreenTableRow<T>;
  /**
   * Virtual row object passed from the `useLeafyGreenTable` hook
   */
  virtualRow?: VirtualItem;
}
