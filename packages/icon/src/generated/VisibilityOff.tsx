/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/prebuild.ts
* @checksum abf59aba81d43135bb276a24a44a9e44
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface VisibilityOffProps extends LGGlyph.ComponentProps {}
const VisibilityOff = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: VisibilityOffProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'VisibilityOff', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M14.6012 1.26611C14.1924 0.894763 13.5467 0.912984 13.1681 1.31501L1.70391 13.4864C1.32524 13.8884 1.35699 14.522 1.76579 14.8934C2.17459 15.2647 2.82027 15.2465 3.19894 14.8445L4.99238 12.9404C5.88019 13.3349 6.88397 13.5871 8 13.5871C11.9337 13.5871 14.4728 10.4542 15.4548 8.99777L15.4984 8.93355C15.7132 8.61809 16 8.19691 16 7.58708C16 6.97724 15.7132 6.55606 15.4984 6.24061L15.4548 6.17639C15.0571 5.58653 14.404 4.72168 13.5062 3.90133L14.6631 2.67309C15.0418 2.27106 15.01 1.63747 14.6012 1.26611ZM11.6703 5.85054L10.9066 6.66133C11.0028 6.9529 11.0548 7.26402 11.0548 7.58708C11.0548 9.24393 9.68713 10.5871 8 10.5871C7.7543 10.5871 7.51537 10.5586 7.28646 10.5048L6.52258 11.3158C6.98061 11.491 7.47888 11.5871 8.00001 11.5871C7.62198 11.5871 7.24379 11.5419 6.86974 11.4611C7.23037 11.5422 7.60736 11.5871 8.00001 11.5871C10.2495 11.5871 12.0731 9.79622 12.0731 7.58708C12.0731 6.96482 11.9284 6.37575 11.6703 5.85054ZM8 1.58708C8.9189 1.58708 9.7617 1.75803 10.5263 2.03863L8.97905 3.68136C8.66462 3.62036 8.33812 3.58708 8.00001 3.58708C5.75051 3.58708 3.92692 5.37794 3.92692 7.58708C3.92692 8.02163 3.99748 8.43999 4.12796 8.83172L2.14338 10.9387C1.42423 10.2238 0.889162 9.50794 0.545171 8.99777L0.501581 8.93355C0.286781 8.61809 0 8.19691 0 7.58708C0 6.97725 0.286783 6.55607 0.501581 6.24061L0.545171 6.17639C1.52716 4.72 4.06625 1.58708 8 1.58708ZM8.00001 3.58708C8.32689 3.58708 8.6539 3.62086 8.97824 3.68222L8.96213 3.69932C8.65365 3.62596 8.33146 3.58708 8.00001 3.58708ZM8 4.58708C8.04143 4.58708 8.08266 4.58789 8.12369 4.58949L4.9663 7.94166C4.95236 7.82537 4.94519 7.70705 4.94519 7.58708C4.94519 5.93022 6.31287 4.58708 8 4.58708Z" fill={'currentColor'} /></svg>;
};
VisibilityOff.displayName = 'VisibilityOff';
VisibilityOff.isGlyph = true;
export default VisibilityOff;