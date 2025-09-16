import React from 'react';

export interface CollapseToggleProps
  extends React.ComponentPropsWithoutRef<'button'> {
  collapsed?: boolean;
  hideTooltip?: boolean;
}
