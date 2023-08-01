/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 62e4015813f7846ecfb03c9f2f1368b5
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface PlusWithCircleProps extends LGGlyph.ComponentProps {}
const PlusWithCircle = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: PlusWithCircleProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'PlusWithCircle', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM7 5C7 4.44772 7.44772 4 8 4C8.55229 4 9 4.44772 9 5V7H11C11.5523 7 12 7.44771 12 8C12 8.55228 11.5523 9 11 9H9V11C9 11.5523 8.55229 12 8 12C7.44772 12 7 11.5523 7 11V9H5C4.44772 9 4 8.55229 4 8C4 7.44772 4.44772 7 5 7H7V5Z" fill={'currentColor'} /></svg>;
};
PlusWithCircle.displayName = 'PlusWithCircle';
PlusWithCircle.isGlyph = true;
PlusWithCircle.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default PlusWithCircle;