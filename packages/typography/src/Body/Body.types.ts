import { HTMLElementProps } from '@leafygreen-ui/lib';

import { ResponsiveTypographyProps } from '../types';

export type BodyFontWeight = 'regular' | 'medium' | 400 | 500;
export type BodyProps = HTMLElementProps<'p'> &
  ResponsiveTypographyProps & { weight?: BodyFontWeight };
