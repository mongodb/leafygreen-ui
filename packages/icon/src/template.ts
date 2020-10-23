interface BabelAPI extends Record<string, any> {
  template: {
    smart: (opts: Record<string, any>) => any;
  } & Record<string, any>;
}

interface SVGROptions extends Record<string, any> {
  state: {
    componentName: string;
  } & Record<string, any>;
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
  { state: { componentName } }: SVGROptions,
  { imports, jsx, exports }: ASTParts,
) {
  const typeScriptTpl = template.smart({ plugins: ['jsx', 'typescript'] });

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

  return typeScriptTpl(`
    %%imports%%
    import PropTypes from 'prop-types';
    import { css, cx } from '@leafygreen-ui/emotion';
    import { IdAllocator } from '@leafygreen-ui/lib';
    import { getGlyphTitle, sizeMap } from '../glyphCommon';
    import { LGGlyph } from '../types';
  
    export interface ${componentName}Props extends LGGlyph.ComponentProps {}

    const idAllocator = IdAllocator.create('${componentName}');

    const ${componentName} = ({
      className,
      size = 16,
      title,
      titleId: customTitleId,
      fill,
      ...props
    }: ${componentName}Props) => {
      const titleId = React.useMemo(
        () => customTitleId || idAllocator.generate(),
        [customTitleId]
      );

      const fillStyle = css\`
        color: \${fill};
      \`;

      title = getGlyphTitle('${componentName}', title);

      return %%jsx%%;
    }

    ${componentName}.displayName = '${componentName}';

    ${componentName}.isGlyph = true;

    ${componentName}.propTypes = {
        fill: PropTypes.string,
        size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        className: PropTypes.string,
    };

    %%exports%%
  `)({
    imports: imports,
    jsx: jsx,
    exports: exports,
  });
};
