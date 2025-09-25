import React from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

import { SharedInputBarProps } from '../shared.types';

export interface InputBarFeedbackProps
  extends DarkModeProps,
    React.ComponentProps<'div'>,
    SharedInputBarProps {}
