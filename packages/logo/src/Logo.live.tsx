import React from 'react';
import { Body } from '@leafygreen-ui/typography';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';
import { css } from '@leafygreen-ui/emotion';
import AtlasLogo from './AtlasLogo';
import ChartsLogo from './ChartsLogo';
import RealmLogo from './RealmLogo';
import CloudManagerLogo from './CloudManagerLogo';
import Logo from './Logo';
import { LogoProps } from './utils';
import LogoMark from './LogoMark';
import { uiColors } from '@leafygreen-ui/palette';
import { ProductLogoProps } from './utils';

const flexContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const logoContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const productLogoPadding = css`
  padding: 8px;
`;

const knobsConfig: KnobsConfigInterface<Partial<
  LogoProps & ProductLogoProps
>> = {
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

const LogoLiveExample = () => {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {(props: LogoProps & ProductLogoProps) => (
        <div className={flexContainer}>
          <div className={logoContainer}>
            <Body
              className={css`
                margin-bottom: 10px;
                color: ${props.darkMode ? uiColors.white : uiColors.gray.dark3};
              `}
              weight="medium"
            >
              Logo
            </Body>
            <Logo
              darkMode={props.darkMode}
              knockout={props.knockout}
              height={props.height}
            />
          </div>
          <div className={logoContainer}>
            <Body
              className={css`
                margin-bottom: 10px;
                color: ${props.darkMode ? uiColors.white : uiColors.gray.dark3};
              `}
              weight="medium"
            >
              LogoMark
            </Body>
            <LogoMark
              darkMode={props.darkMode}
              knockout={props.knockout}
              height={props.height}
            />
          </div>
          <div className={logoContainer}>
            <Body
              className={css`
                margin-bottom: 10px;
                color: ${props.darkMode ? uiColors.white : uiColors.gray.dark3};
              `}
              weight="medium"
            >
              Product Logos
            </Body>
            <div>
              <AtlasLogo
                className={productLogoPadding}
                knockout={props.knockout}
                size={props.size}
              />
              <ChartsLogo
                className={productLogoPadding}
                knockout={props.knockout}
                size={props.size}
              />
              <RealmLogo
                className={productLogoPadding}
                knockout={props.knockout}
                size={props.size}
              />
              <CloudManagerLogo
                className={productLogoPadding}
                knockout={props.knockout}
                size={props.size}
              />
            </div>
          </div>
        </div>
      )}
    </LiveExample>
  );
};

export { LogoLiveExample };
