import { AccessibleIconButtonProps } from '@leafygreen-ui/icon-button/';

import { SortState } from '../HeaderCell.types';

export type SortIconProps = AccessibleIconButtonProps & {
  sortState: SortState;
  onSortIconClick: ((event: unknown) => void) | undefined;
};
