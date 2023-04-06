import { BaseIconButtonProps } from '@leafygreen-ui/icon-button';

import { RowProps } from '../Row/Row.types';
import { LGRowData } from '../useLeafyGreenTable';

/**
 * @privateRemarks
 * This interface will not show up in the documentation site's code docs.
 */
export type ToggleExpandedIconProps = Pick<RowProps<LGRowData>, 'disabled'> &
  BaseIconButtonProps & {
    isExpanded: boolean;
    toggleExpanded: () => void;
  };
