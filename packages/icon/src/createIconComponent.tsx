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

const sizeMap: Record<Size, number> = {
  small: 14,
  default: 16,
  large: 24,
  xlarge: 32,
};

// Converts a camel-case name to a human-readable name
//
// GlyphName => Glyph Name Icon
function humanReadableTitle(glyph: string) {
  return `${glyph.replace(/([A-Z][a-z])/g, ' $1')} Icon`;
}

type IconType<G extends GlyphMap> = React.ComponentType<IconProps<G>> & G

export default function createIconComponent<G extends Omit<GlyphMap, 'displayName' | 'propTypes'>>(
  glyphs: G,
): IconType<G> {
  const Icon = ({ glyph, size = Size.Default, ...rest }: IconProps<G>) => {
    const SVGComponent: SVGR.Component = glyphs[glyph];

    return (
      <SVGComponent
        {...rest}
        size={size}
        title={rest.title || humanReadableTitle(glyph as string)}
      />
    );
  };

  for (const glyph in glyphs) {
    if (glyph in Icon) {
      // TODO: Add better error message
      throw new Error('This key already exists on Icon')
    }

    // @ts-ignore
    // TODO: Add better comment
    Icon[glyph] = glyphs[glyph]
  }

  Icon.displayName = 'Icon';

  Icon.propTypes = {
    glyph: PropTypes.oneOf(Object.keys(glyphs)).isRequired,
    size: PropTypes.oneOfType([
      PropTypes.oneOf(Object.keys(sizeMap)),
      PropTypes.number,
    ]),
  } as Record<string, any>;

  return Icon as IconType<G>;
}
