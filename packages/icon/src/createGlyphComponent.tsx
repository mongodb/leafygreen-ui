import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';

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
    size = 16,
    title,
    fill,
    ...rest
  }: LGGlyph.ComponentProps) {
    const fillStyle = css`
      color: ${fill};
    `;

    return (
      <Glyph
        className={cx(
          {
            [fillStyle]: fill != null,
          },
          className,
        )}
        title={getGlyphTitle(glyphName, title)}
        height={size}
        width={size}
        {...rest}
      />
    );
  }

  // For some reason, the build breaks if we don't pre-emptively coerce this to a string
  GlyphComponent.displayName = glyphName;

  GlyphComponent.propTypes = {
    fill: PropTypes.string,
    size: PropTypes.number,
    title: PropTypes.string,
    className: PropTypes.string,
  };

  return GlyphComponent;
}
