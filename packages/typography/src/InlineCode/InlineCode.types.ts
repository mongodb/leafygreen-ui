import { HTMLElementProps, OneOf } from '@leafygreen-ui/lib';

import { ResponsiveTypographyProps } from '../types';

export type InlineCodeProps = OneOf<
  HTMLElementProps<'code'>,
  HTMLElementProps<'a'>
> &
  ResponsiveTypographyProps;
