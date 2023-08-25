/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 25f52ae7f74db9d20c4d22c1ad503c51
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ClockWithArrowProps extends LGGlyph.ComponentProps {}
const ClockWithArrow = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ClockWithArrowProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'ClockWithArrow', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M13 8C13 10.7614 10.7614 13 8 13C7.16895 13 6.38526 12.7973 5.69568 12.4385C5.34783 12.2576 4.90944 12.3087 4.65841 12.6099L4.32712 13.0075C4.05174 13.3379 4.1087 13.8355 4.48034 14.0521C5.51438 14.6548 6.71687 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C6.05606 1 4.2972 1.7924 3.02879 3.07181L1.96954 2.14618C1.56206 1.7901 0.931193 2.13127 1.00611 2.66721L1.4606 5.9185C1.50083 6.20624 1.7463 6.4287 2.03684 6.43H5.31972C5.86086 6.43241 6.1144 5.76821 5.70691 5.41212L4.53896 4.3915C5.4373 3.52965 6.65679 3 8 3C10.7614 3 13 5.23858 13 8Z" fill={'currentColor'} /><path d="M7.25 5.25C7.25 4.83579 7.58579 4.5 8 4.5C8.41421 4.5 8.75 4.83579 8.75 5.25V7.91793L10.4294 9.44169C10.7412 9.71445 10.7728 10.1883 10.5 10.5C10.2272 10.8117 9.75342 10.8433 9.44169 10.5706L7.50697 8.81519C7.49904 8.80826 7.49125 8.80117 7.48361 8.79391C7.41388 8.72781 7.35954 8.65118 7.32088 8.56868C7.27541 8.47196 7.25 8.36395 7.25 8.25V5.25Z" fill={'currentColor'} /></svg>;
};
ClockWithArrow.displayName = 'ClockWithArrow';
ClockWithArrow.isGlyph = true;
ClockWithArrow.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default ClockWithArrow;