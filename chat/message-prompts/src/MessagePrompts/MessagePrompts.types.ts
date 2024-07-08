import { PropsWithChildren } from 'react';

import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export type MessagePromptsProps = HTMLElementProps<'div'> &
  DarkModeProps &
  PropsWithChildren<{
    label?: string;
  }>;
