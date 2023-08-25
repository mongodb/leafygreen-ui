/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 58e61a9922158b1d00a7865fad29518e
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ArrowRightProps extends LGGlyph.ComponentProps {}
const ArrowRight = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ArrowRightProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'ArrowRight', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M3 6.83212L9.94442 6.83212L8.40941 5.29711C8.01888 4.90659 8.01889 4.27342 8.40941 3.8829L8.64833 3.64398C9.03885 3.25346 9.67201 3.25345 10.0625 3.64398L13.4452 7.02661C13.4544 7.03518 13.4635 7.04395 13.4725 7.05292L13.7114 7.29184C14.1019 7.68237 14.1019 8.31553 13.7114 8.70605L10.0602 12.3572C9.66972 12.7477 9.03656 12.7477 8.64603 12.3572L8.40712 12.1183C8.01659 11.7278 8.01659 11.0946 8.40712 10.7041L9.9412 9.17L3 9.17C2.44771 9.17 2 8.72228 2 8.17L2 7.83212C2 7.27983 2.44772 6.83212 3 6.83212Z" fill={'currentColor'} /></svg>;
};
ArrowRight.displayName = 'ArrowRight';
ArrowRight.isGlyph = true;
ArrowRight.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default ArrowRight;