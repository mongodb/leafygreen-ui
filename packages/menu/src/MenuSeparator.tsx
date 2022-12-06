import React, { useContext } from 'react';

import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

import MenuContext from './MenuContext';

const borderStyle = css`
  height: 16px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const borderThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    &::before {
      background-color: ${palette.gray.dark2};
    }
  `,
  [Theme.Dark]: css`
    &::before {
      background-color: ${palette.gray.light1};
    }
  `,
};

interface MenuSeparatorProps {
  /**
   * className applied to `MenuSeparator` li
   */
  className?: string;
}

function MenuSeparator({ className }: MenuSeparatorProps) {
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

export type MenuSeparatorElement = React.ReactComponentElement<
  typeof MenuSeparator
>;
