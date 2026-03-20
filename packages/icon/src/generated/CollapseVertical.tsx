/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum 55b0520dbe25c4bb01628bf6aba3d353
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface CollapseVerticalProps extends LGGlyph.ComponentProps {}
const CollapseVertical = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: CollapseVerticalProps) => {
  const titleId = useIdAllocator({
    prefix: 'icon-title'
  });
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'CollapseVertical', {
    title,
    titleId,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16">{title && <title id={titleId}>{title}</title>}<path d="M11.5306 14.5316C11.6005 14.4619 11.656 14.3791 11.6938 14.288C11.7317 14.1968 11.7512 14.0991 11.7512 14.0004C11.7512 13.9016 11.7317 13.8039 11.6938 13.7127C11.656 13.6216 11.6005 13.5388 11.5306 13.4691L8.5306 10.4691C8.46092 10.3992 8.37813 10.3437 8.28696 10.3059C8.1958 10.268 8.09806 10.2485 7.99935 10.2485C7.90064 10.2485 7.8029 10.268 7.71173 10.3059C7.62057 10.3437 7.53778 10.3992 7.4681 10.4691L4.4681 13.4691C4.3272 13.61 4.24805 13.8011 4.24805 14.0004C4.24805 14.1996 4.3272 14.3907 4.4681 14.5316C4.60899 14.6725 4.80009 14.7517 4.99935 14.7517C5.19861 14.7517 5.3897 14.6725 5.5306 14.5316L7.99997 12.0635L10.4693 14.5335C10.5391 14.6031 10.6219 14.6583 10.7131 14.6958C10.8042 14.7334 10.9018 14.7527 11.0004 14.7525C11.0989 14.7523 11.1965 14.7327 11.2875 14.6948C11.3784 14.6569 11.4611 14.6015 11.5306 14.5316ZM5.5306 1.47013L7.99997 3.9395L10.4693 1.4695C10.6102 1.32861 10.8013 1.24945 11.0006 1.24945C11.1999 1.24945 11.391 1.32861 11.5318 1.4695C11.6727 1.6104 11.7519 1.80149 11.7519 2.00075C11.7519 2.20001 11.6727 2.39111 11.5318 2.532L8.53185 5.532C8.46217 5.60192 8.37937 5.6574 8.28821 5.69525C8.19705 5.73311 8.09931 5.75259 8.0006 5.75259C7.90189 5.75259 7.80415 5.73311 7.71298 5.69525C7.62182 5.6574 7.53903 5.60192 7.46935 5.532L4.46935 2.532C4.32845 2.39111 4.2493 2.20001 4.2493 2.00075C4.2493 1.80149 4.32845 1.6104 4.46935 1.4695C4.61024 1.32861 4.80134 1.24945 5.0006 1.24945C5.19986 1.24945 5.39095 1.32861 5.53185 1.4695L5.5306 1.47013Z" fill="#5C6C75" /></svg>;
};
CollapseVertical.displayName = 'CollapseVertical';
CollapseVertical.isGlyph = true;
export default CollapseVertical;