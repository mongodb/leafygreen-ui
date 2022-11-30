import { Theme } from '@leafygreen-ui/lib';
import React from 'react';
import { Size } from './SegmentedControl/types';

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
