import { DarkModeProps } from '@leafygreen-ui/lib';

export const Variant = {
  default: 'default',
  large: 'large',
  xlarge: 'xlarge',
  horizontal: 'horizontal',
};

export type Variant = typeof Variant[keyof typeof Variant];

export default interface SpinnerProps extends DarkModeProps {
  variant?: Variant;
  description?: string;
  sizeOverride?: number;
}
