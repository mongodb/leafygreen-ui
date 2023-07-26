/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 225d1092e52f90b0958f693a393e14eb
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface SweepProps extends LGGlyph.ComponentProps {}
const Sweep = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: SweepProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Sweep', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M2.99968 14.4647L4.00129 12.7336C4.29347 12.9026 4.63232 13 5 13H7V15H5C4.27129 15 3.5881 14.8051 2.99968 14.4647ZM9 15V13H11C11.3677 13 11.7065 12.9026 11.9987 12.7336L13.0003 14.4647C12.4119 14.8051 11.7287 15 11 15H9ZM15 7H13V5C13 4.63233 12.9026 4.29347 12.7336 4.00129L14.4647 2.99968C14.8051 3.5881 15 4.27129 15 5V7ZM7 1H5C4.27129 1 3.5881 1.19486 2.99968 1.53531L4.00129 3.26643C4.29347 3.09738 4.63233 3 5 3H7V1ZM1 9H3V11C3 11.3677 3.09738 11.7065 3.26643 11.9987L1.53531 13.0003C1.19486 12.4119 1 11.7287 1 11V9ZM1 7H3V5C3 4.63232 3.09738 4.29347 3.26643 4.00129L1.53531 2.99968C1.19486 3.5881 1 4.27129 1 5V7ZM9 1V3H11C11.3677 3 11.7065 3.09738 11.9987 3.26643L13.0003 1.53531C12.4119 1.19486 11.7287 1 11 1H9ZM15 9H13V11C13 11.3677 12.9026 11.7065 12.7336 11.9987L14.4647 13.0003C14.8051 12.4119 15 11.7287 15 11V9Z" fill={'currentColor'} /></svg>;
};
Sweep.displayName = 'Sweep';
Sweep.isGlyph = true;
Sweep.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Sweep;