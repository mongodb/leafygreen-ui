/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum f435497e885cdb96397ef4c90c4f101c
*/
import * as React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';

export interface CaretLeftProps extends LGGlyph.ComponentProps {}

const CaretLeft = ({
  className,
  size = 16,
  title,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: CaretLeftProps) => {
  const fillStyle = css`
    color: ${fill};
  `;

  const noFlexShrink = css`
    flex-shrink: 0;
  `;

  const accessibleProps = generateAccessibleProps(role, 'CaretLeft', { 
    title, 
    'aria-label': ariaLabel, 
    'aria-labelledby': ariaLabelledby 
  });

  const svgElement = <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M5.20381 8.67903C4.93207 8.45271 4.93207 8.04729 5.20381 7.82097L9.02351 4.63963C9.40572 4.3213 10 4.5824 10 5.06866L10 11.4313C10 11.9176 9.40572 12.1787 9.02351 11.8604L5.20381 8.67903Z" fill="currentColor" /></svg>;

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

CaretLeft.displayName = 'CaretLeft';
CaretLeft.isGlyph = true;

export default CaretLeft;