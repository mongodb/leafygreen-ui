/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild.ts
* @checksum 186fa37b69c086189c5979e33df71b33
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface InternalEmployeeProps extends LGGlyph.ComponentProps {}
const InternalEmployee = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: InternalEmployeeProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'InternalEmployee', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M6.5 8C8.433 8 10 6.433 10 4.5C10 2.567 8.433 1 6.5 1C4.567 1 3 2.567 3 4.5C3 6.433 4.567 8 6.5 8Z" fill={'currentColor'} /><path d="M4.34253 8.45005C3.92858 8.22348 3.39921 8.20507 3.091 8.56241C2.41111 9.3507 2 10.3773 2 11.5V14H10.7741C10.773 13.9828 10.7719 13.9659 10.7709 13.9492L10.7409 13.9282C10.7409 13.9282 7.90706 11.7149 9.47051 8.30648C9.20774 8.25062 8.91096 8.31131 8.65747 8.45005C8.01691 8.80067 7.28173 9 6.5 9C5.71827 9 4.98309 8.80067 4.34253 8.45005Z" fill={'currentColor'} /><path d="M12.7456 7.0035C12.3863 6.55517 12.0736 6.09982 12.0104 6.00525C12.0037 5.99825 11.9938 5.99825 11.9871 6.00525C11.9239 6.09982 11.6145 6.55517 11.2552 7.0035C8.17113 11.1401 11.7409 13.9282 11.7409 13.9282L11.7709 13.9492C11.7975 14.38 11.864 15 11.864 15H12.1302C12.1302 15 12.1967 14.3835 12.2233 13.9492L12.2533 13.9247C12.2566 13.9282 15.8297 11.1401 12.7456 7.0035ZM12.0004 13.8687C12.0004 13.8687 11.8407 13.725 11.7975 13.6515V13.6445L11.9904 9.1401C11.9904 9.12609 12.0104 9.12609 12.0104 9.1401L12.2034 13.6445V13.6515C12.1601 13.725 12.0004 13.8687 12.0004 13.8687Z" fill={'currentColor'} /></svg>;
};
InternalEmployee.displayName = 'InternalEmployee';
InternalEmployee.isGlyph = true;
export default InternalEmployee;