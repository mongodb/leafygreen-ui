/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum ba7fa439d334ca21a8473296e5f02e9f
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface MinusProps extends LGGlyph.ComponentProps {}
const Minus = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: MinusProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Minus', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M3 6.5C2.44772 6.5 2 6.94772 2 7.5V8.5C2 9.05229 2.44772 9.5 3 9.5C9.04335 9.5 7.79133 9.5 13 9.5C13.5523 9.5 14 9.05228 14 8.5V7.5C14 6.94772 13.5523 6.5 13 6.5C7.79133 6.5 9.04335 6.5 3 6.5Z" fill={'currentColor'} /></svg>;
};
Minus.displayName = 'Minus';
Minus.isGlyph = true;
Minus.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Minus;