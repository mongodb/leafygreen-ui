/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum da72e46e5ccafe9fd588bc6bcc6de228
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface PlusProps extends LGGlyph.ComponentProps {}
const Plus = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: PlusProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Plus', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M7.5 2C6.94772 2 6.5 2.44772 6.5 3V6.5H3C2.44772 6.5 2 6.94772 2 7.5V8.5C2 9.05228 2.44772 9.5 3 9.5H6.5V13C6.5 13.5523 6.94772 14 7.5 14H8.5C9.05228 14 9.5 13.5523 9.5 13V9.5H13C13.5523 9.5 14 9.05228 14 8.5V7.5C14 6.94771 13.5523 6.5 13 6.5H9.5V3C9.5 2.44772 9.05228 2 8.5 2H7.5Z" fill={'currentColor'} /></svg>;
};
Plus.displayName = 'Plus';
Plus.isGlyph = true;
Plus.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Plus;