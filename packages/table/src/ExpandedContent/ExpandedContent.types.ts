import { RowData } from '@tanstack/react-table';

import { LeafygreenTableRow } from '../useLeafygreenTable';

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export interface ExpandedContentProps<T extends RowData> {
  row: LeafygreenTableRow<T>;
}
