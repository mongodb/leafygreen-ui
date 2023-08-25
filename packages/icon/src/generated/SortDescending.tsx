/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 63551eeeda961faec25cbdac568f012e
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface SortDescendingProps extends LGGlyph.ComponentProps {}
const SortDescending = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: SortDescendingProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'SortDescending', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M4.44991 14.6959C4.23029 14.8861 3.90429 14.8861 3.68466 14.6959L1.20302 12.5467C0.793944 12.1925 1.04449 11.5205 1.58564 11.5205H2.89835V2.16894C2.89835 1.52335 3.4217 1 4.06729 1C4.71287 1 5.23623 1.52335 5.23623 2.16894V11.5205H6.54893C7.09009 11.5205 7.34063 12.1925 6.93156 12.5467L4.44991 14.6959Z" fill={'currentColor'} /><path d="M8 3C7.44772 3 7 3.44772 7 4C7 4.55229 7.44772 5 8 5H14C14.5523 5 15 4.55229 15 4C15 3.44772 14.5523 3 14 3H8Z" fill={'currentColor'} /><path d="M7 7C7 6.44772 7.44772 6 8 6H12C12.5523 6 13 6.44772 13 7C13 7.55229 12.5523 8 12 8H8C7.44772 8 7 7.55229 7 7Z" fill={'currentColor'} /><path d="M8 9C7.44772 9 7 9.44771 7 10C7 10.5523 7.44772 11 8 11H10C10.5523 11 11 10.5523 11 10C11 9.44771 10.5523 9 10 9H8Z" fill={'currentColor'} /></svg>;
};
SortDescending.displayName = 'SortDescending';
SortDescending.isGlyph = true;
SortDescending.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default SortDescending;