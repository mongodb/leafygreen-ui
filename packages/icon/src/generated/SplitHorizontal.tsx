/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum c9945622c9783716fe99eb60f0a8fcad
*/
import * as React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';

export interface SplitHorizontalProps extends LGGlyph.ComponentProps {}

const SplitHorizontal = ({
  className,
  size = 16,
  title,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: SplitHorizontalProps) => {
  const fillStyle = css`
    color: ${fill};
  `;

  const noFlexShrink = css`
    flex-shrink: 0;
  `;

  const accessibleProps = generateAccessibleProps(role, 'SplitHorizontal', { 
    title, 
    'aria-label': ariaLabel, 
    'aria-labelledby': ariaLabelledby 
  });

  const svgElement = <svg width={16} height={14} viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path fillRule="evenodd" clipRule="evenodd" d="M15 11C15 12.1046 14.1046 13 13 13L3 13C1.89543 13 1 12.1046 1 11L1 3C1 1.89543 1.89543 1 3 1L13 1C14.1046 1 15 1.89543 15 3L15 11ZM13 6.5L13 3L3 3L3 6.5L13 6.5ZM3 7.5L3 11L13 11L13 7.5L3 7.5Z" fill="currentColor" /></svg>;

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

SplitHorizontal.displayName = 'SplitHorizontal';
SplitHorizontal.isGlyph = true;

export default SplitHorizontal;