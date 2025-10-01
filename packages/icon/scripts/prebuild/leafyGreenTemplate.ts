/**
 * LeafyGreen template transformation for SVGR-generated components
 * This replaces the previous inline regex with a more maintainable template approach
 */

export function applyLeafyGreenTemplate(
  svgrOutput: string,
  componentName: string,
): string {
  // This pattern matches the standard SVGR TypeScript output structure
  const svgrPattern =
    /import \* as React from "react";\nimport type \{ SVGProps \} from "react";\nconst (\w+) = \(props: SVGProps<SVGSVGElement>\) => (.*?);\nexport default \1;/s;

  const leafyGreenTemplate = `import * as React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';

export interface $1Props extends LGGlyph.ComponentProps {}

const $1 = ({
  className,
  size = 16,
  title,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: $1Props) => {
  const fillStyle = css\`
    color: \${fill};
  \`;

  const noFlexShrink = css\`
    flex-shrink: 0;
  \`;

  const accessibleProps = generateAccessibleProps(role, '${componentName}', { 
    title, 
    'aria-label': ariaLabel, 
    'aria-labelledby': ariaLabelledby 
  });

  const svgElement = $2;

  return React.cloneElement(svgElement, {
    className: cx(
      {
        [fillStyle]: fill != null,
      },
      noFlexShrink,
      className,
    ),
    height: typeof size === 'number' ? size : sizeMap[size],
    width: typeof size === 'number' ? size : sizeMap[size],
    role,
    ...accessibleProps,
    ...props,
  });
};

$1.displayName = '${componentName}';
$1.isGlyph = true;

export default $1;`;

  return svgrOutput.replace(svgrPattern, leafyGreenTemplate);
}
