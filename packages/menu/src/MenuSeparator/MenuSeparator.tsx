import React, { useContext } from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { MenuContext } from '../MenuContext';

import { borderStyle, borderThemeStyle } from './MenuSeparator.styles';

interface MenuSeparatorProps {
  /**
   * className applied to `MenuSeparator` li
   */
  className?: string;
}

export function MenuSeparator({ className }: MenuSeparatorProps) {
  const { theme } = useContext(MenuContext);
  return (
    <li
      role="separator"
      className={cx(borderStyle, borderThemeStyle[theme], className)}
    />
  );
}

MenuSeparator.displayName = 'MenuSeparator';

export default MenuSeparator;
