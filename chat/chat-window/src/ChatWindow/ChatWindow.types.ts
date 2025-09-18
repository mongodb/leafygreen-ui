import React from 'react';
import { TitleBarProps } from '@lg-chat/title-bar';

import { DarkModeProps } from '@leafygreen-ui/lib';

export interface ChatWindowProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'>,
    DarkModeProps,
    Partial<TitleBarProps> {}
