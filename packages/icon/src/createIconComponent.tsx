import React from 'react';
import PropTypes from 'prop-types';

export const Size = {
  Small: 'small',
  Default: 'default',
  Large: 'large',
  XLarge: 'xlarge',
} as const;

export type Size = typeof Size[keyof typeof Size];

export interface IconProps extends LGGlyph.ComponentProps {
  glyph: string;
}

const sizeMap = {
  small: 14,
  default: 16,
  large: 20,
  xlarge: 24,
} as const;

type GlyphObject = Record<string, LGGlyph.Component>;

export default function createIconComponent<
  G extends GlyphObject = GlyphObject
>(glyphs: G) {
  const Icon = ({ glyph, size = Size.Default, ...rest }: IconProps) => {
    const SVGComponent = glyphs[glyph];

    return (
      <SVGComponent
        {...rest}
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
