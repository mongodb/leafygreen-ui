import React from 'react';

import { Theme } from '@leafygreen-ui/lib';

import { default as DarkModeFeature1 } from './DarkModeFeature1.svg';
import { default as DarkModeFeature2 } from './DarkModeFeature2.svg';
import { default as DarkModeFeature3 } from './DarkModeFeature3.svg';
import { default as LightModeFeature1 } from './LightModeFeature1.svg';
import { default as LightModeFeature2 } from './LightModeFeature2.svg';
import { default as LightModeFeature3 } from './LightModeFeature3.svg';

// svg will be imported as an object in test suites, and ReactElement when used with svgr
export const graphics: Record<Theme, Array<any>> = {
  [Theme.Dark]: [
    <DarkModeFeature1.svg key="cloud-feature" viewBox="0 0 72 72" />,
    <DarkModeFeature2.svg key="serverless-feature" viewBox="0 0 72 72" />,
    <DarkModeFeature3.svg key="security-feature" viewBox="0 0 72 72" />,
  ],
  [Theme.Light]: [
    <LightModeFeature1.svg key="cloud-feature" viewBox="0 0 72 72" />,
    <LightModeFeature2.svg key="serverless-feature" viewBox="0 0 72 72" />,
    <LightModeFeature3.svg key="security-feature" viewBox="0 0 72 72" />,
  ],
};
