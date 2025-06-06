/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild.ts
* @checksum 5ae4f440da36ea8c0946aa36e0c3479f
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface SaveProps extends LGGlyph.ComponentProps {}
const Save = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: SaveProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Save', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M2 3.6C2 3.03995 2 2.75992 2.10899 2.54601C2.20487 2.35785 2.35785 2.20487 2.54601 2.10899C2.75992 2 3.03995 2 3.6 2H11.3373C11.5818 2 11.7041 2 11.8192 2.02763C11.9213 2.05213 12.0188 2.09253 12.1083 2.14736C12.2092 2.2092 12.2957 2.29568 12.4686 2.46862L13.5314 3.53137C13.7043 3.70432 13.7908 3.7908 13.8526 3.89172C13.9075 3.98119 13.9479 4.07873 13.9724 4.18077C14 4.29586 14 4.41815 14 4.66274V12.4C14 12.9601 14 13.2401 13.891 13.454C13.7951 13.6422 13.6422 13.7951 13.454 13.891C13.2532 13.9933 12.9942 13.9996 12.5 14L12.5 9.28404C12.5 9.15788 12.5 9.03494 12.4915 8.93089C12.4822 8.81659 12.4602 8.68172 12.391 8.54601C12.2951 8.35785 12.1422 8.20487 11.954 8.109C11.8183 8.03985 11.6834 8.01781 11.5691 8.00848C11.465 7.99997 11.3421 7.99999 11.216 8H4.78405C4.65786 7.99999 4.53497 7.99997 4.43089 8.00848C4.31659 8.01781 4.18172 8.03985 4.04601 8.109C3.85785 8.20487 3.70487 8.35785 3.609 8.54601C3.53985 8.68172 3.51781 8.81659 3.50848 8.93089C3.49997 9.03497 3.49999 9.15786 3.5 9.28405L3.5 14C3.00583 13.9996 2.74679 13.9933 2.54601 13.891C2.35785 13.7951 2.20487 13.6422 2.10899 13.454C2 13.2401 2 12.9601 2 12.4V3.6ZM4 3.5C3.72386 3.5 3.5 3.72386 3.5 4V6C3.5 6.27614 3.72386 6.5 4 6.5H9C9.27614 6.5 9.5 6.27614 9.5 6V4C9.5 3.72386 9.27614 3.5 9 3.5H4Z" fill={'currentColor'} /><path d="M11.5 9.3V14H4.5V9.3C4.5 9.15174 4.50039 9.07061 4.50515 9.01232L4.50573 9.00573L4.51232 9.00515C4.57061 9.00039 4.65174 9 4.8 9H11.2C11.3483 9 11.4294 9.00039 11.4877 9.00515L11.4943 9.00573L11.4949 9.01232C11.4996 9.07061 11.5 9.15174 11.5 9.3Z" fill={'currentColor'} /></svg>;
};
Save.displayName = 'Save';
Save.isGlyph = true;
export default Save;