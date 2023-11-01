/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum e6e3f2917c2e588a1ebb118e9bba3a5f
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface TimeSeriesProps extends LGGlyph.ComponentProps {}
const TimeSeries = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: TimeSeriesProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'TimeSeries', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M7.02336 1.51761C7.53556 1.54248 7.97993 1.88141 8.14209 2.37087L9.38008 6.10758L10.9391 4.01615C11.1552 3.72626 11.4857 3.54499 11.8449 3.5193C12.2042 3.49361 12.5568 3.62604 12.8115 3.88227L14.7089 5.79128C15.097 6.1818 15.097 6.81497 14.7089 7.20549L14.3325 7.55905C13.9444 7.94957 13.3151 7.94957 12.9269 7.55905L12.0674 6.66916L9.94519 9.51615C9.66793 9.8881 9.2084 10.0745 8.75227 10C8.29614 9.92554 7.91877 9.60251 7.77265 9.16144L6.79779 6.21895L6.11095 7.77383C5.91154 8.22524 5.46662 8.51615 4.97564 8.51615H1.99391C1.44499 8.51615 1 8.06844 1 7.51615V7.01615C1 6.46387 1.44499 6.01615 1.99391 6.01615H4.16825L5.82815 2.25848C6.03641 1.78702 6.51117 1.49273 7.02336 1.51761Z" fill={'currentColor'} /><path d="M14 12C14.5523 12 15 12.4477 15 13V13.5C15 14.0523 14.5523 14.5 14 14.5H2C1.44772 14.5 1 14.0523 1 13.5V13C1 12.4477 1.44772 12 2 12H14Z" fill={'currentColor'} /></svg>;
};
TimeSeries.displayName = 'TimeSeries';
TimeSeries.isGlyph = true;
TimeSeries.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default TimeSeries;