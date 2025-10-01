/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum 68db315fd321a9e6b8b1f9e8f59d3d5c
*/
import * as React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';

export interface MinusProps extends LGGlyph.ComponentProps {}

const Minus = ({
  className,
  size = 16,
  title,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: MinusProps) => {
  const fillStyle = css`
    color: ${fill};
  `;

  const noFlexShrink = css`
    flex-shrink: 0;
  `;

  const accessibleProps = generateAccessibleProps(role, 'Minus', { 
    title, 
    'aria-label': ariaLabel, 
    'aria-labelledby': ariaLabelledby 
  });

  const svgElement = <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M3 6.5C2.44772 6.5 2 6.94772 2 7.5V8.5C2 9.05229 2.44772 9.5 3 9.5C9.04335 9.5 7.79133 9.5 13 9.5C13.5523 9.5 14 9.05228 14 8.5V7.5C14 6.94772 13.5523 6.5 13 6.5C7.79133 6.5 9.04335 6.5 3 6.5Z" fill="currentColor" /></svg>;

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

Minus.displayName = 'Minus';
Minus.isGlyph = true;

export default Minus;