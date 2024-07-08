/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 4c2d7672aa71f7e5c28bcdf6b86b5832
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface MoonProps extends LGGlyph.ComponentProps {}
const Moon = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: MoonProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Moon', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M13.7868 10.0736C13.5564 9.8432 13.2012 9.7952 12.9228 9.9584C12.798 10.0352 12.6636 10.0928 12.5292 10.1504C10.7628 10.8704 8.6412 9.9392 7.8252 7.9424C7.0956 6.1472 7.7388 4.208 9.1692 3.3248C9.438 3.1616 9.5724 2.8352 9.486 2.5184C9.3996 2.2016 9.1116 2 8.7948 2H8.67C5.358 2 2.67 4.688 2.67 8C2.67 11.312 5.358 14 8.67 14C10.9164 14 12.8748 12.7616 13.902 10.9376C14.0652 10.6592 14.0076 10.304 13.7772 10.0736H13.7868Z" fill={'currentColor'} /></svg>;
};
Moon.displayName = 'Moon';
Moon.isGlyph = true;
Moon.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Moon;