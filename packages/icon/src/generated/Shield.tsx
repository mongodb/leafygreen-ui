/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum 70cc6170af301b7a5ccc2e39f2ae8d34
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ShieldProps extends LGGlyph.ComponentProps {}
const Shield = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ShieldProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Shield', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M8.00001 15.0001C10.7303 14.4227 12.9549 12.3761 13.833 9.63371L13.9712 9.20234L14.6795 4.95897C14.7201 4.71585 14.5772 4.47999 14.3447 4.39817C12.1971 3.64242 10.1477 2.5622 8.28968 1.21369C8.11569 1.08742 7.88082 1.08253 7.70399 1.20478L7.59446 1.2805C5.73823 2.56382 3.73939 3.60897 1.64175 4.39348C1.41552 4.47809 1.27832 4.70976 1.31729 4.94814L2.02886 9.30167L2.14042 9.64296C3.0359 12.3823 5.2671 14.4222 8.00001 15.0001ZM7.99977 12.9449C6.11619 12.4083 4.59951 10.9361 3.9669 9.00085L3.90464 8.8104L3.48073 6.21684C3.4435 5.98905 3.56721 5.76581 3.7786 5.67313C5.13339 5.07913 6.44393 4.38092 7.69919 3.58415C7.86827 3.47682 8.08467 3.47835 8.25243 3.58774C9.50741 4.40603 10.8318 5.11469 12.204 5.7004C12.4189 5.79214 12.5455 6.01806 12.507 6.24855L12.0954 8.7139L12.0027 9.0034C11.3839 10.936 9.87631 12.4092 7.99977 12.9449Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M7.12322 8.87421L9.85084 6.14657C10.0461 5.9513 10.3627 5.9513 10.558 6.14657L10.9115 6.50012C11.1068 6.69538 11.1068 7.01197 10.9115 7.20723L7.37793 10.7408C7.1644 10.9544 6.81177 10.9313 6.62783 10.6918L5.10349 8.70704C4.93529 8.48804 4.97648 8.17415 5.19548 8.00595L5.49289 7.77753C5.76665 7.56728 6.15901 7.61876 6.36926 7.89252L7.12322 8.87421Z" fill={'currentColor'} /></svg>;
};
Shield.displayName = 'Shield';
Shield.isGlyph = true;
export default Shield;