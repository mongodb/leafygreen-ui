import { HTMLElementProps } from '@leafygreen-ui/lib';

import { CommonTypographyProps } from '../types';

export type BodyFontWeight = 'regular' | 'medium';
export type BodyProps<T extends keyof JSX.IntrinsicElements> =
  HTMLElementProps<T> &
    CommonTypographyProps & {
      /**
       * font-weight applied to typography element
       * default: `regular`
       */
      weight?: BodyFontWeight;
      as?: T;
    };
