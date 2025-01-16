/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/prebuild.ts
* @checksum 4da7a73bc2c23fbbff62c602848078be
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface HashProps extends LGGlyph.ComponentProps {}
const Hash = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: HashProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Hash', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M10.6161 1.5C10.3734 1.5 10.1658 1.67422 10.1237 1.91318L9.66753 4.5H7.19838L7.62389 2.08683C7.67787 1.78068 7.44236 1.5 7.13149 1.5H6.11606C5.87341 1.5 5.66579 1.67422 5.62366 1.91318L5.16753 4.5H2C1.72386 4.5 1.5 4.72386 1.5 5V6C1.5 6.27614 1.72386 6.5 2 6.5H4.81488L4.28589 9.5H2C1.72386 9.5 1.5 9.72386 1.5 10V11C1.5 11.2761 1.72386 11.5 2 11.5H3.93324L3.50773 13.9132C3.45375 14.2193 3.68926 14.5 4.00014 14.5H5.01556C5.25821 14.5 5.46583 14.3258 5.50797 14.0868L5.96409 11.5H8.43324L8.00773 13.9132C7.95375 14.2193 8.18926 14.5 8.50014 14.5H9.51556C9.75821 14.5 9.96583 14.3258 10.008 14.0868L10.4641 11.5H13.5C13.7761 11.5 14 11.2761 14 11V10C14 9.72386 13.7761 9.5 13.5 9.5H10.8167L11.3457 6.5H13.5C13.7761 6.5 14 6.27614 14 6V5C14 4.72386 13.7761 4.5 13.5 4.5H11.6984L12.1239 2.08683C12.1779 1.78068 11.9424 1.5 11.6315 1.5H10.6161ZM6.31675 9.5H8.78589L9.31488 6.5H6.84573L6.31675 9.5Z" fill={'currentColor'} /></svg>;
};
Hash.displayName = 'Hash';
Hash.isGlyph = true;
export default Hash;