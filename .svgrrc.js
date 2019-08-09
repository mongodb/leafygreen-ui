// https://www.smooth-code.com/open-source/svgr/docs/configuration-files/
module.exports = {
  titleProp: true,
  svgProps: {
    role: 'img',
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

    // NOTE:
    // If any props on the generated component get changed, make sure to also update SVGR.ComponentProps in typings/images.d.ts
    return template.ast`
			${imports}
      import PropTypes from 'prop-types';
      import { css, cx } from '@leafygreen-ui/emotion';
			
			const ${componentName} = (${props}) => {
        // Setting className to manually enable fill prop to overwrite the color when the prop is set
        props.className = cx(props.className, {[css\`color: \${ props.fill }\`]: props.fill});
        props.height = props.size;
        props.width = props.size;
        
        // Delete props.fill and props.size so that it does not set them as SVG attributes in the DOM
        delete props.fill;
        delete props.size;
        
        return ${jsx};
      };

			// For some reason, the build breaks if we don't pre-emptively coerce this to a string
			${componentName}.displayName = '${componentName + ''}';
			
			${componentName}.propTypes = {
				fill: PropTypes.string,
				size: PropTypes.number,
			};

			${componentName}.defaultProps = { size: 16 };

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
              { value: '#000', newValue: "'currentColor'", literal: true },
              { value: '#000000', newValue: "'currentColor'", literal: true },
            ],
          },
        ],
      ],
    },
  },
};
