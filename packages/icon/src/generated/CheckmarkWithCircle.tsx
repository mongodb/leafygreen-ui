/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 0a139a951de047d6a8d112bf57d152f8
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface CheckmarkWithCircleProps extends LGGlyph.ComponentProps {}
const CheckmarkWithCircle = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: CheckmarkWithCircleProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'CheckmarkWithCircle', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM10.4485 4.89583C10.8275 4.45816 11.4983 4.43411 11.9077 4.84352C12.2777 5.21345 12.2989 5.80633 11.9564 6.2018L7.38365 11.4818C7.31367 11.5739 7.22644 11.6552 7.12309 11.7208C6.65669 12.0166 6.03882 11.8783 5.74302 11.4119L3.9245 8.54448C3.6287 8.07809 3.767 7.46021 4.2334 7.16442C4.69979 6.86863 5.31767 7.00693 5.61346 7.47332L6.71374 9.20819L10.4485 4.89583Z" fill={'currentColor'} /></svg>;
};
CheckmarkWithCircle.displayName = 'CheckmarkWithCircle';
CheckmarkWithCircle.isGlyph = true;
CheckmarkWithCircle.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default CheckmarkWithCircle;