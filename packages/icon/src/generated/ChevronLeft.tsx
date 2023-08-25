/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum f25908e25521f4d52309c7652ca3c22b
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ChevronLeftProps extends LGGlyph.ComponentProps {}
const ChevronLeft = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ChevronLeftProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'ChevronLeft', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M10.7782 1.63604C10.3877 1.24551 9.75449 1.24551 9.36396 1.63604L4.41421 6.58579L3.70711 7.29289C3.31658 7.68342 3.31658 8.31658 3.70711 8.70711L4.41421 9.41421L9.36396 14.364C9.75448 14.7545 10.3876 14.7545 10.7782 14.364L11.4853 13.6569C11.8758 13.2663 11.8758 12.6332 11.4853 12.2426L7.24264 8L11.4853 3.75736C11.8758 3.36684 11.8758 2.73367 11.4853 2.34315L10.7782 1.63604Z" fill={'currentColor'} /></svg>;
};
ChevronLeft.displayName = 'ChevronLeft';
ChevronLeft.isGlyph = true;
ChevronLeft.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default ChevronLeft;