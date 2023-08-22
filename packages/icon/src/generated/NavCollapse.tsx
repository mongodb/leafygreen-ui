/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 2ea5bd5022b3f89ef21314161e9c7bb6
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface NavCollapseProps extends LGGlyph.ComponentProps {}
const NavCollapse = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: NavCollapseProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'NavCollapse', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M7.5 4H6.5C5.39543 4 4.5 4.89543 4.5 6V10C4.5 11.1046 5.39543 12 6.5 12H7.5V4Z" fill={'currentColor'} /><path d="M8.21716 8.28284C8.06095 8.12663 8.06095 7.87337 8.21716 7.71716L10.7627 5.17157C10.919 5.01536 11.1722 5.01536 11.3284 5.17157C11.4846 5.32778 11.4846 5.58105 11.3284 5.73726L9.06569 8L11.3284 10.2627C11.4846 10.419 11.4846 10.6722 11.3284 10.8284C11.1722 10.9846 10.919 10.9846 10.7627 10.8284L8.21716 8.28284Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M2 4C2 2.89543 2.89543 2 4 2H12C13.1046 2 14 2.89543 14 4V12C14 13.1046 13.1046 14 12 14H4C2.89543 14 2 13.1046 2 12V4ZM4 3.25H12C12.4142 3.25 12.75 3.58579 12.75 4V12C12.75 12.4142 12.4142 12.75 12 12.75H4C3.58579 12.75 3.25 12.4142 3.25 12V4C3.25 3.58579 3.58579 3.25 4 3.25Z" fill={'currentColor'} /></svg>;
};
NavCollapse.displayName = 'NavCollapse';
NavCollapse.isGlyph = true;
NavCollapse.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default NavCollapse;