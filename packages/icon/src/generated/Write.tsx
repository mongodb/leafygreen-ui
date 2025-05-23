/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild.ts
* @checksum 4777858d44429b9d10b4147c593854f0
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface WriteProps extends LGGlyph.ComponentProps {}
const Write = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: WriteProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Write', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M8.71094 3.74943C7.98779 3.5624 7.17765 3.47059 6.375 3.47059C3.97108 3.47059 1.5 4.29411 1.5 6.03268C1.5 6.10964 1.50071 6.18476 1.50212 6.25809C1.50071 6.28953 1.5 6.32115 1.5 6.35294V6.55882C1.5 6.82855 1.62059 7.08757 1.88365 7.34157C2.15143 7.60013 2.54848 7.83326 3.04084 8.02823C4.02449 8.41774 5.29298 8.61764 6.375 8.61764C6.64212 8.61764 6.9206 8.60546 7.20335 8.58125C6.75934 8.06173 6.67036 7.35853 6.91542 6.76298C7.19331 6.08765 7.8543 5.63811 8.62053 5.63811H8.71094V3.74943Z" fill={'currentColor'} /><path d="M8.06766 9.30516C7.49049 9.39617 6.91039 9.44117 6.375 9.44117C5.21336 9.44117 3.84123 9.22931 2.74517 8.7953C2.2802 8.61117 1.84763 8.38033 1.5 8.09498V9.85294C1.5 10.1227 1.62059 10.3817 1.88365 10.6357C2.15143 10.8943 2.54848 11.1274 3.04084 11.3223C4.02449 11.7119 5.29298 11.9118 6.375 11.9118C7.45702 11.9118 8.72551 11.7119 9.70916 11.3223C9.92835 11.2356 10.1286 11.1412 10.3071 11.0404C10.2351 10.9984 10.1654 10.9511 10.0985 10.8987L8.06766 9.30516Z" fill={'currentColor'} /><path d="M11.25 11.3891C10.9024 11.6745 10.4698 11.9053 10.0048 12.0894C8.90877 12.5234 7.53664 12.7353 6.375 12.7353C5.21336 12.7353 3.84123 12.5234 2.74517 12.0894C2.2802 11.9053 1.84763 11.6745 1.5 11.3891V12.1177C1.5 12.1458 1.50056 12.1738 1.50166 12.2017C1.50056 12.2794 1.5 12.3581 1.5 12.4379C1.5 14.1765 3.97108 15 6.375 15C8.77892 15 11.25 14.1765 11.25 12.4379C11.25 12.3616 11.2493 12.2862 11.2479 12.2117C11.2493 12.1805 11.25 12.1492 11.25 12.1177V11.3891Z" fill={'currentColor'} /><path d="M12.4886 2.29681V6.87341H13.8795C14.4529 6.87341 14.7183 7.51856 14.2849 7.85866L11.6554 9.92188C11.4227 10.1045 11.0773 10.1045 10.8446 9.92188L8.21511 7.85866C7.78167 7.51856 8.04714 6.87341 8.62053 6.87341H9.92969V2.29681C9.92969 1.5806 10.5025 1 11.2091 1C11.9157 1 12.4886 1.5806 12.4886 2.29681Z" fill={'currentColor'} /></svg>;
};
Write.displayName = 'Write';
Write.isGlyph = true;
export default Write;