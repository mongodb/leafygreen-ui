/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 8ef40ece7aa106122681ca83d78697a5
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ChevronDownProps extends LGGlyph.ComponentProps {}
const ChevronDown = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ChevronDownProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'ChevronDown', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M1.63604 5.36396C1.24551 5.75449 1.24551 6.38765 1.63604 6.77817L6.58579 11.7279L7.29289 12.435C7.68342 12.8256 8.31658 12.8256 8.70711 12.435L9.41421 11.7279L14.364 6.77817C14.7545 6.38765 14.7545 5.75449 14.364 5.36396L13.6569 4.65685C13.2663 4.26633 12.6332 4.26633 12.2426 4.65685L8 8.89949L3.75736 4.65685C3.36684 4.26633 2.73367 4.26633 2.34315 4.65685L1.63604 5.36396Z" fill={'currentColor'} /></svg>;
};
ChevronDown.displayName = 'ChevronDown';
ChevronDown.isGlyph = true;
ChevronDown.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default ChevronDown;