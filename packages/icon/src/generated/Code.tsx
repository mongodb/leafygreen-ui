/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild.ts
* @checksum 35e9ca079f04028327b07fb1537bfa80
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface CodeProps extends LGGlyph.ComponentProps {}
const Code = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: CodeProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Code', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M6.10919 13.2623C6.05677 13.5335 6.23405 13.7959 6.50517 13.8484L7.24153 13.9908C7.51265 14.0433 7.77494 13.8659 7.82736 13.5946L9.92574 2.73775C9.97817 2.4665 9.80088 2.20409 9.52976 2.15164L8.7934 2.00919C8.52228 1.95674 8.25999 2.13411 8.20757 2.40536L6.10919 13.2623Z" fill={'currentColor'} /><path d="M1.35982 7.24558L3.97571 5.11122C4.18784 4.93814 4.50313 4.9662 4.67991 5.17391L5.32009 5.92607C5.49687 6.13378 5.46821 6.44247 5.25607 6.61556L3.56205 7.99774L5.25607 9.37993C5.46821 9.55302 5.49687 9.86171 5.32009 10.0694L4.67991 10.8216C4.50313 11.0293 4.18784 11.0574 3.97571 10.8843L1.35982 8.74991C1.13182 8.56389 1 8.28832 1 7.99774C1 7.70717 1.13182 7.4316 1.35982 7.24558Z" fill={'currentColor'} /><path d="M14.6362 7.24558L12.0203 5.11122C11.8082 4.93814 11.4929 4.9662 11.3161 5.17391L10.6759 5.92607C10.4991 6.13378 10.5278 6.44247 10.7399 6.61556L12.4339 7.99774L10.7399 9.37993C10.5278 9.55302 10.4991 9.86171 10.6759 10.0694L11.3161 10.8216C11.4929 11.0293 11.8082 11.0574 12.0203 10.8843L14.6362 8.74991C14.8642 8.56389 14.996 8.28832 14.996 7.99774C14.996 7.70717 14.8642 7.4316 14.6362 7.24558Z" fill={'currentColor'} /></svg>;
};
Code.displayName = 'Code';
Code.isGlyph = true;
export default Code;