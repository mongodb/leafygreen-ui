import { DarkModeProps } from '@leafygreen-ui/lib';
import { PopoverProps } from '@leafygreen-ui/popover';

import { InlineMessageFeedbackProps } from '../InlineMessageFeedback';

export type PopoverMessageFeedbackProps = DarkModeProps &
  Omit<InlineMessageFeedbackProps, 'isSubmitted' | 'submittedMessage'> &
  Omit<PopoverProps, 'children'> & {
    /**
     * Number that controls the z-index of the popover
     */
    popoverZIndex?: number;
  };
