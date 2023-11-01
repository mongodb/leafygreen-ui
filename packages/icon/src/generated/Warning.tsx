/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum e9c2a4040a3148c4e10b1b4d8ea687ac
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface WarningProps extends LGGlyph.ComponentProps {}
const Warning = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: WarningProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Warning', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M8.8639 1.51357C8.49039 0.828811 7.50961 0.828811 7.1361 1.51357L1.12218 12.5388C0.763263 13.1968 1.23814 14 1.98608 14H14.0139C14.7619 14 15.2367 13.1968 14.8778 12.5388L8.8639 1.51357ZM7 5C7 4.44772 7.44772 4 8 4C8.55228 4 9 4.44772 9 5V9C9 9.55228 8.55228 10 8 10C7.44772 10 7 9.55228 7 9V5ZM9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12Z" fill={'currentColor'} /></svg>;
};
Warning.displayName = 'Warning';
Warning.isGlyph = true;
Warning.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Warning;