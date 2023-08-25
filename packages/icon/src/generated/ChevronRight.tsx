/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 73f42d213a0413474f1b711e3e8d6bd7
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ChevronRightProps extends LGGlyph.ComponentProps {}
const ChevronRight = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ChevronRightProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'ChevronRight', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M5.36396 14.364C5.75449 14.7545 6.38765 14.7545 6.77818 14.364L11.7279 9.41421L12.435 8.70711C12.8256 8.31658 12.8256 7.68342 12.435 7.29289L11.7279 6.58579L6.77817 1.63604C6.38765 1.24552 5.75449 1.24551 5.36396 1.63604L4.65685 2.34315C4.26633 2.73367 4.26633 3.36684 4.65685 3.75736L8.89949 8L4.65685 12.2426C4.26633 12.6332 4.26633 13.2663 4.65686 13.6569L5.36396 14.364Z" fill={'currentColor'} /></svg>;
};
ChevronRight.displayName = 'ChevronRight';
ChevronRight.isGlyph = true;
ChevronRight.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default ChevronRight;