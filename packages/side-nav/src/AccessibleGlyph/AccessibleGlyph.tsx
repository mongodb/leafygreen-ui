import React from 'react';

import { CollapsedSideNavItem } from '../CollaspedSideNavItem/CollapsedSideNavItem';

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
      {accessibleGlyph && (
        <>
          <span className={className}>{accessibleGlyph}</span>
          <CollapsedSideNavItem active={isActiveGroup}>
            {accessibleGlyph}
          </CollapsedSideNavItem>
        </>
      )}
    </>
  );
}
