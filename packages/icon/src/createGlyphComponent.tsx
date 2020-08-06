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
    return null;
  }

  if (title == null || title === true) {
    return `${name.replace(/([a-z])([A-Z])/g, '$1 $2')} Icon`;
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

  GlyphComponent.displayName = glyphName;

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
