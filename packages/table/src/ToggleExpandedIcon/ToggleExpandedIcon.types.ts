import { BaseIconButtonProps } from '@leafygreen-ui/icon-button';
import { Theme } from '@leafygreen-ui/lib';

import { RowProps } from '../Row/Row.types';
import { LGRowData } from '../useLeafyGreenTable';

/**
 * @internal
 */
export type ToggleExpandedIconProps = Pick<RowProps<LGRowData>, 'disabled'> &
  BaseIconButtonProps & {
    isExpanded: boolean;
    toggleExpanded: () => void;
    theme: Theme;
  };
