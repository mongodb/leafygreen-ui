/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum 1cf64ec769424352ec14abe7b699c225
*/
import * as React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';

export interface TrashProps extends LGGlyph.ComponentProps {}

const Trash = ({
  className,
  size = 16,
  title,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: TrashProps) => {
  const fillStyle = css`
    color: ${fill};
  `;

  const noFlexShrink = css`
    flex-shrink: 0;
  `;

  const accessibleProps = generateAccessibleProps(role, 'Trash', { 
    title, 
    'aria-label': ariaLabel, 
    'aria-labelledby': ariaLabelledby 
  });

  const svgElement = <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path fillRule="evenodd" clipRule="evenodd" d="M5 2C5 1.44772 5.44772 1 6 1H10C10.5523 1 11 1.44772 11 2H13C13.5523 2 14 2.44772 14 3V4H2V3C2 2.44772 2.44772 2 3 2H5ZM14 5H2L3.67845 13.3922C3.86542 14.3271 4.68625 15 5.63961 15H10.3604C11.3138 15 12.1346 14.3271 12.3216 13.3922L14 5Z" fill="currentColor" /></svg>;

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

Trash.displayName = 'Trash';
Trash.isGlyph = true;

export default Trash;