import React from 'react';
import PropTypes from 'prop-types';

export default glyphs => {
  const sizeMap = {
    default: 16,
    large: 24,
    xlarge: 32,
  }

  const Icon = ({ glyph, size, ...rest }) => {
    const SVGComponent = glyphs[glyph];

    // Converts a camel-case name to a human-readable name
    //
    // GlyphName => Glyph Name Icon
    const humanReadableTitle = `${glyph.replace(/([A-Z][a-z])/g, ' $1')} Icon`

    return (
      <SVGComponent
        {...rest}
        title={humanReadableTitle}
        size={typeof size === 'number' ? size : sizeMap[size] || sizeMap.default}
      />
    );
  }

  Icon.displayName = 'Icon';

  Icon.propTypes = {
    glyph: PropTypes.oneOf(Object.keys(glyphs)).isRequired,
    size: PropTypes.oneOfType([
      PropTypes.oneOf(Object.keys(sizeMap)),
      PropTypes.number,
    ]),
  };

  Icon.defaultProps = {
    size: 'default',
  };

  return Icon
}
