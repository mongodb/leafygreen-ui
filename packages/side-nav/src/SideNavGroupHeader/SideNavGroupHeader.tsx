import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { Overline } from '@leafygreen-ui/typography';

import { AccessibleGlyph } from '../AccessibleGlyph';
import { useSideNavContext } from '../SideNav/SideNavContext';

import {
  iconBaseStyles,
  iconCustomStyle,
  iconCustomThemeStyle,
  overlineStyle,
} from './SideNavGroupHeader.styles';
import { SideNavGroupHeaderProps } from './SideNavGroupHeader.types';

/**
 * @internal
 */
export function SideNavGroupHeader({
  isActiveGroup,
  accessibleGlyph,
  header,
}: SideNavGroupHeaderProps) {
  const { theme } = useSideNavContext();

  return (
    <div className={iconBaseStyles}>
      {accessibleGlyph && (
        <AccessibleGlyph
          isActiveGroup={isActiveGroup}
          accessibleGlyph={accessibleGlyph}
          className={cx(iconCustomStyle, iconCustomThemeStyle[theme])}
        />
      )}
      <Overline className={overlineStyle}>{header}</Overline>
    </div>
  );
}
