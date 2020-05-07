/**
usage:
cd packages/icon

# for entire folder
yarn svgr --template src/template.js -d dist/test src/glyphs

# for one file while developing
yarn svgr --template src/template.js -d dist/test src/glyphs/ActivityFeed.svg

I have these tabs open atm:
https://react-svgr.com/docs/custom-templates/
https://github.com/gregberge/svgr/blob/master/packages/babel-plugin-transform-svg-component/src/index.js#L28
https://babeljs.io/docs/en/babel-template#template-literal-usage
https://astexplorer.net/
*/

/**
 function createGlyphComponent(glyphName, Glyph) {
  function GlyphComponent({ className, size = 16, title, fill, ...props }) {


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
        {...props}
      />
    );
  }
}
**/
interface FirstArg extends Record<string, any> {
  template: {
    smart: (opts: Record<string, any>) => Record<string, any>;
  } & Record<string, any>;
}

interface SecondArg extends Record<string, any> {
  state: {
    componentName: string;
  } & Record<string, any>;
  typescript: boolean;
}

interface ThirdArg extends Record<string, any> {
  jsx: Record<string, any>;
  componentName: object;
  imports: string;
  exports: string;
}

module.exports = function template(
  { template }: FirstArg,
  { state: { componentName }, typescript }: SecondArg,
  { imports, jsx, exports }: ThirdArg,
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
      title={getGlyphTitle('${componentName}', title)}
      height={size}
      width={size}
    />`;

  // Augment the `<svg attributes />` so we can customize it with the values above.
  jsx.openingElement.attributes = jsxAttributes.expression.openingElement.attributes.concat(
    jsx.openingElement.attributes[2],
  );

  return typeScriptTpl.ast`
    ${imports}
    import PropTypes from 'prop-types';
    import { css, cx } from '@leafygreen-ui/emotion';

    function getGlyphTitle(name, title) {
      if (title === false) {
        // If title is null, we unset the title entirely, otherwise we generate one.
        return undefined;
      }

      if (title == null || title === true) {
        let generatedTitle = \`\${name.replace(
          /([A-Z][a-z])/g,
          ' $1',
        )} Icon\`;
 
        // Trim space at beginning of title
        while (generatedTitle.charAt(0) === ' ') {
          generatedTitle = generatedTitle.substr(1);
        }

        return generatedTitle;
      }

      return title;
    }

    function generateGlyphTitle() {
      return '${componentName}' + '-' + Math.floor(Math.random() * 1000000);
    }

    const ${componentName} = ({ className, size = 16, title, customTitleId,  fill, ...props }) => {
      const { current: titleId } = React.useMemo(customTitleId || generateGlyphTitle());

      const fillStyle = css\`
        color: \${fill};
      \`;

      return ${jsx};
    }

    ${componentName}.displayName = ${componentName};

    ${componentName}.propTypes = {
        fill: PropTypes.string,
        size: PropTypes.number,
        className: PropTypes.string,
    };

    ${exports}
  `;
};
