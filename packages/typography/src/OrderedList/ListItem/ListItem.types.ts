import { HTMLElementProps } from '@leafygreen-ui/lib';

import { CommonTypographyProps } from '../../types';

export type ListItemProps = HTMLElementProps<'li'> &
  CommonTypographyProps & {
    title?: React.ReactNode;
    description?: React.ReactNode;
  };
