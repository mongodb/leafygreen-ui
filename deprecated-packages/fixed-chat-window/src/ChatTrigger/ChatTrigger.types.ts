import React from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export type ChatTriggerProps = DarkModeProps &
  React.ComponentProps<'button'> & {};
