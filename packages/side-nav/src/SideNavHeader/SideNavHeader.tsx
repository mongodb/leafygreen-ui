import { cx } from '@leafygreen-ui/emotion';
import { isComponentGlyph } from '@leafygreen-ui/icon';
import { Overline } from '@leafygreen-ui/typography';
import React from 'react';
import { CollapsedSideNavItem } from '../CollaspedSideNavItem/CollapsedSideNavItem';
import {
  baseStyles,
  customIconStyle,
  customIconThemeStyle,
  overlineStyle,
} from './styles';
import { SideNavHeaderProps } from './types';

/**
 * @internal
 */
export function SideNavHeader({
  glyph,
  isActiveGroup,
  theme,
  header,
}: SideNavHeaderProps) {
  // render the provided glyph with appropriate aria roles
  const accessibleGlyph =
    glyph && isComponentGlyph(glyph)
      ? React.cloneElement(glyph, {
          className: glyph.props.className,
          role: 'presentation',
          'data-testid': 'side-nav-group-header-icon',
        })
      : null;

  return (
    <div className={baseStyles}>
      {accessibleGlyph && (
        <>
          <span className={cx(customIconStyle, customIconThemeStyle[theme])}>
            {accessibleGlyph}
          </span>
          <CollapsedSideNavItem active={isActiveGroup}>
            {accessibleGlyph}
          </CollapsedSideNavItem>
        </>
      )}
      <Overline className={overlineStyle}>{header}</Overline>
    </div>
  );
}
