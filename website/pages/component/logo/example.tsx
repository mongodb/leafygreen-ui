import React from 'react';
import { css } from 'emotion';
import { Overline } from '@leafygreen-ui/typography';
import {
  AtlasLogo,
  ChartsLogo,
  RealmLogo,
  CloudManagerLogo,
  Logo,
  LogoMark,
  AtlasLogoMark,
  ChartsLogoMark,
  CloudManagerLogoMark,
  DriversConnectorsLogoMark,
  CompassLogoMark,
  ServerLogoMark,
  RealmLogoMark,
} from '@leafygreen-ui/logo';
import { spacing } from '@leafygreen-ui/tokens';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const overlineStyle = css`
  margin-bottom: ${spacing[3]}px;
`;

const logoContainer = css`
  margin-bottom: 36px;
`;

const leftMargin = css`
  margin-left: ${spacing[4]}px;
`;

// When interface is used, ts complains that index signature is missing
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type LogoProps = {
  knockout: boolean;
  darkMode: boolean;
  product: 'none' | 'atlas' | 'charts' | 'cloudManager' | 'realm';
  lockup: 'default' | 'stacked';
};

const knobsConfig: KnobsConfigInterface<LogoProps> = {
  knockout: {
    type: 'boolean',
    default: false,
    label: 'Knockout',
  },
  darkMode: {
    type: 'boolean',
    default: false,
    label: 'Dark Mode',
  },
  product: {
    type: 'select',
    default: 'none',
    options: ['none', 'atlas', 'charts', 'cloudManager', 'realm'],
    label: 'Product',
  },
  lockup: {
    type: 'select',
    default: 'default',
    options: ['default', 'stacked'],
    label: 'Lockup',
  },
};

export default function LogoLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({ darkMode, knockout, product, lockup }) => (
        <div>
          <Overline className={overlineStyle}>Product Logos</Overline>
          <div className={logoContainer}>
            <AtlasLogo height={64} knockout={knockout} darkMode={darkMode} />
            <ChartsLogo
              height={64}
              knockout={knockout}
              darkMode={darkMode}
              className={leftMargin}
            />
            <CloudManagerLogo
              height={64}
              knockout={knockout}
              darkMode={darkMode}
              className={leftMargin}
            />
            <RealmLogo
              height={64}
              knockout={knockout}
              darkMode={darkMode}
              className={leftMargin}
            />
          </div>

          <Overline className={overlineStyle}>Product LogoMarks</Overline>
          <div className={logoContainer}>
            <AtlasLogoMark darkMode={darkMode} knockout={knockout} size={32} />
            <ChartsLogoMark
              darkMode={darkMode}
              knockout={knockout}
              size={32}
              className={leftMargin}
            />
            <CloudManagerLogoMark
              darkMode={darkMode}
              knockout={knockout}
              size={32}
              className={leftMargin}
            />
            <CompassLogoMark
              darkMode={darkMode}
              knockout={knockout}
              size={32}
              className={leftMargin}
            />
            <DriversConnectorsLogoMark
              darkMode={darkMode}
              knockout={knockout}
              size={32}
              className={leftMargin}
            />
            <RealmLogoMark
              darkMode={darkMode}
              knockout={knockout}
              size={32}
              className={leftMargin}
            />
            <ServerLogoMark
              darkMode={darkMode}
              knockout={knockout}
              size={32}
              className={leftMargin}
            />
          </div>

          <Overline className={overlineStyle}>Logo</Overline>
          <div className={logoContainer}>
            <Logo
              darkMode={darkMode}
              knockout={knockout}
              product={product}
              lockup={lockup}
            />
          </div>

          <Overline className={overlineStyle}>LogoMark</Overline>
          <div className={logoContainer}>
            <LogoMark darkMode={darkMode} knockout={knockout} />
          </div>
        </div>
      )}
    </LiveExample>
  );
}
