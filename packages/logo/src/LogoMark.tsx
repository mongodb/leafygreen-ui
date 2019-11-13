import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { uiColors } from '@leafygreen-ui/palette';
import { LogoProps, Variant } from './types';
import MonochromeLogoMark from './logos/MonochromeLogoMark';
import RGBLogoMark from './logos/RGBLogoMark';

/**
 * # LogoMark
 *
 * React Component that displays MongoDB logomark.
 *
 * ```
<LogoMark />
```
 * @param props.variant Determines color variant of <LogoMark /> component. Can be 'light' or 'dark'.
 * @param props.knockout Boolean to describe whether or not knockout version of MongoDB logomark will be used.
 * @param props.height Determines height of the <LogoMark /> component.
 */
function LogoMark({
  knockout = false,
  height = 40,
  variant,
}: LogoProps): ReactElement {
  if (!knockout) {
    return <RGBLogoMark height={height} />;
  }

  if (variant === 'light') {
    return <MonochromeLogoMark fill={uiColors.white} height={height} />;
  }

  if (variant === 'dark') {
    return <MonochromeLogoMark fill={uiColors.gray.dark3} height={height} />;
  }

  return <RGBLogoMark height={height} />;
}

LogoMark.displayName = 'LogoMark';

LogoMark.propTypes = {
  variant: PropTypes.oneOf(Object.values(Variant)),
  knockout: PropTypes.bool,
  height: PropTypes.number,
};

export default LogoMark;
