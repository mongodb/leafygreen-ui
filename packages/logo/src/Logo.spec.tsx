import React from 'react';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import {
  Logo,
  LogoMark,
  CloudManagerLogo,
  CloudManagerLogoMark,
  AtlasLogo,
  AtlasLogoMark,
  RealmLogo,
  RealmLogoMark,
  ChartsLogo,
  ChartsLogoMark,
  CompassLogoMark,
  DriversConnectorsLogoMark,
} from '.';
import ServerLogoMark from './ServerLogoMark';

type LogoComponents =
  | 'Logo'
  | 'LogoMark'
  | 'AtlasLogo'
  | 'AtlasLogoMark'
  | 'ChartsLogo'
  | 'ChartsLogoMark'
  | 'CloudManagerLogo'
  | 'CloudManagerLogoMark'
  | 'RealmLogo'
  | 'RealmLogoMark'
  | 'ServerLogoMark'
  | 'DriversConnectorsLogoMark'
  | 'CompassLogoMark';

const renderedComponents: Record<LogoComponents, JSX.Element> = {
  Logo: <Logo />,
  LogoMark: <LogoMark />,
  AtlasLogo: <AtlasLogo />,
  AtlasLogoMark: <AtlasLogoMark />,
  ChartsLogo: <ChartsLogo />,
  ChartsLogoMark: <ChartsLogoMark />,
  CloudManagerLogo: <CloudManagerLogo />,
  CloudManagerLogoMark: <CloudManagerLogoMark />,
  RealmLogo: <RealmLogo />,
  RealmLogoMark: <RealmLogoMark />,
  ServerLogoMark: <ServerLogoMark />,
  CompassLogoMark: <CompassLogoMark />,
  DriversConnectorsLogoMark: <DriversConnectorsLogoMark />,
} as const;

describe('packages/logo', () => {
  describe('a11y', () => {
    Object.keys(renderedComponents).map(component => {
      test(`${component} does not have any basic accessibility issues`, async () => {
        const { container } = render(
          renderedComponents[component as LogoComponents],
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
