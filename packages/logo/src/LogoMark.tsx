import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { uiColors } from '@leafygreen-ui/palette';
import { css } from '@leafygreen-ui/emotion';
import { LogoProps } from './utils';
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
 * @param props.darkMode Determines whether or not the LogoMark will appear in darkMode.
 * @param props.knockout Boolean to describe whether or not knockout version of MongoDB logomark will be used.
 * @param props.height Determines height of the <LogoMark /> component.
 */
function LogoMark({
  height = 40,
  darkMode = false,
  knockout = false,
  ...rest
}: LogoProps): ReactElement {
  const className = css`
    height: ${height}px;
    width: auto;
  `;

  const MarkComponent = knockout ? MonochromeLogoMark : RGBLogoMark;
  const fill = darkMode ? uiColors.white : uiColors.gray.dark3;

  return <MarkComponent {...rest} fill={fill} className={className} />;
}

LogoMark.displayName = 'LogoMark';

LogoMark.propTypes = {
  darkMode: PropTypes.bool,
  knockout: PropTypes.bool,
  height: PropTypes.number,
};

export default LogoMark;
