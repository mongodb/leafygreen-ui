/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum c8f5b346abb8b329638dd7d4f241f089
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ChartsProps extends LGGlyph.ComponentProps {}
const Charts = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ChartsProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Charts', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M11.5 13C11.5 13.5523 11.9477 14 12.5 14H13.5C14.0523 14 14.5 13.5523 14.5 13V3C14.5 2.44772 14.0523 2 13.5 2H12.5C11.9477 2 11.5 2.44772 11.5 3L11.5 13Z" fill={'currentColor'} /><path d="M7.5 14C6.94772 14 6.5 13.5523 6.5 13L6.5 6C6.5 5.44772 6.94771 5 7.5 5H8.5C9.05228 5 9.5 5.44772 9.5 6V13C9.5 13.5523 9.05229 14 8.5 14H7.5Z" fill={'currentColor'} /><path d="M2.5 14C1.94772 14 1.5 13.5523 1.5 13V9C1.5 8.44772 1.94772 8 2.5 8H3.5C4.05229 8 4.5 8.44772 4.5 9L4.5 13C4.5 13.5523 4.05229 14 3.5 14H2.5Z" fill={'currentColor'} /></svg>;
};
Charts.displayName = 'Charts';
Charts.isGlyph = true;
Charts.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Charts;