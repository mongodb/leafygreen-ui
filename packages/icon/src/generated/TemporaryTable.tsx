/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum 165f652d98c2d6a4c0b7bdbadf0a7e1e
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface TemporaryTableProps extends LGGlyph.ComponentProps {}
const TemporaryTable = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: TemporaryTableProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'TemporaryTable', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M2.25 2C1.55965 2 1 2.55963 1 3.25V12.75C1 13.4404 1.55965 14 2.25 14H8.62012L8.62 8.62L15 8.62012V3.25C15 2.55963 14.4404 2 13.75 2H2.25ZM3 4V7.37H7.37V4H3ZM3 12V8.62H7.37V12H3ZM13 4V7.37H8.62V4H13Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M13 16C14.6569 16 16 14.6569 16 13C16 11.3431 14.6569 10 13 10C11.3431 10 10 11.3431 10 13C10 14.6569 11.3431 16 13 16ZM12.625 11.375C12.625 11.1679 12.7929 11 13 11C13.2071 11 13.375 11.1679 13.375 11.375V12.9548L14.2469 13.7178C14.4028 13.8542 14.4186 14.0911 14.2822 14.2469C14.1458 14.4028 13.9089 14.4186 13.7531 14.2822L12.7553 13.4092C12.7507 13.4052 12.7462 13.4011 12.7418 13.397C12.7069 13.3639 12.6798 13.3256 12.6604 13.2843C12.6377 13.236 12.625 13.182 12.625 13.125V11.375Z" fill={'currentColor'} /></svg>;
};
TemporaryTable.displayName = 'TemporaryTable';
TemporaryTable.isGlyph = true;
export default TemporaryTable;