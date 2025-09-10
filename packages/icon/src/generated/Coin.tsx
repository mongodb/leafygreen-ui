/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum acc25b6acacb32da914ddd0746bfce3f
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface CoinProps extends LGGlyph.ComponentProps {}
const Coin = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: CoinProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Coin', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M8 1C4.13 1 1 4.13 1 8C1 11.87 4.13 15 8 15C11.87 15 15 11.87 15 8C15 4.13 11.87 1 8 1ZM10.29 10.41C10.2 10.67 10.06 10.87 9.86 11.02C9.66 11.17 9.4 11.27 9.08 11.33C8.82 11.38 8.51 11.41 8.16 11.42L8.06 12.49H6.95L7.05 11.39C7.05 11.39 6.98 11.39 6.94 11.39C6.53 11.36 6.05 11.29 5.52 11.17L5.61 10.08C6 10.08 6.33 10.1 6.62 10.11C6.91 10.11 7.15 10.12 7.36 10.12H7.89C8.15 10.12 8.35 10.1 8.5 10.07C8.65 10.04 8.76 9.97 8.82 9.88C8.88 9.79 8.91 9.65 8.91 9.46C8.91 9.3 8.89 9.17 8.84 9.08C8.8 8.98 8.73 8.9 8.63 8.85C8.54 8.79 8.41 8.74 8.24 8.69L6.87 8.21C6.35 8.02 5.98 7.76 5.76 7.45C5.55 7.14 5.44 6.72 5.44 6.21C5.44 5.81 5.49 5.49 5.58 5.24C5.67 4.99 5.82 4.79 6.02 4.65C6.23 4.51 6.49 4.41 6.81 4.36C7.09 4.31 7.42 4.29 7.79 4.29L7.89 3.38H9L8.89 4.33C8.95 4.33 8.99 4.33 9.05 4.33C9.44 4.36 9.83 4.44 10.2 4.55L10.1 5.56C9.81 5.56 9.47 5.55 9.08 5.54C8.69 5.54 8.31 5.53 7.94 5.53C7.76 5.53 7.61 5.53 7.48 5.55C7.35 5.55 7.25 5.58 7.17 5.63L7 5.82C6.97 5.91 6.95 6.03 6.95 6.18C6.95 6.41 7 6.58 7.11 6.69C7.22 6.8 7.42 6.89 7.69 6.98L8.98 7.41C9.52 7.6 9.9 7.85 10.11 8.17C10.32 8.49 10.43 8.91 10.43 9.43C10.43 9.82 10.38 10.15 10.29 10.41Z" fill={'currentColor'} /></svg>;
};
Coin.displayName = 'Coin';
Coin.isGlyph = true;
export default Coin;