import React from 'react';
import PropTypes from 'prop-types';
import { SVGR, LGGlyph } from './types';
import { css, cx } from '@leafygreen-ui/emotion';

export const Size = {
  Small: 'small',
  Default: 'default',
  Large: 'large',
  XLarge: 'xlarge',
} as const;

type Size = typeof Size[keyof typeof Size];

const sizeMap: Record<Size, number> = {
  small: 14,
  default: 16,
  large: 20,
  xlarge: 24,
} as const;

export function getGlyphTitle(name: string, title?: string | boolean | null) {
  if (title === false) {
    // If title is null, we unset the title entirely, otherwise we generate one.
    return undefined;
  }

  if (title == null || title === true) {
    let generatedTitle = `${name.replace(/([A-Z][a-z])/g, ' $1')} Icon`;

    // Trim space at beginning of title
    while (generatedTitle.charAt(0) === ' ') {
      generatedTitle = generatedTitle.substr(1);
    }

    return generatedTitle;
  }

  return title;
}

export default function createGlyphComponent(
  glyphName: string,
  Glyph: SVGR.Component,
): LGGlyph.Component {
  function GlyphComponent({
    className,
    size = Size.Default,
    title,
    fill,
    ...rest
  }: LGGlyph.ComponentProps) {
    const fillStyle = css`
      color: ${fill};
    `;

    const renderedSize = typeof size === 'number' ? size : sizeMap[size];

    return (
      <Glyph
        className={cx(
          {
            [fillStyle]: fill != null,
          },
          className,
        )}
        title={getGlyphTitle(glyphName, title)}
        height={renderedSize}
        width={renderedSize}
        {...rest}
      />
    );
  }

  GlyphComponent.displayName = `Glyph${glyphName}`;

  GlyphComponent.isGlyph = true;

  GlyphComponent.propTypes = {
    fill: PropTypes.string,
    size: PropTypes.oneOfType([
      PropTypes.oneOf(Object.values(Size)),
      PropTypes.number,
    ]),
    className: PropTypes.string,
  };

  return GlyphComponent;
}
