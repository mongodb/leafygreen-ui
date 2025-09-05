/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum 98b2f66e19898c84f1dce726e066deb6
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ShirtProps extends LGGlyph.ComponentProps {}
const Shirt = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ShirtProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Shirt', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M2.08868 4.24432C2.03629 4.02602 2.13581 3.79957 2.33205 3.69055L5.37504 2C8.00004 4.5 10.625 2 10.625 2L13.668 3.69055C13.8643 3.79957 13.9638 4.02602 13.9114 4.24432L13.388 6.42503C13.3071 6.76224 13.0055 7 12.6587 7H11V12.4271C11 12.7782 10.8017 13.0992 10.4876 13.2562C8.92164 14.0392 7.07844 14.0392 5.5125 13.2562C5.19843 13.0992 5.00004 12.7782 5.00004 12.4271V7H3.34134C2.99455 7 2.69298 6.76224 2.61205 6.42503L2.08868 4.24432Z" fill={'currentColor'} /></svg>;
};
Shirt.displayName = 'Shirt';
Shirt.isGlyph = true;
export default Shirt;