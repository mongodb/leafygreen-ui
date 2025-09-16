import React from 'react';

export interface CollapseToggleProps
  extends React.ComponentPropsWithRef<'button'> {
  collapsed?: boolean;
  hideTooltip?: boolean;
}
