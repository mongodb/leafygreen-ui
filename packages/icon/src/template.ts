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
interface AnyObject {
  [K: string]: any;
}

module.exports = function template(
  {
    template,
  }: {
    template: {
      smart: (opts: AnyObject) => AnyObject;
    } & AnyObject;
  } & AnyObject,
  opts: { [K: string]: any },
  {
    imports,
    componentName,
    jsx,
    exports,
  }: {
    jsx: AnyObject;
    componentName: string;
    imports: string;
    exports: string;
  } & AnyObject,
) {
  const plugins = ['jsx'];

  if (opts.typescript) {
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
      title={getGlyphTitle(glyphName, title)}
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

    const ${componentName} = ({ className, size = 16, title, fill, ...props }) => {
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
}
