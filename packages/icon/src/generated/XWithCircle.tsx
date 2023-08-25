/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 2b431211b89afefb74505aa96c547615
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface XWithCircleProps extends LGGlyph.ComponentProps {}
const XWithCircle = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: XWithCircleProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'XWithCircle', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM9.41421 5.17157C9.80474 4.78105 10.4379 4.78105 10.8284 5.17157C11.219 5.5621 11.219 6.19526 10.8284 6.58579L9.41421 8L10.8284 9.41421C11.219 9.80474 11.219 10.4379 10.8284 10.8284C10.4379 11.219 9.80474 11.219 9.41421 10.8284L8 9.41421L6.58579 10.8284C6.19526 11.219 5.5621 11.219 5.17157 10.8284C4.78105 10.4379 4.78105 9.80474 5.17157 9.41421L6.58579 8L5.17157 6.58579C4.78105 6.19526 4.78105 5.5621 5.17157 5.17157C5.5621 4.78105 6.19526 4.78105 6.58579 5.17157L8 6.58579L9.41421 5.17157Z" fill={'currentColor'} /></svg>;
};
XWithCircle.displayName = 'XWithCircle';
XWithCircle.isGlyph = true;
XWithCircle.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default XWithCircle;