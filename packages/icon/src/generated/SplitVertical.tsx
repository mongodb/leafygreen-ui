/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 2fc9c287ab0721e444afe2489d47d2ea
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface SplitVerticalProps extends LGGlyph.ComponentProps {}
const SplitVertical = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: SplitVerticalProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'SplitVertical', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M13 1C14.1046 1 15 1.89543 15 3V11C15 12.1046 14.1046 13 13 13H3C1.89543 13 1 12.1046 1 11V3C1 1.89543 1.89543 1 3 1H13ZM7.5 3H3V11H7.5V3ZM8.5 11H13V3H8.5V11Z" fill={'currentColor'} /></svg>;
};
SplitVertical.displayName = 'SplitVertical';
SplitVertical.isGlyph = true;
SplitVertical.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default SplitVertical;