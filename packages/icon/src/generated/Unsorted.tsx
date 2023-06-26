/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 537ae9759ea664c6f49c61039923fb08
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface UnsortedProps extends LGGlyph.ComponentProps {}
const Unsorted = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: UnsortedProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Unsorted', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M3.68466 1.14265C3.90429 0.952449 4.23028 0.95245 4.44991 1.14265L6.93156 3.29182C7.34063 3.64609 7.09009 4.31811 6.54893 4.31811H5.23624L5.23624 11.6819H6.54894C7.09009 11.6819 7.34064 12.3539 6.93157 12.7082L4.44992 14.8573C4.23029 15.0476 3.9043 15.0476 3.68467 14.8573L1.20303 12.7082C0.793953 12.3539 1.0445 11.6819 1.58565 11.6819H2.89836V11.6742L2.89835 11.6696L2.89835 4.31811H1.58564C1.04449 4.31811 0.793944 3.64609 1.20302 3.29182L3.68466 1.14265Z" fill={'currentColor'} /><path d="M8 8C8 7.44772 8.44772 7 9 7H14C14.5523 7 15 7.44772 15 8C15 8.55228 14.5523 9 14 9H9C8.44772 9 8 8.55228 8 8Z" fill={'currentColor'} /><path d="M9 4C8.44772 4 8 4.44772 8 5C8 5.55228 8.44772 6 9 6H14C14.5523 6 15 5.55228 15 5C15 4.44772 14.5523 4 14 4H9Z" fill={'currentColor'} /><path d="M8 11C8 10.4477 8.44772 10 9 10H14C14.5523 10 15 10.4477 15 11C15 11.5523 14.5523 12 14 12H9C8.44772 12 8 11.5523 8 11Z" fill={'currentColor'} /></svg>;
};
Unsorted.displayName = 'Unsorted';
Unsorted.isGlyph = true;
Unsorted.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Unsorted;