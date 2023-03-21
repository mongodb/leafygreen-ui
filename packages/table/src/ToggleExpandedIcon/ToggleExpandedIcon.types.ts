import { BaseIconButtonProps } from '@leafygreen-ui/icon-button';

import { RowProps } from '../Row/Row.types';

export type ToggleExpandedIconProps = Pick<RowProps<unknown>, 'disabled'> &
  BaseIconButtonProps & {
    isExpanded: boolean;
    toggleExpanded: () => void;
  };
