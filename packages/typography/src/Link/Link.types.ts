import { HTMLElementProps } from '@leafygreen-ui/lib';

import { ResponsiveTypographyProps } from '../types';

const ArrowAppearance = {
  Hover: 'hover',
  Persist: 'persist',
  None: 'none',
} as const;

type ArrowAppearance = typeof ArrowAppearance[keyof typeof ArrowAppearance];

export { ArrowAppearance };

export interface LinkProps
  extends ResponsiveTypographyProps,
    HTMLElementProps<'a'> {
  arrowAppearance?: ArrowAppearance;
  hideExternalIcon?: boolean;
}
