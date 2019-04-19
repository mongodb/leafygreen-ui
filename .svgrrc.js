// https://www.smooth-code.com/open-source/svgr/docs/configuration-files/
module.exports = {
  titleProp: true,
  svgProps: {
    role: 'img',
    height: '{props.size}',
    width: '{props.size}',
    viewBox: '0 0 16 16',
  },

  // There's *some* documentation on templates found here:
  //
  // https://www.smooth-code.com/open-source/svgr/docs/cli/#use-a-specific-template
  template: function(
    { template },
    opts,
    { imports, componentName, props, jsx, exports },
  ) {
    componentName = componentName.name.replace('Svg', '');

    return template.ast`
			${imports}
			import PropTypes from 'prop-types';
			
			const ${componentName} = (${props}) => ${jsx};

			// For some reason, the build breaks if we don't pre-emptively coerce this to a string
			${componentName}.displayName = '${componentName + ''}';
			
			${componentName}.propTypes = {
				fill: PropTypes.string,
				size: PropTypes.number,
			};

			${componentName}.defaultProps = {
				fill: '#000000',
				size: 16,
			};

			export default ${componentName};
		`;
  },
  jsx: {
    babelConfig: {
      plugins: [
        [ 
          // This plugin lets us transform the JSX output to change instances of
          // #000000 and #000 (the fill for our SVG glyphs) to use `this.props.fill` instead.
          '@svgr/babel-plugin-replace-jsx-attribute-value',
          {
            values: [
              { value: '#000', newValue: 'props.fill', literal: true },
              { value: '#000000', newValue: 'props.fill', literal: true },
            ],
          },
        ],
      ],
    },
  },
};
