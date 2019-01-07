import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default glyphs => {
  return class Icon extends PureComponent {
    static displayName = 'Icon';
    static propTypes = {
      glyph: PropTypes.oneOf(Object.keys(glyphs)).isRequired,
      size: PropTypes.oneOfType([
        PropTypes.oneOf(['default', 'large', 'xlarge']),
        PropTypes.number,
      ]),
    };

    static defaultProps = {
      size: 'default',
    };

    get humanReadableTitle() {
      const { glyph } = this.props;

      const transformedName = glyph.replace(/([A-Z][a-z])/g, ' $1');
      return `${transformedName} Icon`;
    }

    get sizeInPixels() {
      const { size } = this.props;

      if (typeof size === 'number') {
        return size;
      }

      switch (size) {
        case 'large':
          return 24;

        case 'xlarge':
          return 32;

        case 'default':
        default:
          return 16;
      }
    }

    render() {
      const { glyph, ...rest } = this.props;
      const SVGComponent = glyphs[glyph];

      return (
        <SVGComponent
          {...rest}
          title={this.humanReadableTitle}
          size={this.sizeInPixels}
        />
      );
    }
  };
};
