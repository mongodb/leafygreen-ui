interface BabelAPI extends Record<string, any> {
  template: {
    smart: (opts: Record<string, any>) => Record<string, any>;
  } & Record<string, any>;
}

interface SVGROptions extends Record<string, any> {
  state: {
    componentName: string;
  } & Record<string, any>;
  typescript: boolean;
}

interface ASTParts extends Record<string, any> {
  jsx: Record<string, any>;
  componentName: object;
  imports: string;
  exports: string;
  interfaces: string;
  props: string;
}

module.exports = function template(
  { template }: BabelAPI,
  { state: { componentName }, typescript }: SVGROptions,
  { imports, jsx, exports }: ASTParts,
) {
  const plugins = ['jsx'];

  if (typescript) {
    plugins.push('typescript');
  }

  const typeScriptTpl = template.smart({ plugins });

  const jsxAttributes = typeScriptTpl.ast`
    <Glyph
      className={cx(
        {
          [fillStyle]: fill != null,
        },
        className,
      )}
      height={typeof size === 'number' ? size : sizeMap[size]}
      width={typeof size === 'number' ? size : sizeMap[size]}
      {...props}
    />`;

  // Augment the `<svg attributes />` so we can customize it with the values above.
  jsx.openingElement.attributes = jsxAttributes.expression.openingElement.attributes.concat(
    jsx.openingElement.attributes[2],
  );

  return typeScriptTpl.ast`
    ${imports}
    import PropTypes from 'prop-types';
    import { css, cx } from '@leafygreen-ui/emotion';

    const sizeMap = {
      small: 14,
      default: 16,
      large: 20,
      xlarge: 24,
    }

    function getGlyphTitle(name, title) {
      if (title === false) {
        // If title is null, we unset the title entirely, otherwise we generate one.
        return null;
      }

      if (title == null || title === true) {
        return \`\${name.replace(
          /([a-z])([A-Z])/g,
          '$1 $2',
        )} Icon\`;
      }

      return title;
    }

    function generateGlyphTitle() {
      return '${componentName}' + '-' + Math.floor(Math.random() * 1000000);
    }

    const ${componentName} = ({ className, size = 16, title, customTitleId,  fill, ...props }) => {
      const { current: titleId } = React.useMemo(() => customTitleId || generateGlyphTitle(), [customTitleId]);

      const fillStyle = css\`
        color: \${fill};
      \`;

      title = getGlyphTitle('${componentName}', title);

      return ${jsx};
    }

    ${componentName}.displayName = '${componentName}';

    ${componentName}.isGlyph = true;

    ${componentName}.propTypes = {
        fill: PropTypes.string,
        size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        className: PropTypes.string,
    };

    ${exports}
  `;
};
