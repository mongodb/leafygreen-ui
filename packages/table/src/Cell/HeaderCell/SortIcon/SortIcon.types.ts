import { AccessibleIconButtonProps } from 'packages/icon-button/src/types';

import { SortState } from '../HeaderCell.types';

export type SortIconProps = AccessibleIconButtonProps & {
  sortState: SortState;
  onSortIconClick: ((event: unknown) => void) | undefined;
};
