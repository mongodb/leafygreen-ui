import { ResponsiveTypographyProps } from '../types';

const ArrowAppearance = {
  Hover: 'hover',
  Persist: 'persist',
  None: 'none',
} as const;

type ArrowAppearance = typeof ArrowAppearance[keyof typeof ArrowAppearance];

export { ArrowAppearance };

export interface LinkProps extends ResponsiveTypographyProps {
  arrowAppearance?: ArrowAppearance;
  hideExternalIcon?: boolean;
}
