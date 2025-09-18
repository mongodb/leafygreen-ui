import { ComponentPropsWithoutRef } from 'react';

import { DarkModeProps, LgIdProps } from '@leafygreen-ui/lib';
export interface ToolbarProps
  extends ComponentPropsWithoutRef<'div'>,
    DarkModeProps,
    LgIdProps {
  children: React.ReactNode;
}
