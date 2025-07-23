import { Theme } from '@leafygreen-ui/lib';

export interface ThresholdLineProps {
  position: number;
  value: string;
  label?: string;
}

export interface GetThresholdLineConfig extends ThresholdLineProps {
  name: string;
  theme: Theme;
}
