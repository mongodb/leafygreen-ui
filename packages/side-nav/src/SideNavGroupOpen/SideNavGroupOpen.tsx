import React from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { useSideNavContext } from '../SideNav/SideNavContext';
import { ulStyleOverrides } from '../SideNav/styles';
import { baseStyle, indentedStyle, themeStyle } from '../SideNavGroup/styles';
import { SideNavGroupHeader } from '../SideNavGroupHeader/SideNavGroupHeader';

import { SideNavGroupOpenProps } from './types';

/**
 * @internal
 */
export function SideNavGroupOpen({
  groupHeaderProps,
  indentLevel,
  menuGroupLabelId,
  children,
  isActiveGroup,
  header,
  accessibleGlyph,
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
        <SideNavGroupHeader
          isActiveGroup={isActiveGroup}
          header={header}
          accessibleGlyph={accessibleGlyph}
        />
      </div>

      <ul aria-labelledby={menuGroupLabelId} className={ulStyleOverrides}>
        {children}
      </ul>
    </>
  );
}
