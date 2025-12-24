/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum 154b87ec1a0bc735dce75670de6f86bf
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ExpandVerticalProps extends LGGlyph.ComponentProps {}
const ExpandVertical = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ExpandVerticalProps) => {
  const titleId = useIdAllocator({
    prefix: 'icon-title'
  });
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'ExpandVertical', {
    title,
    titleId,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16">{title && <title id={titleId}>{title}</title>}<path d="M11.5306 10.4694C11.6005 10.5391 11.656 10.6219 11.6938 10.713C11.7317 10.8042 11.7512 10.9019 11.7512 11.0007C11.7512 11.0994 11.7317 11.1971 11.6938 11.2883C11.656 11.3794 11.6005 11.4622 11.5306 11.5319L8.5306 14.5319C8.46092 14.6018 8.37813 14.6573 8.28696 14.6952C8.1958 14.733 8.09806 14.7525 7.99935 14.7525C7.90064 14.7525 7.8029 14.733 7.71173 14.6952C7.62057 14.6573 7.53778 14.6018 7.4681 14.5319L4.4681 11.5319C4.3272 11.391 4.24805 11.1999 4.24805 11.0007C4.24805 10.8014 4.3272 10.6103 4.4681 10.4694C4.60899 10.3285 4.80009 10.2494 4.99935 10.2494C5.19861 10.2494 5.3897 10.3285 5.5306 10.4694L7.99997 12.9375L10.4693 10.4675C10.5391 10.3979 10.6219 10.3428 10.7131 10.3052C10.8042 10.2676 10.9018 10.2483 11.0004 10.2485C11.0989 10.2487 11.1965 10.2683 11.2875 10.3062C11.3784 10.3441 11.4611 10.3996 11.5306 10.4694ZM5.5306 5.53191L7.99997 3.06253L10.4693 5.53253C10.6102 5.67343 10.8013 5.75258 11.0006 5.75258C11.1999 5.75258 11.391 5.67343 11.5318 5.53253C11.6727 5.39164 11.7519 5.20054 11.7519 5.00128C11.7519 4.80203 11.6727 4.61093 11.5318 4.47003L8.53185 1.47003C8.46217 1.40011 8.37938 1.34464 8.28821 1.30678C8.19705 1.26893 8.09931 1.24944 8.0006 1.24944C7.90189 1.24944 7.80415 1.26893 7.71298 1.30678C7.62182 1.34464 7.53903 1.40011 7.46935 1.47003L4.46935 4.47003C4.32845 4.61093 4.2493 4.80203 4.2493 5.00128C4.2493 5.20054 4.32845 5.39164 4.46935 5.53253C4.61024 5.67343 4.80134 5.75258 5.0006 5.75258C5.19986 5.75258 5.39095 5.67343 5.53185 5.53253L5.5306 5.53191Z" fill="#5C6C75" /></svg>;
};
ExpandVertical.displayName = 'ExpandVertical';
ExpandVertical.isGlyph = true;
export default ExpandVertical;