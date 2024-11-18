import { PropsWithChildren } from 'react';

import { HTMLElementProps } from '@leafygreen-ui/lib';

import { BaseHeaderProps } from '../BaseHeader';

export interface ChartCardProps
  extends HTMLElementProps<'div'>,
    PropsWithChildren,
    Omit<BaseHeaderProps, 'labelProps' | 'collapsedButtonProps'> {
  label: string;
  defaultOpen?: boolean;
}
