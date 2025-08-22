/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum d3dfc73fcba6353e4165872bf932e814
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface AwardProps extends LGGlyph.ComponentProps {}
const Award = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: AwardProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Award', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M9.83154 5.62631C9.89369 5.46943 10.1063 5.46943 10.1685 5.62631L10.7275 7.03832C10.7537 7.10427 10.8124 7.14988 10.8801 7.15578L12.3328 7.27814C12.4937 7.29209 12.5592 7.50296 12.4365 7.6134L11.3306 8.60818C11.2788 8.65477 11.2561 8.72815 11.272 8.79783L11.6089 10.2845C11.6464 10.4496 11.4759 10.5806 11.3379 10.4925L10.0952 9.69472C10.037 9.65739 9.963 9.65739 9.90479 9.69472L8.66211 10.4925C8.52407 10.5806 8.3536 10.4496 8.39111 10.2845L8.72803 8.79783C8.74385 8.72815 8.72125 8.65477 8.66943 8.60818L7.56348 7.6134C7.44077 7.50296 7.50628 7.29207 7.66724 7.27814L9.11987 7.15578C9.18764 7.14987 9.24632 7.10426 9.27246 7.03832L9.83154 5.62631Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M10 1.75C13.4518 1.75 16.25 4.55482 16.25 8.01474C16.25 9.42516 15.7847 10.7265 15 11.7736V16.9971C15 17.689 14.4404 18.25 13.75 18.25H13.7158C13.5031 18.25 13.2938 18.1958 13.1079 18.0922L10 16.3571L6.89209 18.0922C6.70623 18.1958 6.49687 18.25 6.28418 18.25H6.25C5.55964 18.25 5 17.689 5 16.9971V11.7736C4.21529 10.7265 3.75 9.42516 3.75 8.01474C3.75 4.55482 6.54822 1.75 10 1.75ZM13.75 13.0253C12.7053 13.8121 11.4074 14.2795 10 14.2795C8.59263 14.2795 7.29471 13.8121 6.25 13.0253V16.9971H6.28418L9.39209 15.262C9.76999 15.0513 10.23 15.0513 10.6079 15.262L13.7158 16.9971H13.75V13.0253ZM10 3.00295C7.23858 3.00295 5 5.2468 5 8.01474C5 10.7827 7.23858 13.0265 10 13.0265C12.7614 13.0265 15 10.7827 15 8.01474C15 5.2468 12.7614 3.00295 10 3.00295Z" fill={'currentColor'} /></svg>;
};
Award.displayName = 'Award';
Award.isGlyph = true;
export default Award;