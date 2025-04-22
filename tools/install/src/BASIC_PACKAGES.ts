import { ESSENTIAL_PACKAGES } from './ESSENTIAL_PACKAGES';
import type { PACKAGE_NAME } from './types';

// Basic packages that include essentials plus commonly used components
// Basic packages that include essentials plus commonly used components
export const BASIC_PACKAGES = [
  ...ESSENTIAL_PACKAGES,
  '@leafygreen-ui/banner',
  '@leafygreen-ui/button',
  '@leafygreen-ui/card',
  '@leafygreen-ui/icon',
  '@leafygreen-ui/icon-button',
  '@leafygreen-ui/modal',
  '@leafygreen-ui/tokens',
  '@leafygreen-ui/typography',
] as const satisfies Readonly<Array<PACKAGE_NAME>>;
