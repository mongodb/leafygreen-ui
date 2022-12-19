import React from 'react';

import { CollapsedSideNavItem } from '../CollapsedSideNavItem/CollapsedSideNavItem';

import { AccessibleGlyphProps } from './types';

/**
 * @internal
 */
export function AccessibleGlyph({
  isActiveGroup,
  className,
  accessibleGlyph,
}: AccessibleGlyphProps) {
  return (
    <>
      <span className={className}>{accessibleGlyph}</span>
      <CollapsedSideNavItem active={isActiveGroup}>
        {accessibleGlyph}
      </CollapsedSideNavItem>
    </>
  );
}
