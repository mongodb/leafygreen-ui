import { AccessibleIconButtonProps } from 'packages/icon-button/src/types';
import { WithRequiredProperty } from '../../Table/types';
import { HeaderCellProps } from '../types';

export type SortIconProps = Pick<
  WithRequiredProperty<HeaderCellProps, 'sortState' | 'onSortIconClick'>,
  'sortState' | 'onSortIconClick'
> & AccessibleIconButtonProps;
