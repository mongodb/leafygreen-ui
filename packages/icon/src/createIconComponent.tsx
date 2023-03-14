import React from 'react';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';

import { Size } from './glyphCommon';
import { LGGlyph } from './types';

// We omit size here because we map string values for size to numbers in this component.
export interface IconProps extends Omit<LGGlyph.ComponentProps, 'size'> {
  /**
   * The name of the icon glyph
   */
  glyph: string;

  /**
   * Size of the icon
   */
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

    if (SVGComponent) {
      return <SVGComponent {...rest} />;
    } else {
      // TODO: improve fuzzy match
      // Suggest the proper icon casing if there's a near match
      const nearMatch = Object.keys(glyphs).find(
        key => kebabCase(key) === kebabCase(glyph),
      );
      console.error(
        'Error in Icon',
        `Could not find glyph named "${glyph}" in the icon set.`,
        nearMatch && `Did you mean "${nearMatch}?"`,
      );
      return <></>;
    }
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
