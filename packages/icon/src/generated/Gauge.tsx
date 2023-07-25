/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum c87af90b454de154bd57d814169242fa
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface GaugeProps extends LGGlyph.ComponentProps {}
const Gauge = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: GaugeProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Gauge', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M1.041 10.2514C0.996713 10.6632 1.33666 11 1.75088 11H4.2449C4.65912 11 4.98569 10.6591 5.08798 10.2577C5.22027 9.73864 5.49013 9.25966 5.87533 8.87446C6.43906 8.31073 7.20364 7.99403 8.00088 7.99403C8.27011 7.99403 8.53562 8.03015 8.79093 8.0997L11.7818 5.10887C10.6623 4.39046 9.35172 4 8.00088 4C6.14436 4 4.36388 4.7375 3.05113 6.05025C1.91604 7.18534 1.21104 8.67012 1.041 10.2514Z" fill={'currentColor'} /><path d="M13.2967 6.42237L10.455 9.26409C10.6678 9.56493 10.8231 9.90191 10.9138 10.2577C11.0161 10.6591 11.3426 11 11.7568 11L14.2509 11C14.6651 11 15.005 10.6632 14.9608 10.2514C14.8087 8.83759 14.229 7.50093 13.2967 6.42237Z" fill={'currentColor'} /></svg>;
};
Gauge.displayName = 'Gauge';
Gauge.isGlyph = true;
Gauge.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Gauge;