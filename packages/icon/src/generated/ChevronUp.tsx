/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum c2e9544b35690bffab1838d83caa496d
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ChevronUpProps extends LGGlyph.ComponentProps {}
const ChevronUp = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ChevronUpProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'ChevronUp', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M14.364 10.7782C14.7545 10.3877 14.7545 9.75449 14.364 9.36396L9.41421 4.41421L8.70711 3.70711C8.31658 3.31658 7.68342 3.31658 7.29289 3.70711L6.58579 4.41421L1.63604 9.36396C1.24552 9.75448 1.24551 10.3876 1.63604 10.7782L2.34315 11.4853C2.73367 11.8758 3.36684 11.8758 3.75736 11.4853L8 7.24264L12.2426 11.4853C12.6332 11.8758 13.2663 11.8758 13.6569 11.4853L14.364 10.7782Z" fill={'currentColor'} /></svg>;
};
ChevronUp.displayName = 'ChevronUp';
ChevronUp.isGlyph = true;
export default ChevronUp;