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

export function svgrTemplate(
  api: BabelAPI,
  opts: SVGROptions,
  { imports, jsx, exports }: ASTParts,
) {
  const { template, types: t } = api;
  const { componentName } = opts.state;
  const typeScriptTpl = template.smart({ plugins: ['jsx', 'typescript'] });

  const jsxAttributes = typeScriptTpl.ast`
    <Glyph
      className={cx(
        {
          [fillStyle]: fill != null,
        },
        noFlexShrink,
        className,
      )}
      height={typeof size === 'number' ? size : sizeMap[size]}
      width={typeof size === 'number' ? size : sizeMap[size]}
      role={role}
      {...accessibleProps}
      {...props}
    />`;

  // Augment the `<svg attributes />` so we can customize it with the values above.
  jsx.openingElement.attributes =
    jsxAttributes.expression.openingElement.attributes.concat(
      jsx.openingElement.attributes[2],
    );

  // Convert self-closing svg to have children
  jsx.openingElement.selfClosing = false;

  // Create closing element using Babel types
  jsx.closingElement = t.jsxClosingElement(
    t.jsxIdentifier(jsx.openingElement.name.name),
  );

  // Create the title element JSX manually using Babel types
  // {title && <title id={titleId}>{title}</title>}
  const titleJSXElement = t.jsxElement(
    t.jsxOpeningElement(t.jsxIdentifier('title'), [
      t.jsxAttribute(
        t.jsxIdentifier('id'),
        t.jsxExpressionContainer(t.identifier('titleId')),
      ),
    ]),
    t.jsxClosingElement(t.jsxIdentifier('title')),
    [t.jsxExpressionContainer(t.identifier('title'))],
    false,
  );

  // Wrap title in conditional expression: {title && <title>...</title>}
  const conditionalTitleExpression = t.jsxExpressionContainer(
    t.logicalExpression('&&', t.identifier('title'), titleJSXElement),
  );

  // Add the conditional title as a child, followed by the original children
  jsx.children = [conditionalTitleExpression, ...jsx.children];

  return typeScriptTpl(`
    %%imports%%
    import { css, cx } from '@leafygreen-ui/emotion';
    import { useIdAllocator } from '@leafygreen-ui/hooks';
    import { generateAccessibleProps, sizeMap } from '../glyphCommon';
    import { LGGlyph } from '../types';
  
    export interface ${componentName}Props extends LGGlyph.ComponentProps {}

    const ${componentName} = ({
      className,
      size = 16,
      title,
      ['aria-label']: ariaLabel,
      ['aria-labelledby']: ariaLabelledby,
      fill,
      role = 'img',
      ...props
    }: ${componentName}Props) => {
      const titleId = useIdAllocator({ prefix: 'icon-title' });
      const fillStyle = css\`
        color: \${fill};
      \`;

      const noFlexShrink = css\`
        flex-shrink: 0;
      \`;

      const accessibleProps = generateAccessibleProps(role, '${componentName}', { title, titleId, ['aria-label']: ariaLabel, ['aria-labelledby']: ariaLabelledby })

      return %%jsx%%;
    }

    ${componentName}.displayName = '${componentName}';

    ${componentName}.isGlyph = true;

    %%exports%%
  `)({
    imports: imports,
    jsx: jsx,
    exports: exports,
  });
}
