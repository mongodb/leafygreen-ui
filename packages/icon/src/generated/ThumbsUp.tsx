/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 11798319d8cc6c8c6aa2004d4d1da071
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ThumbsUpProps extends LGGlyph.ComponentProps {}
const ThumbsUp = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ThumbsUpProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'ThumbsUp', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M7.98148 1C7.46977 1 7.00188 1.28007 6.77256 1.72365L4.27198 6.56054C4.24579 6.61121 4.22269 6.66317 4.20275 6.71614C4.17234 6.71348 4.14155 6.71212 4.11043 6.71212H2.01565C1.45472 6.71212 1 7.15306 1 7.69697V12.8182C1 13.3621 1.45472 14 2.01565 14H4.11043C4.38564 14 5 14 5 14C5 14 5.63614 14 6.14173 14H12.0069C12.9773 14 13.8121 13.3345 13.9998 12.4113L14.961 7.68402C15.2085 6.46669 14.2476 5.33333 12.968 5.33333H10.6804V3.61709C10.6804 2.17171 9.47206 1 7.98148 1ZM6.14173 7.33909L8.34629 3.0748C8.52863 3.19038 8.64912 3.39009 8.64912 3.61709V5.92424C8.64912 6.68572 9.28573 7.30303 10.071 7.30303H12.3561C12.6723 7.30303 12.9091 7.59282 12.8461 7.90265L12.0883 11.6299C12.0409 11.8629 11.8361 12.0303 11.5983 12.0303L6.14173 12.0303V7.33909Z" fill={'currentColor'} /></svg>;
};
ThumbsUp.displayName = 'ThumbsUp';
ThumbsUp.isGlyph = true;
ThumbsUp.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default ThumbsUp;