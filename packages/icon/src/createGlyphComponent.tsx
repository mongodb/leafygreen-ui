import React from 'react';
import PropTypes from 'prop-types';
import { SVGR, LGGlyph } from './types';
import { css, cx } from '@leafygreen-ui/emotion';
import { getGlyphTitle, sizeMap, Size } from './glyphCommon';

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
