import { RowData } from '@tanstack/react-table';

import { LeafyGreenTableRow } from '../useLeafyGreenTable';
export interface ExpandedContentProps<T extends RowData> {
  row: LeafyGreenTableRow<T>;
}
