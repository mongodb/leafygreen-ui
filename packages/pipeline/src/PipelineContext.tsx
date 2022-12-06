import { createContext } from 'react';

import { Theme } from '@leafygreen-ui/lib';

import { Size } from './types';

interface PipelineData {
  theme: Theme;
  size: Size;
  intersectionNode: HTMLElement | null;
  isPipelineComponent: boolean;
}

export const PipelineContext = createContext<PipelineData>({
  theme: Theme.Light,
  size: Size.Normal,
  intersectionNode: null,
  isPipelineComponent: false,
});

export default PipelineContext;
