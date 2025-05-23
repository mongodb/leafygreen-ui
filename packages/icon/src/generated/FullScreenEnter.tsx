/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild.ts
* @checksum 22ced086978c06ca91f6fbe8f8adc58d
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface FullScreenEnterProps extends LGGlyph.ComponentProps {}
const FullScreenEnter = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: FullScreenEnterProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'FullScreenEnter', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M1.5 2C1.22386 2 1 2.22386 1 2.5V6.5C1 6.77614 1.22386 7 1.5 7H2.5C2.77614 7 3 6.77614 3 6.5V4.5C3 4.22386 3.22386 4 3.5 4H5.5C5.77614 4 6 3.77614 6 3.5V2.5C6 2.22386 5.77614 2 5.5 2H1.5Z" fill={'currentColor'} /><path d="M15 2.5C15 2.22386 14.7761 2 14.5 2H10.5C10.2239 2 10 2.22386 10 2.5V3.5C10 3.77614 10.2239 4 10.5 4L12.5 4C12.7761 4 13 4.22386 13 4.5V6.5C13 6.77614 13.2239 7 13.5 7H14.5C14.7761 7 15 6.77614 15 6.5V2.5Z" fill={'currentColor'} /><path d="M1.5 14C1.22386 14 1 13.7761 1 13.5V9.5C1 9.22386 1.22386 9 1.5 9H2.5C2.77614 9 3 9.22386 3 9.5L3 11.5C3 11.7761 3.22386 12 3.5 12H5.5C5.77614 12 6 12.2239 6 12.5V13.5C6 13.7761 5.77614 14 5.5 14H1.5Z" fill={'currentColor'} /><path d="M14.5 14C14.7761 14 15 13.7761 15 13.5V9.5C15 9.22386 14.7761 9 14.5 9H13.5C13.2239 9 13 9.22386 13 9.5V11.5C13 11.7761 12.7761 12 12.5 12H10.5C10.2239 12 10 12.2239 10 12.5V13.5C10 13.7761 10.2239 14 10.5 14H14.5Z" fill={'currentColor'} /></svg>;
};
FullScreenEnter.displayName = 'FullScreenEnter';
FullScreenEnter.isGlyph = true;
export default FullScreenEnter;