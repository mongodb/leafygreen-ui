/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum f68d0b129fd0bd5d0c4220e1494726ca
*/
import * as React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';

export interface MegaphoneProps extends LGGlyph.ComponentProps {}

const Megaphone = ({
  className,
  size = 16,
  title,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: MegaphoneProps) => {
  const fillStyle = css`
    color: ${fill};
  `;

  const noFlexShrink = css`
    flex-shrink: 0;
  `;

  const accessibleProps = generateAccessibleProps(role, 'Megaphone', { 
    title, 
    'aria-label': ariaLabel, 
    'aria-labelledby': ariaLabelledby 
  });

  const svgElement = <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path fillRule="evenodd" clipRule="evenodd" d="M6 3L11.7253 1.3642C12.3641 1.18168 13 1.66135 13 2.32573V4.26756V7.73243V9.67427C13 10.3386 12.3641 10.8183 11.7253 10.6358L6 9H3C1.89543 9 1 8.10457 1 7V5C1 3.89543 1.89543 3 3 3H6ZM5.34325 10H3V15H5.97958C6.69851 15 7.18255 14.2641 6.8978 13.6039L5.34325 10ZM16 6C16 7.10457 15.1046 8 14 8V4C15.1046 4 16 4.89543 16 6Z" fill="currentColor" /></svg>;

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

Megaphone.displayName = 'Megaphone';
Megaphone.isGlyph = true;

export default Megaphone;