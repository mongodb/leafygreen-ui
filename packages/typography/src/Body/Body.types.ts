import { HTMLElementProps } from '@leafygreen-ui/lib';

import { ResponsiveTypographyProps } from '../types';

export type BodyFontWeight = 'regular' | 'medium';
export type BodyProps = HTMLElementProps<'p'> &
  ResponsiveTypographyProps & { weight?: BodyFontWeight };
