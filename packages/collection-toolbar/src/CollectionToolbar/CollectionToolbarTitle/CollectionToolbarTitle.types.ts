import { ComponentPropsWithRef } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export interface CollectionToolbarTitleProps
  extends ComponentPropsWithRef<'h3'>,
    DarkModeProps {
  children?: React.ReactNode;
  className?: string;
}
