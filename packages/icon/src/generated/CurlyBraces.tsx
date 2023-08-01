/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 075659b2c7ab1470bb967167a2b4ee41
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface CurlyBracesProps extends LGGlyph.ComponentProps {}
const CurlyBraces = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: CurlyBracesProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'CurlyBraces', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M3.00003 3.54401C3.00003 2.16329 4.11933 1.04401 5.50004 1.04401H6.50002C6.77617 1.04401 7.00002 1.26786 7.00002 1.54401L7.00001 2.64918C7.00001 2.84422 6.8419 3.00233 6.64687 3.00233L5.85772 3.00233C5.38403 3.00233 5.00002 3.38633 5.00002 3.86003L5.00002 6.66157C5.00002 7.24368 4.66843 7.74835 4.18383 7.99699C4.66843 8.24563 5.00003 8.75029 5.00003 9.33241V12.1349C5.00052 12.6081 5.38434 12.9917 5.85773 12.9917H6.6469C6.84192 12.9917 7.00002 13.1497 7.00002 13.3448L7.00003 14.45C7.00003 14.7261 6.77617 14.95 6.50003 14.95H5.50004C4.11933 14.95 3.00004 13.8307 3.00004 12.45L3.00003 10.494C3.00003 9.6656 2.32845 8.99403 1.50003 8.99403C1.22389 8.99403 1.00003 8.77017 1.00003 8.49403L1 7.49402C1 7.21789 1.22385 6.99403 1.49999 6.99403C2.32842 6.99403 2.99999 6.32246 2.99999 5.49403L3.00003 3.54401Z" fill={'currentColor'} /><path d="M13 12.45C13 13.8307 11.8807 14.95 10.5 14.95L9.49998 14.95C9.22383 14.95 8.99998 14.7262 8.99998 14.45L8.99999 13.3448C8.99999 13.1498 9.1581 12.9917 9.35314 12.9917H10.1423C10.616 12.9917 11 12.6077 11 12.134L11 9.33245C11 8.75033 11.3316 8.24567 11.8162 7.99703C11.3316 7.74839 11 7.24372 11 6.66161V3.85915C10.9995 3.38588 10.6157 3.00236 10.1423 3.00236H9.3531C9.15808 3.00236 8.99998 2.84427 8.99998 2.64925L8.99997 1.54401C8.99997 1.26787 9.22383 1.04401 9.49997 1.04401L10.5 1.04401C11.8807 1.04401 13 2.1633 13 3.54401L13 5.49999C13 6.32842 13.6715 6.99999 14.5 6.99999C14.7761 6.99999 15 7.22385 15 7.49998L15 8.49999C15 8.77613 14.7761 8.99999 14.5 8.99999C13.6716 8.99999 13 9.67156 13 10.5L13 12.45Z" fill={'currentColor'} /></svg>;
};
CurlyBraces.displayName = 'CurlyBraces';
CurlyBraces.isGlyph = true;
CurlyBraces.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default CurlyBraces;