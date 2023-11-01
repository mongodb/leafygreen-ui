/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 547c7be509e9ab430d0972321c04648d
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface SplitHorizontalProps extends LGGlyph.ComponentProps {}
const SplitHorizontal = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: SplitHorizontalProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'SplitHorizontal', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M15 11C15 12.1046 14.1046 13 13 13L3 13C1.89543 13 1 12.1046 1 11L1 3C1 1.89543 1.89543 1 3 1L13 1C14.1046 1 15 1.89543 15 3L15 11ZM13 6.5L13 3L3 3L3 6.5L13 6.5ZM3 7.5L3 11L13 11L13 7.5L3 7.5Z" fill={'currentColor'} /></svg>;
};
SplitHorizontal.displayName = 'SplitHorizontal';
SplitHorizontal.isGlyph = true;
SplitHorizontal.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default SplitHorizontal;