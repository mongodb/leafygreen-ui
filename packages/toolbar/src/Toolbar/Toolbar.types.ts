import { ComponentPropsWithRef } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export interface ToolbarProps
  extends ComponentPropsWithRef<'ul'>,
    DarkModeProps {}
