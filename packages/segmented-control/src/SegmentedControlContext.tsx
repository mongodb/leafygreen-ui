import React from 'react';

import { Theme } from '@leafygreen-ui/lib';

import { Size } from './SegmentedControl/SegmentedControl.types';

interface SCContext {
  size: Size;
  theme: Theme;
  name: string;
  followFocus: boolean;
}
export const SegmentedControlContext = React.createContext<SCContext>({
  size: Size.Default,
  theme: Theme.Light,
  name: '',
  followFocus: true,
});
