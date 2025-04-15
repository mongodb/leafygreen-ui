import { ALL_PACKAGES } from './ALL_PACKAGES';

// Essential packages that provide core functionality
export const ESSENTIAL_PACKAGES = [
  '@leafygreen-ui/leafygreen-provider',
  '@leafygreen-ui/emotion',
  '@leafygreen-ui/lib',
] as const satisfies Array<(typeof ALL_PACKAGES)[number]>;
