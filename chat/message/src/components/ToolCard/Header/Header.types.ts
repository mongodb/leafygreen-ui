import { ComponentPropsWithRef } from 'react';

import { SharedToolCardProps } from '../shared.types';

export interface HeaderProps
  extends SharedToolCardProps,
    Omit<ComponentPropsWithRef<'div'>, 'title'> {}
