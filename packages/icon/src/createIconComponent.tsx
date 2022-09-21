import React from 'react';
import PropTypes from 'prop-types';
import { LGGlyph } from './types';
import { Size } from './glyphCommon';
import { GlyphName } from './glyphs';

// We omit size here because we map string values for size to numbers in this component.
export interface IconProps extends Omit<LGGlyph.ComponentProps, 'size'> {
  glyph: GlyphName;
  size?: Size | number;
}

type GlyphObject = Record<string, LGGlyph.Component>;

/**
 * Returns a single component with a `glyph` prop to select the glyph
 * @param glyphs The set of glyphs
 * @returns Icon component
 */
export function createIconComponent<G extends GlyphObject = GlyphObject>(
  glyphs: G,
) {
  const Icon = ({ glyph, ...rest }: IconProps) => {
    const SVGComponent = glyphs[glyph];
    SVGComponent.isGlyph = true;
    return <SVGComponent {...rest} />;
  };

  Icon.displayName = 'Icon';

  Icon.isGlyph = true;

  Icon.propTypes = {
    glyph: PropTypes.oneOf(Object.keys(glyphs)).isRequired,
    size: PropTypes.oneOfType([
      PropTypes.oneOf(Object.values(Size)),
      PropTypes.number,
    ]),
  } as any;

  return Icon;
}
