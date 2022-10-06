import { createContext } from 'react';
import { Theme } from '@leafygreen-ui/lib';

interface PipelineData {
  theme: Theme;
}

export const PipelineContext = createContext<PipelineData>({
  theme: Theme.Light,
});

export default PipelineContext;

// TODO: not using context check
