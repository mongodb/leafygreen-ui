/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 17e91e7db7b54b5410c4d0f164607a14
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface BellProps extends LGGlyph.ComponentProps {}
const Bell = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: BellProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Bell', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M12.6248 6.1383C12.4098 4.25462 11.09 2.74034 9.35673 2.21251C9.2281 1.52063 8.66955 1 8 1C7.33044 1 6.77189 1.52063 6.64326 2.21251C4.91 2.74034 3.59017 4.25462 3.37524 6.1383L2.92307 10.1011H2.94943C2.42507 10.1011 2 10.5262 2 11.0506C2 11.5749 2.42507 12 2.94943 12H13.0506C13.5749 12 14 11.5749 14 11.0506C14 10.5262 13.5749 10.1011 13.0506 10.1011H13.0769L12.6248 6.1383ZM8 15C6.89543 15 6 14.1046 6 13H10C10 14.1046 9.10457 15 8 15Z" fill={'currentColor'} /></svg>;
};
Bell.displayName = 'Bell';
Bell.isGlyph = true;
Bell.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Bell;