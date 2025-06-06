/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild.ts
* @checksum 960c232d1d2c55f0d44f2c200567be61
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ShardedClusterProps extends LGGlyph.ComponentProps {}
const ShardedCluster = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ShardedClusterProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'ShardedCluster', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M13 2.75C13 3.7165 12.2165 4.5 11.25 4.5C11.1218 4.5 10.9969 4.48622 10.8766 4.46007L10.2582 5.32584C10.8666 5.84015 11.2971 6.55834 11.4444 7.375H12.6149C12.8665 6.71716 13.5037 6.25 14.25 6.25C15.2165 6.25 16 7.0335 16 8C16 8.9665 15.2165 9.75 14.25 9.75C13.5037 9.75 12.8665 9.28284 12.6149 8.625H11.4444C11.2971 9.44165 10.8666 10.1598 10.2582 10.6741L10.8766 11.5399C10.9969 11.5138 11.1219 11.5 11.25 11.5C12.2165 11.5 13 12.2835 13 13.25C13 14.2165 12.2165 15 11.25 15C10.2835 15 9.5 14.2165 9.5 13.25C9.5 12.8677 9.6226 12.514 9.83062 12.2261L9.1691 11.3C8.8035 11.4295 8.40998 11.5 8 11.5C7.59258 11.5 7.20142 11.4304 6.83777 11.3024L6.17369 12.2321C6.3791 12.5189 6.5 12.8703 6.5 13.25C6.5 14.2165 5.7165 15 4.75 15C3.7835 15 3 14.2165 3 13.25C3 12.2835 3.7835 11.5 4.75 11.5C4.88079 11.5 5.00822 11.5143 5.13082 11.5416L5.74716 10.6787C5.13591 10.1641 4.70329 9.44405 4.55564 8.625H3.38509C3.13349 9.28284 2.4963 9.75 1.75 9.75C0.783502 9.75 0 8.9665 0 8C0 7.0335 0.783502 6.25 1.75 6.25C2.4963 6.25 3.13349 6.71716 3.38509 7.375H4.55564C4.70329 6.55595 5.13591 5.83594 5.74716 5.32133L5.13082 4.45845C5.00822 4.48565 4.88079 4.5 4.75 4.5C3.7835 4.5 3 3.7165 3 2.75C3 1.7835 3.7835 1 4.75 1C5.7165 1 6.5 1.7835 6.5 2.75C6.5 3.12967 6.3791 3.48109 6.17369 3.76788L6.83777 4.69759C7.20142 4.56961 7.59258 4.5 8 4.5C8.40998 4.5 8.80349 4.57049 9.16908 4.70001L9.83061 3.77386C9.62259 3.48598 9.5 3.13231 9.5 2.75C9.5 1.7835 10.2835 1 11.25 1C12.2165 1 13 1.7835 13 2.75ZM9.75 8C9.75 8.9665 8.9665 9.75 8 9.75C7.0335 9.75 6.25 8.9665 6.25 8C6.25 7.0335 7.0335 6.25 8 6.25C8.9665 6.25 9.75 7.0335 9.75 8Z" fill={'currentColor'} /></svg>;
};
ShardedCluster.displayName = 'ShardedCluster';
ShardedCluster.isGlyph = true;
export default ShardedCluster;