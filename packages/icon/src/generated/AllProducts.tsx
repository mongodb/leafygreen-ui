/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum dbd199479a1021c896ec23bcdb476edc
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface AllProductsProps extends LGGlyph.ComponentProps {}
const AllProducts = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: AllProductsProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'AllProducts', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M2.5 3.5C2.5 2.94772 2.94772 2.5 3.5 2.5H4.5C5.05228 2.5 5.5 2.94772 5.5 3.5V4.5C5.5 5.05228 5.05228 5.5 4.5 5.5H3.5C2.94772 5.5 2.5 5.05228 2.5 4.5V3.5Z" fill={'currentColor'} /><path d="M6.5 3.5C6.5 2.94772 6.94772 2.5 7.5 2.5H8.5C9.05228 2.5 9.5 2.94772 9.5 3.5V4.5C9.5 5.05228 9.05228 5.5 8.5 5.5H7.5C6.94772 5.5 6.5 5.05228 6.5 4.5V3.5Z" fill={'currentColor'} /><path d="M11.5 2.5C10.9477 2.5 10.5 2.94772 10.5 3.5V4.5C10.5 5.05228 10.9477 5.5 11.5 5.5H12.5C13.0523 5.5 13.5 5.05228 13.5 4.5V3.5C13.5 2.94772 13.0523 2.5 12.5 2.5H11.5Z" fill={'currentColor'} /><path d="M2.5 7.5C2.5 6.94772 2.94772 6.5 3.5 6.5H4.5C5.05228 6.5 5.5 6.94772 5.5 7.5V8.5C5.5 9.05228 5.05228 9.5 4.5 9.5H3.5C2.94772 9.5 2.5 9.05228 2.5 8.5V7.5Z" fill={'currentColor'} /><path d="M7.5 6.5C6.94772 6.5 6.5 6.94772 6.5 7.5V8.5C6.5 9.05228 6.94772 9.5 7.5 9.5H8.5C9.05228 9.5 9.5 9.05228 9.5 8.5V7.5C9.5 6.94772 9.05228 6.5 8.5 6.5H7.5Z" fill={'currentColor'} /><path d="M10.5 7.5C10.5 6.94772 10.9477 6.5 11.5 6.5H12.5C13.0523 6.5 13.5 6.94772 13.5 7.5V8.5C13.5 9.05228 13.0523 9.5 12.5 9.5H11.5C10.9477 9.5 10.5 9.05228 10.5 8.5V7.5Z" fill={'currentColor'} /><path d="M3.5 10.5C2.94772 10.5 2.5 10.9477 2.5 11.5V12.5C2.5 13.0523 2.94772 13.5 3.5 13.5H4.5C5.05228 13.5 5.5 13.0523 5.5 12.5V11.5C5.5 10.9477 5.05228 10.5 4.5 10.5H3.5Z" fill={'currentColor'} /><path d="M6.5 11.5C6.5 10.9477 6.94772 10.5 7.5 10.5H8.5C9.05228 10.5 9.5 10.9477 9.5 11.5V12.5C9.5 13.0523 9.05228 13.5 8.5 13.5H7.5C6.94772 13.5 6.5 13.0523 6.5 12.5V11.5Z" fill={'currentColor'} /><path d="M11.5 10.5C10.9477 10.5 10.5 10.9477 10.5 11.5V12.5C10.5 13.0523 10.9477 13.5 11.5 13.5H12.5C13.0523 13.5 13.5 13.0523 13.5 12.5V11.5C13.5 10.9477 13.0523 10.5 12.5 10.5H11.5Z" fill={'currentColor'} /></svg>;
};
AllProducts.displayName = 'AllProducts';
AllProducts.isGlyph = true;
AllProducts.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default AllProducts;