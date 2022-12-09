import { HTMLElementProps } from '@leafygreen-ui/lib';

import { ResponsiveTypographyProps } from '../types';

export type LabelProps = ResponsiveTypographyProps &
  HTMLElementProps<'label', never> & {
    htmlFor: string;
    disabled?: boolean;
  };
