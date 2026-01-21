import { ComponentPropsWithRef } from 'react';

import { SharedActionCardProps } from '../shared.types';

export interface HeaderProps
  extends SharedActionCardProps,
    Omit<ComponentPropsWithRef<'div'>, 'title'> {}
