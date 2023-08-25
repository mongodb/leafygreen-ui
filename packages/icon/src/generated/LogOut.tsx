/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 8a87195ab7518d8ce55e786e34ba1bde
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface LogOutProps extends LGGlyph.ComponentProps {}
const LogOut = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: LogOutProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'LogOut', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M1.5 3.00002C1.5 2.44773 1.94557 2.00002 2.49522 2.00002H6.72488C7.13711 2.00002 7.47129 2.3358 7.47129 2.75002V3.25002C7.47129 3.66423 7.13711 4.00002 6.72488 4.00002H3.49043V12H6.72488C7.13711 12 7.47129 12.3358 7.47129 12.75V13.25C7.47129 13.6642 7.13711 14 6.72488 14H2.49522C1.94557 14 1.5 13.5523 1.5 13V3.00002Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M11.0219 11.909L14.2085 8.7071C14.5972 8.31658 14.5972 7.68341 14.2085 7.29289L11.0219 4.09099C10.7304 3.79809 10.2578 3.79809 9.96634 4.09098L9.61448 4.44454C9.32299 4.73743 9.32299 5.2123 9.61448 5.5052L11.1271 7.02512L6.28947 7.02512C5.87724 7.02512 5.54306 7.36091 5.54306 7.77512V8.27512C5.54306 8.68934 5.87724 9.02512 6.28947 9.02512L11.0771 9.02512L9.61448 10.4948C9.32299 10.7877 9.32299 11.2626 9.61448 11.5555L9.96634 11.909C10.2578 12.2019 10.7304 12.2019 11.0219 11.909Z" fill={'currentColor'} /></svg>;
};
LogOut.displayName = 'LogOut';
LogOut.isGlyph = true;
LogOut.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default LogOut;