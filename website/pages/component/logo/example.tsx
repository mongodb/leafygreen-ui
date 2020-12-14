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
} from '@leafygreen-ui/logo';
import { uiColors } from '@leafygreen-ui/palette';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const flexContainer = css`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-x: auto;
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
    label: 'Dark Mode - Logo and Logo Mark',
  },
  height: {
    type: 'number',
    default: 40,
    label: 'Height - Logo and Logo Mark',
  },
  size: {
    type: 'number',
    default: 32,
    label: 'Size - Product Logo',
  },
};

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
              Logo Mark
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
                className={css`
                  padding: 8px 8px 8px 0;
                `}
                knockout={knockout}
                size={size}
                color={darkMode ? uiColors.white : uiColors.gray.dark3}
              />
              <ChartsLogo
                className={productLogoPadding}
                knockout={knockout}
                size={size}
                color={darkMode ? uiColors.white : uiColors.gray.dark3}
              />
              <RealmLogo
                className={productLogoPadding}
                knockout={knockout}
                size={size}
                color={darkMode ? uiColors.white : uiColors.gray.dark3}
              />
              <CloudManagerLogo
                className={productLogoPadding}
                knockout={knockout}
                size={size}
                color={darkMode ? uiColors.white : uiColors.gray.dark3}
              />
            </div>
          </div>
        </div>
      )}
    </LiveExample>
  );
}
