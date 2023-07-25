/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 6a27b4a7ab458bd4f79c305573e132a7
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface SortAscendingProps extends LGGlyph.ComponentProps {}
const SortAscending = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: SortAscendingProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'SortAscending', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M4.44991 1.14265C4.23029 0.95245 3.90429 0.952449 3.68466 1.14265L1.20302 3.29182C0.793944 3.64609 1.04449 4.31811 1.58564 4.31811H2.89835V13.6696C2.89835 14.3152 3.4217 14.8386 4.06729 14.8386C4.71287 14.8386 5.23623 14.3152 5.23623 13.6696V4.31811H6.54893C7.09009 4.31811 7.34063 3.64609 6.93156 3.29182L4.44991 1.14265Z" fill={'currentColor'} /><path d="M8 5C7.44772 5 7 5.44772 7 6C7 6.55228 7.44772 7 8 7H14C14.5523 7 15 6.55228 15 6C15 5.44772 14.5523 5 14 5H8Z" fill={'currentColor'} /><path d="M7 9C7 8.44772 7.44772 8 8 8H12C12.5523 8 13 8.44772 13 9C13 9.55229 12.5523 10 12 10H8C7.44772 10 7 9.55229 7 9Z" fill={'currentColor'} /><path d="M8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H10C10.5523 13 11 12.5523 11 12C11 11.4477 10.5523 11 10 11H8Z" fill={'currentColor'} /></svg>;
};
SortAscending.displayName = 'SortAscending';
SortAscending.isGlyph = true;
SortAscending.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default SortAscending;