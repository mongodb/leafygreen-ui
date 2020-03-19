import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';

function humanReadableTitle(name: string) {
  return `${name.replace(/([A-Z][a-z])/g, ' $1')} Icon`;
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
    if (!title) {
      // If title is null, we unset the title entirely, otherwise we generate one.
      title = title === null ? undefined : humanReadableTitle(glyphName);
    }

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
        title={title}
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
