/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum e5a0c8d34e8fcc2a863a98a6e53e105f
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface NavExpandProps extends LGGlyph.ComponentProps {}
const NavExpand = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: NavExpandProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'NavExpand', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M8.5 4H9.5C10.6046 4 11.5 4.89543 11.5 6V10C11.5 11.1046 10.6046 12 9.5 12H8.5V4Z" fill={'currentColor'} /><path d="M7.78284 8.28284C7.93905 8.12663 7.93905 7.87337 7.78284 7.71716L5.23726 5.17157C5.08105 5.01536 4.82778 5.01536 4.67157 5.17157C4.51536 5.32778 4.51536 5.58105 4.67157 5.73726L6.93431 8L4.67157 10.2627C4.51536 10.419 4.51536 10.6722 4.67157 10.8284C4.82778 10.9846 5.08105 10.9846 5.23726 10.8284L7.78284 8.28284Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M14 4C14 2.89543 13.1046 2 12 2H4C2.89543 2 2 2.89543 2 4V12C2 13.1046 2.89543 14 4 14H12C13.1046 14 14 13.1046 14 12V4ZM12 3.25H4C3.58579 3.25 3.25 3.58579 3.25 4V12C3.25 12.4142 3.58579 12.75 4 12.75H12C12.4142 12.75 12.75 12.4142 12.75 12V4C12.75 3.58579 12.4142 3.25 12 3.25Z" fill={'currentColor'} /></svg>;
};
NavExpand.displayName = 'NavExpand';
NavExpand.isGlyph = true;
NavExpand.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default NavExpand;