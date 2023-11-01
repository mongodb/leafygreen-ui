/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 33a0e77f666f4a5850496c95c2676b55
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface SupportProps extends LGGlyph.ComponentProps {}
const Support = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: SupportProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Support', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M5 7C5 5.34315 6.34315 4 8 4C9.65685 4 11 5.34315 11 7V9.5C11 11.0106 10.043 12.2977 8.70223 12.7881C8.52167 12.6099 8.27367 12.5 8 12.5C7.44772 12.5 7 12.9477 7 13.5C7 14.0523 7.44772 14.5 8 14.5C8.464 14.5 8.85419 14.184 8.96708 13.7554C10.2714 13.3059 11.3042 12.2736 11.7545 10.9697C11.8331 10.9895 11.9153 11 12 11H12.5C13.8807 11 15 9.88071 15 8.5C15 7.25772 14.0939 6.22707 12.9065 6.03289C12.4561 3.73428 10.4306 2 8 2C5.56944 2 3.54394 3.73428 3.09346 6.03289C1.9061 6.22707 1 7.25772 1 8.5C1 9.88071 2.11929 11 3.5 11H4C4.55228 11 5 10.5523 5 10V7Z" fill={'currentColor'} /></svg>;
};
Support.displayName = 'Support';
Support.isGlyph = true;
Support.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Support;