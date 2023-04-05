import React, { ReactElement } from 'react';

import { Theme } from '@leafygreen-ui/lib';

import DarkModeFeature1 from './DarkModeFeature1.svg';
import DarkModeFeature2 from './DarkModeFeature2.svg';
import DarkModeFeature3 from './DarkModeFeature3.svg';
import LightModeFeature1 from './LightModeFeature1.svg';
import LightModeFeature2 from './LightModeFeature2.svg';
import LightModeFeature3 from './LightModeFeature3.svg';

export const thumbnails: Record<Theme, Array<ReactElement>> = {
  [Theme.Dark]: [
    <DarkModeFeature1 key="cloud-feature" viewBox="0 0 72 72" />,
    <DarkModeFeature2 key="serverless-feature" viewBox="0 0 72 72" />,
    <DarkModeFeature3 key="security-feature" viewBox="0 0 72 72" />,
  ],
  [Theme.Light]: [
    <LightModeFeature1 key="cloud-feature" viewBox="0 0 72 72" />,
    <LightModeFeature2 key="serverless-feature" viewBox="0 0 72 72" />,
    <LightModeFeature3 key="security-feature" viewBox="0 0 72 72" />,
  ],
};
