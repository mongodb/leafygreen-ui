import { RowData } from '@tanstack/react-table';

import { LeafyGreenTableRow } from '../useLeafygreenTable';

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export interface ExpandedContentProps<T extends RowData> {
  row: LeafyGreenTableRow<T>;
}
