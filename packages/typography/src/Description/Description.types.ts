import { HTMLElementProps } from '@leafygreen-ui/lib';

import { ResponsiveTypographyProps } from '../types';

export type DescriptionProps = HTMLElementProps<'p'> &
  ResponsiveTypographyProps & { disabled?: boolean };
