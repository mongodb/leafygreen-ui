import { AccessibleIconButtonProps } from 'packages/icon-button/src/types';
import { WithRequiredProperty } from '../../Table/types';
import { HeaderCellProps, SortState } from '../types';

export type SortIconProps = AccessibleIconButtonProps & {
  sortState: SortState;
  onSortIconClick: ((event: unknown) => void) | undefined
}
