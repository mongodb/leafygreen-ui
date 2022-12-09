import React from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { useSideNavContext } from '../SideNav/SideNavContext';
import { ulStyleOverrides } from '../SideNav/styles';
import {
  baseStyle,
  indentedStyle,
  themeStyle,
} from '../SideNavGroup/SideNavGroup.styles';

import { SideNavGroupOpenProps } from './types';

/**
 * @internal
 */
export function SideNavGroupOpen({
  groupHeaderProps,
  indentLevel,
  renderHeader,
  menuGroupLabelId,
  children,
}: SideNavGroupOpenProps) {
  const { theme, darkMode } = useSideNavContext();

  return (
    <>
      <div
        {...groupHeaderProps}
        className={cx(baseStyle, themeStyle[theme], {
          [indentedStyle(indentLevel, darkMode)]: indentLevel > 1,
        })}
      >
        {renderHeader()}
      </div>

      <ul aria-labelledby={menuGroupLabelId} className={ulStyleOverrides}>
        {children}
      </ul>
    </>
  );
}
