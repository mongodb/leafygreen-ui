import { BaseIconButtonProps } from '@leafygreen-ui/icon-button';

import { RowProps } from '../Row/Row.types';
import { LGRowData } from '../useLeafyGreenTable';

export type ToggleExpandedIconProps = Pick<RowProps<LGRowData>, 'disabled'> &
  BaseIconButtonProps & {
    isExpanded: boolean;
    toggleExpanded: () => void;
  };
