import React from 'react';

import { CollapsedSideNavItem } from '../CollapsedSideNavItem';

import { AccessibleGlyphProps } from './AccessibleGlyph.types';

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
