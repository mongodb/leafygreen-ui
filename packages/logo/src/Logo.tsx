import React from 'react';
import PropTypes from 'prop-types';
import { uiColors } from '@leafygreen-ui/palette';
import { css } from '@leafygreen-ui/emotion';
import RGBLogo from './logos/RGBLogo';
import MonochromeLogo from './logos/MonochromeLogo';
import { LogoProps, Variant } from './types';

/**
 * # Logo
 *
 * React Component that displays MongoDB Logo.
 *
 * ```
<Logo />
```
 * @param props.variant Determines color variant of <Logo /> component. Can be 'light' or 'dark'.
 * @param props.knockout Boolean to describe whether or not knockout version of MongoDB logo will be used.
 * @param props.height Determines height of the <Logo /> component.
 */
function Logo({ variant = 'dark', knockout = false, height = 40 }: LogoProps) {
  let fill = '';

  const className = css`
    width: auto;
    height: ${height}px;
  `;

  if (variant === 'light') {
    fill = uiColors.white;
    if (knockout) {
      return <MonochromeLogo className={className} fill={fill} />;
    }

    return <RGBLogo className={className} fill={fill} />;
  }

  fill = uiColors.gray.dark3;

  if (knockout) {
    return <MonochromeLogo className={className} fill={fill} />;
  }

  return <RGBLogo className={className} fill={fill} />;
}

Logo.displayName = 'Logo';

Logo.propTypes = {
  variant: PropTypes.oneOf(Object.values(Variant)),
  knockout: PropTypes.bool,
  height: PropTypes.number,
};

export default Logo;
