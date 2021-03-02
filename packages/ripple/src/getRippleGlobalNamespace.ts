import { Options } from './utils';

export interface ModuleType {
  '@leafygreen-ui/ripple': {
    registeredRippleElements: Map<HTMLElement, Options>;
    setRippleListener: boolean;
  };
}

export type LGWindow = Window &
  typeof globalThis & {
    __LEAFYGREEN_UTILS__: {
      modules: ModuleType;
    };
  };

export function getRippleGlobalNamespace() {
  // Handles SSR
  if (typeof window === 'undefined') {
    return;
  }

  const defaultRippleParams = {
    setRippleListener: false,
    registeredRippleElements: new Map(),
  };

  if ((window as LGWindow).__LEAFYGREEN_UTILS__) {
    (window as LGWindow).__LEAFYGREEN_UTILS__.modules[
      '@leafygreen-ui/ripple'
    ] = defaultRippleParams;
  } else {
    const rippleModule = {
      '@leafygreen-ui/ripple': defaultRippleParams,
    };

    (window as LGWindow).__LEAFYGREEN_UTILS__ = { modules: rippleModule };
  }

  return (window as LGWindow).__LEAFYGREEN_UTILS__.modules[
    '@leafygreen-ui/ripple'
  ];
}
