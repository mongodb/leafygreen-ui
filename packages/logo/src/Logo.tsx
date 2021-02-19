import React from 'react';
import PropTypes from 'prop-types';
import { uiColors } from '@leafygreen-ui/palette';
import { css } from '@leafygreen-ui/emotion';
import DefaultRGBLogo from './logos/DefaultRGBLogo';
import DefaultMonochromeLogo from './logos/DefaultMonochromeLogo';
import AtlasDefaultRGBLogo from './logos/AtlasDefaultRGBLogo';
import AtlasDefaultMonochromeLogo from './logos/AtlasDefaultMonochromeLogo';
import AtlasStackedRGBLogo from './logos/AtlasStackedRBGLogo';
import AtlasStackedMonochromeLogo from './logos/AtlasStackedMonochromeLogo';
import ChartsDefaultRGBLogo from './logos/ChartsDefaultRGBLogo';
import ChartsDefaultMonochromeLogo from './logos/ChartsDefaultMonochromeLogo';
import ChartsStackedRGBLogo from './logos/ChartsStackedRGBLogo';
import ChartsStackedMonochromeLogo from './logos/ChartsStackedMonochromeLogo';
import CloudManagerDefaultRGBLogo from './logos/CloudManagerDefaultRGBLogo';
import CloudManagerDefaultMonochromeLogo from './logos/CloudManagerDefaultMonochromeLogo';
import CloudManagerStackedRGBLogo from './logos/CloudManagerStackedRGBLogo';
import CloudManagerStackedMonochromeLogo from './logos/CloudManagerStackedMonochromeLogo';
import RealmDefaultRGBLogo from './logos/RealmDefaultRGBLogo';
import RealmDefaultMonochromeLogo from './logos/RealmDefaultMonochromeLogo';
import RealmStackedRGBLogo from './logos/RealmStackedRGBLogo';
import RealmStackedMonochromeLogo from './logos/RealmStackedMonochromeLogo';
import { LogoProps, Product, Lockup, getAccessibleProps } from './utils';

const Color = {
  RGB: 'rgb',
  Knockout: 'knockout',
} as const;

type Color = typeof Color[keyof typeof Color];

type MapValue = Record<Lockup, { [k in Color]: (props: any) => JSX.Element }>;

type LogoMapType = Record<Product, MapValue> & {
  none: { [Lockup.Default]: { [k in Color]: (props: any) => JSX.Element } };
};

const LogoMap: LogoMapType = {
  none: {
    [Lockup.Default]: {
      [Color.RGB]: DefaultRGBLogo,
      [Color.Knockout]: DefaultMonochromeLogo,
    },
  },
  [Product.Atlas]: {
    [Lockup.Default]: {
      [Color.RGB]: AtlasDefaultRGBLogo,
      [Color.Knockout]: AtlasDefaultMonochromeLogo,
    },
    [Lockup.Stacked]: {
      [Color.RGB]: AtlasStackedRGBLogo,
      [Color.Knockout]: AtlasStackedMonochromeLogo,
    },
  },
  [Product.Charts]: {
    [Lockup.Default]: {
      [Color.RGB]: ChartsDefaultRGBLogo,
      [Color.Knockout]: ChartsDefaultMonochromeLogo,
    },
    [Lockup.Stacked]: {
      [Color.RGB]: ChartsStackedRGBLogo,
      [Color.Knockout]: ChartsStackedMonochromeLogo,
    },
  },
  [Product.CloudManager]: {
    [Lockup.Default]: {
      [Color.RGB]: CloudManagerDefaultRGBLogo,
      [Color.Knockout]: CloudManagerDefaultMonochromeLogo,
    },
    [Lockup.Stacked]: {
      [Color.RGB]: CloudManagerStackedRGBLogo,
      [Color.Knockout]: CloudManagerStackedMonochromeLogo,
    },
  },
  [Product.Realm]: {
    [Lockup.Default]: {
      [Color.RGB]: RealmDefaultRGBLogo,
      [Color.Knockout]: RealmDefaultMonochromeLogo,
    },
    [Lockup.Stacked]: {
      [Color.RGB]: RealmStackedRGBLogo,
      [Color.Knockout]: RealmStackedMonochromeLogo,
    },
  },
};

/**
 * # Logo
 *
 * React Component that displays MongoDB Logo.
 *
 * ```
<Logo />
```
 * @param props.darkMode Determines whether or not the <Logo /> will appear in dark mode.
 * @param props.knockout Boolean to describe whether or not knockout version of MongoDB logo will be used.
 * @param props.height Determines height of the <Logo /> component.
 */
function Logo({
  darkMode = false,
  knockout = false,
  height = 40,
  product = 'none',
  lockup = Lockup.Default,
  role = 'img',
  'aria-label': ariaLabel = 'MongoDB Logo',
  ...rest
}: LogoProps) {
  const className = css`
    width: auto;
    height: ${height}px;
  `;

  const color = knockout ? Color.Knockout : Color.RGB;
  const fill = darkMode ? uiColors.white : uiColors.gray.dark3;

  const Logo =
    product === 'none'
      ? LogoMap.none.default[color]
      : LogoMap[product][lockup][color];

  return (
    <Logo
      {...rest}
      {...getAccessibleProps({ 'aria-label': ariaLabel, role })}
      fill={fill}
      className={className}
    />
  );
}

Logo.displayName = 'Logo';

Logo.propTypes = {
  darkMode: PropTypes.bool,
  knockout: PropTypes.bool,
  height: PropTypes.number,
  product: PropTypes.oneOf([Object.values(Product)]),
  lockup: PropTypes.oneOf([Object.values(Lockup)]),
};

export default Logo;
