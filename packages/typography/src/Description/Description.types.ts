import React from 'react';

import { ResponsiveTypographyProps } from '../types';

export type DescriptionProps = React.ComponentPropsWithRef<'p'> &
  ResponsiveTypographyProps & { disabled?: boolean };
