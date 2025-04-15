import type { PACKAGE_NAME } from './types';

// Essential packages that provide core functionality
export const ESSENTIAL_PACKAGES = [
  '@leafygreen-ui/leafygreen-provider',
  '@leafygreen-ui/emotion',
  '@leafygreen-ui/lib',
] as const satisfies Readonly<Array<PACKAGE_NAME>>;
