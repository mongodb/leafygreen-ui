import React from 'react';
import PropTypes from 'prop-types';

interface GlyphMap {
  [glyph: string]: SVGR.Component;
}

export const Size = {
  Small: 'small',
  Default: 'default',
  Large: 'large',
  XLarge: 'xlarge',
} as const;

export type Size = typeof Size[keyof typeof Size];

export interface IconProps<G extends GlyphMap> extends SVGR.ComponentProps {
  glyph: keyof G;
}

const sizeMap: { [S in Size]: number } = {
  small: 14,
  default: 16,
  large: 24,
  xlarge: 32,
};

export default function createIconComponent<G extends GlyphMap>(
  glyphs: G,
): React.ComponentType<IconProps<G>> {
  const Icon = ({ glyph, ...rest }: IconProps<G>) => {
    const SVGComponent: SVGR.Component = glyphs[glyph];

    return <SVGComponent {...rest} />;
  };

  Icon.displayName = 'Icon';

  Icon.propTypes = {
    glyph: PropTypes.oneOf(Object.keys(glyphs)).isRequired,
    size: PropTypes.oneOfType([
      PropTypes.oneOf(Object.keys(sizeMap)),
      PropTypes.number,
    ]),
  } as any;

  return Icon;
}
