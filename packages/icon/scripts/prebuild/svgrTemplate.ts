import { types as t } from '@babel/core';

interface TemplateVariables {
  jsx: any;
  componentName: string;
  imports: any;
  exports: any;
  interfaces?: any;
  props?: any;
}

interface TemplateOptions {
  tpl: any;
}

export function svgrTemplate(
  variables: TemplateVariables,
  { tpl }: TemplateOptions,
) {
  const { jsx, componentName, imports, exports } = variables;
  
  // Configure tpl to parse TypeScript
  const typeScriptTpl = tpl.smart({ plugins: ['jsx', 'typescript'] });

  // Modify JSX attributes
  const customAttributes = [
    t.jsxAttribute(
      t.jsxIdentifier('className'),
      t.jsxExpressionContainer(
        t.callExpression(t.identifier('cx'), [
          t.objectExpression([
            t.objectProperty(
              t.memberExpression(t.identifier('fillStyle'), t.identifier('fillStyle')),
              t.binaryExpression('!=', t.identifier('fill'), t.nullLiteral()),
              true,
            ),
          ]),
          t.identifier('noFlexShrink'),
          t.identifier('className'),
        ]),
      ),
    ),
    t.jsxAttribute(
      t.jsxIdentifier('height'),
      t.jsxExpressionContainer(
        t.conditionalExpression(
          t.binaryExpression('===', t.unaryExpression('typeof', t.identifier('size')), t.stringLiteral('number')),
          t.identifier('size'),
          t.memberExpression(t.identifier('sizeMap'), t.identifier('size'), true),
        ),
      ),
    ),
    t.jsxAttribute(
      t.jsxIdentifier('width'),
      t.jsxExpressionContainer(
        t.conditionalExpression(
          t.binaryExpression('===', t.unaryExpression('typeof', t.identifier('size')), t.stringLiteral('number')),
          t.identifier('size'),
          t.memberExpression(t.identifier('sizeMap'), t.identifier('size'), true),
        ),
      ),
    ),
    t.jsxAttribute(t.jsxIdentifier('role'), t.jsxExpressionContainer(t.identifier('role'))),
    t.jsxSpreadAttribute(t.identifier('accessibleProps')),
    t.jsxSpreadAttribute(t.identifier('props')),
  ];

  // Augment the `<svg attributes />` so we can customize it with the values above.
  jsx.openingElement.attributes = customAttributes.concat(
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

  return typeScriptTpl`
${imports}
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

  return ${jsx};
}

${componentName}.displayName = '${componentName}';

${componentName}.isGlyph = true;

${exports}
`;
}
