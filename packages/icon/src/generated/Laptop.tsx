/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum acd2affa93ec4739b2f9d4b61738aff2
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface LaptopProps extends LGGlyph.ComponentProps {}
const Laptop = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: LaptopProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Laptop', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M5 6C5 5.72386 5.22386 5.5 5.5 5.5H10.5C10.7761 5.5 11 5.72386 11 6C11 6.27614 10.7761 6.5 10.5 6.5H5.5C5.22386 6.5 5 6.27614 5 6Z" fill={'currentColor'} /><path d="M5.5 7.5C5.22386 7.5 5 7.72386 5 8C5 8.27614 5.22386 8.5 5.5 8.5H8.5C8.77614 8.5 9 8.27614 9 8C9 7.72386 8.77614 7.5 8.5 7.5H5.5Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M3 2.5C2.44772 2.5 2 2.94772 2 3.5V11.313L1.7092 11.8035C1.68453 11.8351 1.66251 11.869 1.64218 11.9037L1 13C1 13.5523 1.44772 14 2 14L14 14C14.5523 14 15 13.5523 15 13L14.3578 11.9037C14.3375 11.869 14.3155 11.8351 14.2908 11.8035L14 11.313V3.5C14 2.94772 13.5523 2.5 13 2.5H3ZM12.5 4H3.5V10.5H12.5V4Z" fill={'currentColor'} /></svg>;
};
Laptop.displayName = 'Laptop';
Laptop.isGlyph = true;
Laptop.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Laptop;