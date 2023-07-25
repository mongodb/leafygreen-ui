/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 2b95131915b89504e60afd799eb56e38
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface NotAllowedProps extends LGGlyph.ComponentProps {}
const NotAllowed = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: NotAllowedProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'NotAllowed', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M11.75 8C11.75 10.0711 10.0711 11.75 8 11.75C7.37416 11.75 6.78413 11.5967 6.26542 11.3256L11.3256 6.26541C11.5967 6.78413 11.75 7.37416 11.75 8ZM4.67442 9.73459L9.73459 4.67442C9.21587 4.40331 8.62584 4.25 8 4.25C5.92893 4.25 4.25 5.92893 4.25 8C4.25 8.62584 4.40331 9.21587 4.67442 9.73459ZM14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z" fill={'currentColor'} /></svg>;
};
NotAllowed.displayName = 'NotAllowed';
NotAllowed.isGlyph = true;
NotAllowed.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default NotAllowed;