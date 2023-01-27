import { HTMLElementProps } from '@leafygreen-ui/lib';

import { ResponsiveTypographyProps } from '../types';

export type BodyFontWeight = 'regular' | 'medium';
export type BodyProps<T extends keyof JSX.IntrinsicElements> =
  HTMLElementProps<T> &
    ResponsiveTypographyProps & {
      /**
       * font-weight applied to typography element
       * default: `regular`
       */
      weight?: BodyFontWeight;
      as?: T;
    };
