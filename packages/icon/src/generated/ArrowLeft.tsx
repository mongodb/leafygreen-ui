/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 9e108e6c72fef7a65b595cb6010fe842
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ArrowLeftProps extends LGGlyph.ComponentProps {}
const ArrowLeft = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ArrowLeftProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'ArrowLeft', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M13 6.83212L6.05559 6.83212L7.59059 5.29711C7.98112 4.90659 7.98112 4.27342 7.59059 3.8829L7.35168 3.64398C6.96115 3.25346 6.32799 3.25345 5.93746 3.64398L2.55483 7.02661C2.5456 7.03518 2.5365 7.04395 2.52752 7.05292L2.2886 7.29184C1.89808 7.68237 1.89808 8.31553 2.2886 8.70605L5.93975 12.3572C6.33028 12.7477 6.96344 12.7477 7.35397 12.3572L7.59288 12.1183C7.98341 11.7278 7.98341 11.0946 7.59288 10.7041L6.0588 9.17L13 9.17C13.5523 9.17 14 8.72228 14 8.17V7.83212C14 7.27983 13.5523 6.83212 13 6.83212Z" fill={'currentColor'} /></svg>;
};
ArrowLeft.displayName = 'ArrowLeft';
ArrowLeft.isGlyph = true;
ArrowLeft.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default ArrowLeft;