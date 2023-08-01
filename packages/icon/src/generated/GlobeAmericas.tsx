/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum ae5ee1ee42a84fc1c99ece71890a58b7
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface GlobeAmericasProps extends LGGlyph.ComponentProps {}
const GlobeAmericas = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: GlobeAmericasProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'GlobeAmericas', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8ZM8.69894 12.6989C8.47083 12.7326 8.23745 12.75 8 12.75C6.86225 12.75 5.81793 12.35 5 11.6829V10L3.25682 8.25682C3.25229 8.17179 3.25 8.08616 3.25 8C3.25 5.37665 5.37665 3.25 8 3.25V4.5L6.5 6V7L6 7.5L5.5 7L4.5 8L5 8.5H7.5L8 9V10L7 11L8.69894 12.6989ZM12.7457 8.20342C12.7486 8.13597 12.75 8.06815 12.75 8C12.75 6.94341 12.405 5.9674 11.8216 5.17845L10.5 6.5V9H11.75L12.7457 8.20342Z" fill={'currentColor'} /></svg>;
};
GlobeAmericas.displayName = 'GlobeAmericas';
GlobeAmericas.isGlyph = true;
GlobeAmericas.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default GlobeAmericas;