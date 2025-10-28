import { ComponentPropsWithRef, PropsWithChildren } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export type ChatMainProps = ComponentPropsWithRef<'div'> &
  DarkModeProps &
  PropsWithChildren<{}>;
