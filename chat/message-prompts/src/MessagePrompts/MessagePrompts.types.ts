import React, { PropsWithChildren } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export type MessagePromptsProps = React.ComponentProps<'div'> &
  DarkModeProps &
  PropsWithChildren<{
    label?: string;
  }>;
