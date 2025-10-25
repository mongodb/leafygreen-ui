import React from 'react';

import { css, cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';

import { generateAccessibleProps, Size, sizeMap } from './glyphCommon';
import { LGGlyph, SVGR } from './types';

/**
 * @deprecated - No longer needed for icon generation. Keeping it for backwards compatibility.
 * Returns a single glyph component.
 * Process custom glyphs to ensure consistent behavior between custom and built-in icons
 * @param glyphName: string - the display name of the icon
 * @param Glyph: SVGR.Component - the SVG icon component
 * @returns LGGlyph.Component
 */
export function createGlyphComponent(
  glyphName: string,
  Glyph: SVGR.Component,
): LGGlyph.Component {
  const GlyphComponent: LGGlyph.Component = ({
    className,
    size = Size.Default,
    fill,
    title,
    'aria-labelledby': ariaLabelledby,
    'aria-label': ariaLabel,
    role = 'img',
    ...rest
  }: LGGlyph.ComponentProps) => {
    const titleId = useIdAllocator({ prefix: 'icon-title' });
    const fillStyle = css`
      color: ${fill};
    `;

    const renderedSize = typeof size === 'number' ? size : sizeMap[size];

    if (!(role === 'img' || role === 'presentation')) {
      console.warn(
        "Please provide a valid role to this component. Valid options are 'img' and 'presentation'. If you'd like the Icon to be accessible to screen readers please use 'img', otherwise set the role to 'presentation'.",
      );
    }

    return (
      <Glyph
        className={cx(
          {
            [fillStyle]: fill != null,
          },
          className,
        )}
        height={renderedSize}
        width={renderedSize}
        role={role}
        {...generateAccessibleProps(role, glyphName, {
          title,
          titleId,
          ['aria-label']: ariaLabel,
          ['aria-labelledby']: ariaLabelledby,
        })}
        {...rest}
      />
    );
  };

  GlyphComponent.displayName = glyphName;

  GlyphComponent.isGlyph = true;

  return GlyphComponent;
}
