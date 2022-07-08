import * as React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { Theme } from '@leafygreen-ui/lib';

const borderStyle: Record<Theme, string> = {
  [Theme.Light]:
    css`
    border-top: 1px solid ${palette.gray.dark2};
  `,
  [Theme.Dark]:
    css`
    border-top: 1px solid ${palette.gray.light1};
  `,
}

interface MenuSeparatorProps {
  /**
   * className applied to `MenuSeparator` li
   */
   className?: string;
  /**
   * Determines whether or not the component will be rendered in dark theme
   */
   darkMode?: boolean;
}

function MenuSeparator({ className, darkMode }: MenuSeparatorProps) {
  const theme = darkMode ? Theme.Dark : Theme.Light;
  return <li role="separator" className={cx(borderStyle[theme], className)} />;
}

MenuSeparator.displayName = 'MenuSeparator';

export default MenuSeparator;

export type MenuSeparatorElement = React.ReactComponentElement<typeof MenuSeparator>;
