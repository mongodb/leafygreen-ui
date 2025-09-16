import React from 'react';

import { ResponsiveTypographyProps } from '../types';

export type DescriptionProps = React.ComponentPropsWithoutRef<'p'> &
  ResponsiveTypographyProps & { disabled?: boolean };
