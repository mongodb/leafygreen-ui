import { RowData } from '@tanstack/react-table';

import { LeafyGreenTableRow } from '../useLeafyGreenTable';

// type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export interface ExpandedContentProps<T extends RowData> {
  row: LeafyGreenTableRow<T>;
}
