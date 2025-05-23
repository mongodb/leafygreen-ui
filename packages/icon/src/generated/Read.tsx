/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild.ts
* @checksum 741d62d1e884e41bb1167f4aeb1e066d
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ReadProps extends LGGlyph.ComponentProps {}
const Read = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ReadProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Read', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M10.0114 8.76202L10.0114 4.18542H8.62052C8.04714 4.18542 7.78167 3.54027 8.21511 3.20017L10.8446 1.13695C11.0773 0.95435 11.4227 0.954351 11.6554 1.13695L14.2849 3.20017C14.7183 3.54027 14.4529 4.18542 13.8795 4.18542H12.5703L12.5703 8.76202C12.5703 9.47823 11.9975 10.0588 11.2909 10.0588C10.5843 10.0588 10.0114 9.47823 10.0114 8.76202Z" fill={'currentColor'} /><path d="M8.82311 9.15837C8.00915 9.34791 7.14575 9.44117 6.375 9.44117C5.21336 9.44117 3.84123 9.22932 2.74517 8.7953C2.2802 8.61118 1.84763 8.38034 1.5 8.09498V9.85294C1.5 10.1227 1.62059 10.3817 1.88365 10.6357C2.15143 10.8943 2.54848 11.1274 3.04084 11.3223C4.02449 11.7119 5.29298 11.9118 6.375 11.9118C7.45702 11.9118 8.72551 11.7119 9.70916 11.3223C9.90824 11.2435 10.0917 11.1584 10.2574 11.068C9.50707 10.722 8.9553 10.0108 8.82311 9.15837Z" fill={'currentColor'} /><path d="M6.7872 3.47867C6.64989 3.47328 6.51234 3.47059 6.375 3.47059C3.97108 3.47059 1.5 4.29411 1.5 6.03268C1.5 6.10964 1.50071 6.18476 1.50212 6.25809C1.50071 6.28953 1.5 6.32115 1.5 6.35294V6.55882C1.5 6.82855 1.62059 7.08757 1.88365 7.34157C2.15143 7.60013 2.54848 7.83327 3.04084 8.02823C4.02449 8.41774 5.29298 8.61764 6.375 8.61764C7.14312 8.61764 8.00522 8.5169 8.79268 8.3191L8.79268 5.42072H8.62052C7.8543 5.42072 7.19331 4.97118 6.91542 4.29584C6.80845 4.03589 6.76513 3.75542 6.7872 3.47867Z" fill={'currentColor'} /><path d="M11.25 11.3891C10.9024 11.6745 10.4698 11.9053 10.0048 12.0894C8.90877 12.5234 7.53664 12.7353 6.375 12.7353C5.21336 12.7353 3.84123 12.5234 2.74517 12.0894C2.2802 11.9053 1.84763 11.6745 1.5 11.3891V12.1177C1.5 12.1458 1.50056 12.1738 1.50166 12.2017C1.50056 12.2794 1.5 12.3581 1.5 12.4379C1.5 14.1765 3.97108 15 6.375 15C8.77892 15 11.25 14.1765 11.25 12.4379C11.25 12.3616 11.2493 12.2862 11.2479 12.2117C11.2493 12.1805 11.25 12.1492 11.25 12.1177V11.3891Z" fill={'currentColor'} /></svg>;
};
Read.displayName = 'Read';
Read.isGlyph = true;
export default Read;