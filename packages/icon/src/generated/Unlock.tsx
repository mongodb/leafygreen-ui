/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 18a2109f1b295cf14404a394bc5fb39f
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface UnlockProps extends LGGlyph.ComponentProps {}
const Unlock = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: UnlockProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Unlock', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M6.15738 4.22101C6.46112 3.50344 7.17177 3 8 3C9.10457 3 10 3.89543 10 5V7H4C3.44772 7 3 7.44772 3 8V14C3 14.5523 3.44772 15 4 15H12C12.5523 15 13 14.5523 13 14V8C13 7.44772 12.5523 7 12 7V5C12 2.79086 10.2091 1 8 1C6.20247 1 4.68187 2.18568 4.17763 3.81762C3.98198 4.45082 4.53726 5 5.2 5C5.64183 5 5.98516 4.62789 6.15738 4.22101ZM8.58667 10.8099C8.83712 10.6282 9 10.3331 9 10C9 9.44771 8.55228 9 8 9C7.44772 9 7 9.44771 7 10C7 10.3361 7.16577 10.6334 7.42 10.8147V12.6667C7.42 12.9888 7.68117 13.25 8.00333 13.25C8.3255 13.25 8.58667 12.9888 8.58667 12.6667V10.8099Z" fill={'currentColor'} /></svg>;
};
Unlock.displayName = 'Unlock';
Unlock.isGlyph = true;
Unlock.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Unlock;