/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild.ts
* @checksum 0b96b9898c39663c4162d5d4e7ba9c17
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface FederationProps extends LGGlyph.ComponentProps {}
const Federation = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: FederationProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Federation', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M9.33297 4.19058C9.33297 4.89542 8.76158 5.4668 8.05674 5.4668C7.3519 5.4668 6.78051 4.89542 6.78051 4.19058C6.78051 3.48574 7.3519 2.91435 8.05674 2.91435C8.76158 2.91435 9.33297 3.48574 9.33297 4.19058ZM9.01391 7.23507C10.3084 6.82851 11.2473 5.61919 11.2473 4.19058C11.2473 2.42848 9.81884 1.00002 8.05674 1.00002C6.29464 1.00002 4.86618 2.42848 4.86618 4.19058C4.86618 5.61919 5.80512 6.82851 7.09957 7.23507L7.09957 8.86181L5.39438 9.8463C5.21435 9.67476 5.01126 9.52169 4.78638 9.39185C3.26036 8.51081 1.30904 9.03366 0.427987 10.5597C-0.453063 12.0857 0.0697915 14.037 1.59581 14.9181C3.12184 15.7991 5.07316 15.2763 5.95421 13.7502C6.35888 13.0493 6.46738 12.2587 6.31853 11.5232L8.05034 10.5234L9.69164 11.471C9.40129 12.7926 9.9793 14.2054 11.2136 14.9181C12.7396 15.7991 14.691 15.2763 15.572 13.7502C16.4531 12.2242 15.9302 10.2729 14.4042 9.39185C13.1641 8.67587 11.6431 8.88702 10.6439 9.81025L9.01391 8.8692V7.23507ZM12.1708 13.2602C11.5604 12.9078 11.3512 12.1273 11.7037 11.5168C12.0561 10.9064 12.8366 10.6973 13.447 11.0497C14.0574 11.4021 14.2666 12.1827 13.9141 12.7931C13.5617 13.4035 12.7812 13.6126 12.1708 13.2602ZM2.08585 11.5168C1.73343 12.1273 1.94257 12.9078 2.55298 13.2602C3.16339 13.6126 3.94392 13.4035 4.29634 12.7931C4.64876 12.1827 4.43962 11.4021 3.82921 11.0497C3.2188 10.6973 2.43827 10.9064 2.08585 11.5168Z" fill={'currentColor'} /></svg>;
};
Federation.displayName = 'Federation';
Federation.isGlyph = true;
export default Federation;