import { HTMLElementProps } from '@leafygreen-ui/lib';

import { CommonTypographyProps } from '../types';

export type LabelProps = CommonTypographyProps &
  HTMLElementProps<'label', never> & {
    htmlFor: string;
    disabled?: boolean;
  };
