/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum d204b80c1087162281077a3039b0f498
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface CameraProps extends LGGlyph.ComponentProps {}
const Camera = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: CameraProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Camera', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M10.25 8.5C10.25 9.74264 9.24264 10.75 8 10.75C6.75736 10.75 5.75 9.74264 5.75 8.5C5.75 7.25736 6.75736 6.25 8 6.25C9.24264 6.25 10.25 7.25736 10.25 8.5Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M4.58541 3.32918C4.8395 2.821 5.35889 2.5 5.92705 2.5H10.0729C10.6411 2.5 11.1605 2.821 11.4146 3.32918L11.7236 3.94721C11.893 4.286 12.2393 4.5 12.618 4.5H13.5C14.3284 4.5 15 5.17157 15 6V12C15 12.8284 14.3284 13.5 13.5 13.5H2.5C1.67157 13.5 1 12.8284 1 12V6C1 5.17157 1.67157 4.5 2.5 4.5H3.38197C3.76074 4.5 4.107 4.286 4.27639 3.94721L4.58541 3.32918ZM11.5 8.5C11.5 10.433 9.933 12 8 12C6.067 12 4.5 10.433 4.5 8.5C4.5 6.567 6.067 5 8 5C9.933 5 11.5 6.567 11.5 8.5Z" fill={'currentColor'} /></svg>;
};
Camera.displayName = 'Camera';
Camera.isGlyph = true;
Camera.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Camera;