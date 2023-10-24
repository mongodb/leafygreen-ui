import React from 'react';

import { PolymorphicAs } from '@leafygreen-ui/polymorphic';

export interface BaseItemProps {
  children?: React.ReactNode;
  disabled?: boolean;
  as?: PolymorphicAs;
  active?: boolean;
  className?: string;
  description?: React.ReactNode;
  leftGlyph?: React.ReactNode;
  rightGlyph?: React.ReactNode;
  onClick?: React.MouseEventHandler;
}
