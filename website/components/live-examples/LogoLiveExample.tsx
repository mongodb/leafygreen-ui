import React from 'react';
import { css } from 'emotion';
import { Overline } from '@leafygreen-ui/typography';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';
import {
  AtlasLogo,
  ChartsLogo,
  RealmLogo,
  CloudManagerLogo,
  Logo,
  LogoMark,
} from '@leafygreen-ui/logo';
import { uiColors } from '@leafygreen-ui/palette';

const flexContainer = css`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

const logoContainer = css`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  margin-right: 64px;
`;

const productLogoPadding = css`
  padding: 8px;
`;

// When interface is used, ts complains that index signature is missing
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type LogoProps = {
  knockout: boolean;
  darkMode: boolean;
  height: number;
  size: number;
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
    label: 'Dark Mode - Logo and LogoMark',
  },
  height: {
    type: 'number',
    default: 40,
    label: 'Height - Logo and LogoMark',
  },
  size: {
    type: 'number',
    default: 32,
    label: 'Size - Product Logo',
  },
} as const;

export default function LogoLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({ darkMode, knockout, height, size }) => (
        <div className={flexContainer}>
          <div className={logoContainer}>
            {/* @ts-expect-error */}
            <Overline
              className={css`
                margin-bottom: 10px;
                color: ${darkMode ? uiColors.white : uiColors.gray.dark1};
              `}
              weight="medium"
            >
              Logo
            </Overline>
            <Logo darkMode={darkMode} knockout={knockout} height={height} />
          </div>
          <div className={logoContainer}>
            {/* @ts-expect-error */}
            <Overline
              className={css`
                margin-bottom: 10px;
                color: ${darkMode ? uiColors.white : uiColors.gray.dark1};
              `}
              weight="medium"
            >
              LogoMark
            </Overline>
            <LogoMark darkMode={darkMode} knockout={knockout} height={height} />
          </div>
          <div className={logoContainer}>
            {/* @ts-expect-error */}
            <Overline
              className={css`
                margin-bottom: 10px;
                color: ${darkMode ? uiColors.white : uiColors.gray.dark1};
              `}
              weight="medium"
            >
              Product Logos
            </Overline>
            <div>
              <AtlasLogo
                className={productLogoPadding}
                knockout={knockout}
                size={size}
              />
              <ChartsLogo
                className={productLogoPadding}
                knockout={knockout}
                size={size}
              />
              <RealmLogo
                className={productLogoPadding}
                knockout={knockout}
                size={size}
              />
              <CloudManagerLogo
                className={productLogoPadding}
                knockout={knockout}
                size={size}
              />
            </div>
          </div>
        </div>
      )}
    </LiveExample>
  );
}
