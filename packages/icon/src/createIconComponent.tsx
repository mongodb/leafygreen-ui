import React from 'react';
import PropTypes from 'prop-types';
import { LGGlyph } from './types';
import { Size, sizeMap } from './glyphCommon';

// We omit size here because we map string values for size to numbers in this component.
export interface IconProps extends Omit<LGGlyph.ComponentProps, 'size'> {
  glyph: string;
  size?: Size | number;
}

type GlyphObject = Record<string, LGGlyph.Component>;

export default function createIconComponent<
  G extends GlyphObject = GlyphObject
>(glyphs: G) {
  const Icon = ({ glyph, size, ...rest }: IconProps) => {
    const SVGComponent = glyphs[glyph];
    const iconSize = typeof size === 'number' ? size : sizeMap[size]
    return <SVGComponent size={iconSize} {...rest} />;
  };

  Icon.displayName = 'Icon';

  Icon.propTypes = {
    glyph: PropTypes.oneOf(Object.keys(glyphs)).isRequired,
    size: PropTypes.oneOfType([
      PropTypes.oneOf(Object.values(Size)),
      PropTypes.number,
    ]),
  } as any;

  return Icon;
}
