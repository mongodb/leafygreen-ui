/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 8d62846f332524d14eb34fa5a2531124
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ArrowDownProps extends LGGlyph.ComponentProps {}
const ArrowDown = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ArrowDownProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'ArrowDown', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M9.16788 3L9.16788 9.94442L10.7029 8.40941C11.0934 8.01888 11.7266 8.01889 12.1171 8.40941L12.356 8.64833C12.7465 9.03885 12.7465 9.67201 12.356 10.0625L8.97339 13.4452C8.96483 13.4544 8.95605 13.4635 8.94708 13.4725L8.70816 13.7114C8.31763 14.1019 7.68447 14.1019 7.29395 13.7114L3.64279 10.0602C3.25227 9.66972 3.25227 9.03656 3.64279 8.64603L3.88171 8.40712C4.27223 8.01659 4.9054 8.01659 5.29592 8.40712L6.83 9.9412L6.83 3C6.83 2.44771 7.27772 2 7.83001 2L8.16788 2C8.72017 2 9.16788 2.44772 9.16788 3Z" fill={'currentColor'} /></svg>;
};
ArrowDown.displayName = 'ArrowDown';
ArrowDown.isGlyph = true;
ArrowDown.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default ArrowDown;