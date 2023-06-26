/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 2f45fa040eee573795ce5cb5a9e92dca
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ArrowUpProps extends LGGlyph.ComponentProps {}
const ArrowUp = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ArrowUpProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'ArrowUp', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M9.16788 13L9.16788 6.05558L10.7029 7.59059C11.0934 7.98112 11.7266 7.98112 12.1171 7.59059L12.356 7.35168C12.7465 6.96115 12.7465 6.32799 12.356 5.93746L8.97339 2.55483C8.96482 2.5456 8.95605 2.5365 8.94707 2.52752L8.70816 2.2886C8.31763 1.89808 7.68447 1.89808 7.29394 2.2886L3.64279 5.93975C3.25227 6.33028 3.25227 6.96344 3.64279 7.35397L3.88171 7.59288C4.27223 7.98341 4.9054 7.98341 5.29592 7.59288L6.83 6.0588L6.83 13C6.83 13.5523 7.27772 14 7.83 14H8.16788C8.72017 14 9.16788 13.5523 9.16788 13Z" fill={'currentColor'} /></svg>;
};
ArrowUp.displayName = 'ArrowUp';
ArrowUp.isGlyph = true;
ArrowUp.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default ArrowUp;