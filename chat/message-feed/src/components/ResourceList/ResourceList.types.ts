import { ComponentPropsWithRef } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export interface ResourceListProps
  extends ComponentPropsWithRef<'ul'>,
    DarkModeProps {}
