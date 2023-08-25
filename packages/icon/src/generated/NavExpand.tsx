/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 7d863a9289f65c7499427e501961017d
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
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M4.61091 4.81802C4.80616 4.62275 5.12277 4.62275 5.31803 4.81802L8.14646 7.64644C8.34172 7.84171 8.34172 8.15829 8.14646 8.35355L5.31803 11.182C5.12277 11.3772 4.80621 11.3772 4.61091 11.182L4.25736 10.8284C4.06211 10.6331 4.06211 10.3166 4.25736 10.1213L6.37869 8L4.25736 5.87868C4.06211 5.68342 4.06211 5.36683 4.25736 5.17157L4.61091 4.81802Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M12 1C13.6569 1 15 2.34315 15 4V12C15 13.6569 13.6569 15 12 15H4C2.34315 15 1 13.6569 1 12V4C1 2.34315 2.34315 1 4 1H12ZM11 2.5H12C12.8284 2.5 13.5 3.17157 13.5 4V12C13.5 12.8284 12.8284 13.5 12 13.5H11V2.5ZM9.5 2.5V13.5H4C3.17157 13.5 2.5 12.8284 2.5 12V4C2.5 3.17157 3.17157 2.5 4 2.5H9.5Z" fill={'currentColor'} /></svg>;
};
NavExpand.displayName = 'NavExpand';
NavExpand.isGlyph = true;
NavExpand.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default NavExpand;