import React from 'react';

import { ActionType } from '@leafygreen-ui/input-option';

export interface BaseItemProps {
  children?: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  className?: string;
  description?: React.ReactNode;
  leftGlyph?: React.ReactNode;
  rightGlyph?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  actionType?: ActionType;
}
