/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 526839b68ab08786747a7e8c03d455e6
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface LogInProps extends LGGlyph.ComponentProps {}
const LogIn = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: LogInProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'LogIn', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M15 13C15 13.5523 14.5523 14 14 14H9.75C9.33579 14 9 13.6642 9 13.25V12.75C9 12.3358 9.33579 12 9.75 12H13V4H9.75C9.33579 4 9 3.66421 9 3.25V2.75C9 2.33579 9.33579 2 9.75 2H14C14.5523 2 15 2.44771 15 3V13Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M6.5052 11.8839L9.70711 8.68198C10.0976 8.29146 10.0976 7.65829 9.70711 7.26777L6.50521 4.06586C6.21231 3.77297 5.73744 3.77297 5.44454 4.06586L5.09099 4.41942C4.7981 4.71231 4.7981 5.18718 5.09099 5.48008L6.61091 7L1.75 7C1.33579 7 1 7.33579 1 7.75V8.25C1 8.66422 1.33579 9 1.75 9L6.56066 9L5.09099 10.4697C4.7981 10.7626 4.7981 11.2374 5.09099 11.5303L5.44454 11.8839C5.73744 12.1768 6.21231 12.1768 6.5052 11.8839Z" fill={'currentColor'} /></svg>;
};
LogIn.displayName = 'LogIn';
LogIn.isGlyph = true;
LogIn.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default LogIn;