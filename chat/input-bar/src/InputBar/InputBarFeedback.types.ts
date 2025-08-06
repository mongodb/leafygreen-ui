import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

import { SharedInputBarProps } from './shared.types';

export interface InputBarFeedbackProps
  extends DarkModeProps,
    HTMLElementProps<'div'>,
    SharedInputBarProps {}
