/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild.ts
* @checksum 90a04500bb00c935ff9934d6a1ea9d80
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface UploadProps extends LGGlyph.ComponentProps {}
const Upload = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: UploadProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Upload', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M11.2967 11V11.9384C11.525 11.9789 11.7601 12 12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C11.482 4 10.9869 4.09848 10.5326 4.27774C9.67881 2.34714 7.74673 1 5.5 1C2.46243 1 0 3.46243 0 6.5C0 9.53757 2.46243 12 5.5 12C5.59955 12 5.69847 11.9974 5.79672 11.9921V11H5.39404C3.99871 11 3.31387 9.30059 4.31931 8.33311L7.47199 5.29944C8.07212 4.72196 9.02132 4.72196 9.62145 5.29944L12.7741 8.33311C13.7796 9.30059 13.0947 11 11.6994 11H11.2967ZM8.33871 6.20016C8.45486 6.08839 8.63858 6.08839 8.75473 6.20016L11.9074 9.23383C12.102 9.42108 11.9695 9.75 11.6994 9.75H10.0467V13.5C10.0467 14.3284 9.37514 15 8.54672 15C7.71829 15 7.04672 14.3284 7.04672 13.5V9.75H5.39404C5.12398 9.75 4.99143 9.42108 5.18603 9.23383L8.33871 6.20016Z" fill={'currentColor'} /></svg>;
};
Upload.displayName = 'Upload';
Upload.isGlyph = true;
export default Upload;