/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 2134d7e34c197a18fe50432e951eb594
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface BeakerProps extends LGGlyph.ComponentProps {}
const Beaker = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: BeakerProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Beaker', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M5.95288 1.8C5.95288 1.51997 5.95288 1.37996 6.00738 1.273C6.05532 1.17892 6.13181 1.10243 6.22589 1.0545C6.33284 1 6.47286 1 6.75288 1H9.15288C9.43291 1 9.57292 1 9.67988 1.0545C9.77396 1.10243 9.85045 1.17892 9.89839 1.273C9.95288 1.37996 9.95288 1.51997 9.95288 1.8V2.2C9.95288 2.48003 9.95288 2.62004 9.89839 2.727C9.85045 2.82108 9.77396 2.89757 9.67988 2.9455C9.57292 3 9.43291 3 9.15288 3H6.75288C6.47286 3 6.33284 3 6.22589 2.9455C6.13181 2.89757 6.05532 2.82108 6.00738 2.727C5.95288 2.62004 5.95288 2.48003 5.95288 2.2V1.8ZM6.00919 4.26951C5.95289 4.37788 5.95289 4.52025 5.95289 4.805V6H5.95288L2.94611 11.4122C2.28339 12.6051 1.95203 13.2015 2.01416 13.6895C2.06606 14.097 2.28284 14.4654 2.61388 14.7087C3.01025 15 3.69257 15 5.0572 15H10.8485C12.2132 15 12.8955 15 13.2919 14.7087C13.6229 14.4654 13.8397 14.097 13.8916 13.6895C13.9537 13.2015 13.6224 12.6051 12.9596 11.4122L12.9596 11.4122L9.95289 6.00003V4.805C9.95289 4.52025 9.95289 4.37788 9.8966 4.26951C9.84916 4.17819 9.7747 4.10373 9.68338 4.05629C9.57501 4 9.43264 4 9.14789 4H6.75789C6.47315 4 6.33077 4 6.2224 4.05629C6.13108 4.10373 6.05662 4.17819 6.00919 4.26951ZM9.33288 9L6.30288 9.5L5.01554 11.8106C4.79758 12.2019 4.6886 12.3975 4.70716 12.5576C4.72336 12.6973 4.79764 12.8237 4.9118 12.9059C5.04264 13 5.26656 13 5.71439 13H10.1939C10.641 13 10.8646 13 10.9954 12.906C11.1095 12.824 11.1838 12.6977 11.2001 12.5582C11.2189 12.3982 11.1104 12.2027 10.8934 11.8118L9.33288 9Z" fill={'currentColor'} /></svg>;
};
Beaker.displayName = 'Beaker';
Beaker.isGlyph = true;
Beaker.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Beaker;