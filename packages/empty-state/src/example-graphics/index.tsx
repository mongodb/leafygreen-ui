import React from 'react';

import { Theme } from '@leafygreen-ui/lib';

import DarkModeFeature1 from './DarkModeFeature1.svg';
import DarkModeFeature2 from './DarkModeFeature2.svg';
import DarkModeFeature3 from './DarkModeFeature3.svg';
import LightModeFeature1 from './LightModeFeature1.svg';
import LightModeFeature2 from './LightModeFeature2.svg';
import LightModeFeature3 from './LightModeFeature3.svg';

type SVGComponentImport = React.FunctionComponent<
  React.SVGAttributes<SVGElement>
>;
interface SVGModuleImport {
  svg: string;
}

// Depending on the environment (and svg-loaders installed)
// svg imports will be imported as an object in test suites,
// or a FunctionComponent when used with svgr in Storybook or production
const mapSvg = (
  svg: SVGModuleImport | SVGComponentImport,
): React.ReactElement => {
  const Component: React.ReactElement | string =
    typeof svg === 'function'
      ? React.createElement(svg as SVGComponentImport)
      : React.createElement((svg as SVGModuleImport).svg);

  return Component;
};

export const graphics: Record<Theme, Array<React.ReactElement>> = {
  [Theme.Dark]: [DarkModeFeature1, DarkModeFeature2, DarkModeFeature3].map(
    mapSvg,
  ),
  [Theme.Light]: [LightModeFeature1, LightModeFeature2, LightModeFeature3].map(
    mapSvg,
  ),
};
