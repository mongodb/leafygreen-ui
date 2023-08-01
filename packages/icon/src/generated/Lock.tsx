/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 24de9c92d356b01af9e3f30abd55fac8
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface LockProps extends LGGlyph.ComponentProps {}
const Lock = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: LockProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Lock', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M4 7V5C4 2.79086 5.79086 1 8 1C10.2091 1 12 2.79086 12 5V7C12.5523 7 13 7.44772 13 8V14C13 14.5523 12.5523 15 12 15H4C3.44772 15 3 14.5523 3 14V8C3 7.44772 3.44772 7 4 7ZM6 5C6 3.89543 6.89543 3 8 3C9.10457 3 10 3.89543 10 5V7H6V5ZM8.58667 10.8099C8.83712 10.6282 9 10.3331 9 10C9 9.44771 8.55228 9 8 9C7.44772 9 7 9.44771 7 10C7 10.3361 7.16577 10.6334 7.42 10.8147V12.6667C7.42 12.9888 7.68117 13.25 8.00333 13.25C8.3255 13.25 8.58667 12.9888 8.58667 12.6667V10.8099Z" fill={'currentColor'} /></svg>;
};
Lock.displayName = 'Lock';
Lock.isGlyph = true;
Lock.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Lock;