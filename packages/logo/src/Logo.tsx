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
function Logo({
  variant = 'dark',
  knockout = false,
  height = 40,
  ...rest
}: LogoProps) {
  const className = css`
    width: auto;
    height: ${height}px;
  `;

  const MarkComponent = knockout ? MonochromeLogo : RGBLogo;
  const fill = variant === 'light' ? uiColors.white : uiColors.gray.dark3;

  return <MarkComponent {...rest} fill={fill} className={className} />;
}

Logo.displayName = 'Logo';

Logo.propTypes = {
  variant: PropTypes.oneOf(Object.values(Variant)),
  knockout: PropTypes.bool,
  height: PropTypes.number,
};

export default Logo;
