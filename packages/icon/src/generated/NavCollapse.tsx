/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 9b540c7a71105a9b0c34a3dbc73589f0
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
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M11.3891 4.81802C11.1938 4.62275 10.8772 4.62275 10.682 4.81802L7.85354 7.64644C7.65828 7.84171 7.65828 8.15829 7.85354 8.35355L10.682 11.182C10.8772 11.3772 11.1938 11.3772 11.3891 11.182L11.7426 10.8284C11.9379 10.6331 11.9379 10.3166 11.7426 10.1213L9.62131 8L11.7426 5.87868C11.9379 5.68342 11.9379 5.36683 11.7426 5.17157L11.3891 4.81802Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M4 1C2.34315 1 1 2.34315 1 4V12C1 13.6569 2.34315 15 4 15H12C13.6569 15 15 13.6569 15 12V4C15 2.34315 13.6569 1 12 1H4ZM5 2.5H4C3.17157 2.5 2.5 3.17157 2.5 4V12C2.5 12.8284 3.17157 13.5 4 13.5H5L5 2.5ZM6.5 2.5L6.5 13.5H12C12.8284 13.5 13.5 12.8284 13.5 12V4C13.5 3.17157 12.8284 2.5 12 2.5H6.5Z" fill={'currentColor'} /></svg>;
};
NavCollapse.displayName = 'NavCollapse';
NavCollapse.isGlyph = true;
NavCollapse.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default NavCollapse;