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

export interface IconProps<G extends GlyphMap>
  extends Omit<SVGR.ComponentProps, 'size'> {
  glyph: keyof G;
  size?: number | Size;
}

const sizeMap: { [S in Size]: number } = {
  small: 14,
  default: 16,
  large: 20,
  xlarge: 24,
};

// Converts a camel-case name to a human-readable name
//
// GlyphName => Glyph Name Icon
function humanReadableTitle(glyph: string) {
  return `${glyph.replace(/([A-Z][a-z])/g, ' $1')} Icon`;
}

export default function createIconComponent<G extends GlyphMap>(
  glyphs: G,
): React.ComponentType<IconProps<G>> {
  const Icon = ({ glyph, size = Size.Default, ...rest }: IconProps<G>) => {
    const SVGComponent: SVGR.Component = glyphs[glyph];

    return (
      <SVGComponent
        {...rest}
        title={rest.title || humanReadableTitle(glyph as string)}
        size={
          typeof size === 'number' ? size : sizeMap[size] || sizeMap.default
        }
      />
    );
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
