/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum 9105c932e585d948b3be9537b45867ba
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface FavoriteProps extends LGGlyph.ComponentProps {}
const Favorite = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: FavoriteProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Favorite', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M7.53827 1.55798C7.70907 1.14734 8.2908 1.14734 8.46159 1.55798L9.99868 5.25357C10.0706 5.42669 10.2334 5.54498 10.4203 5.55996L14.41 5.87981C14.8534 5.91535 15.0331 6.46861 14.6954 6.75794L11.6556 9.3618C11.5132 9.48377 11.4511 9.67516 11.4946 9.85754L12.4232 13.7508C12.5264 14.1834 12.0558 14.5253 11.6763 14.2935L8.26056 12.2072C8.10055 12.1095 7.89931 12.1095 7.73931 12.2072L4.32356 14.2935C3.94401 14.5253 3.47339 14.1834 3.57658 13.7508L4.50527 9.85754C4.54877 9.67516 4.48659 9.48377 4.34419 9.3618L1.30446 6.75794C0.96669 6.46861 1.14645 5.91535 1.58978 5.87981L5.57948 5.55996C5.76638 5.54498 5.92918 5.42669 6.00119 5.25357L7.53827 1.55798Z" fill={'currentColor'} /></svg>;
};
Favorite.displayName = 'Favorite';
Favorite.isGlyph = true;
export default Favorite;