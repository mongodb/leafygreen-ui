import { Options } from './utils';

interface ModuleType {
  '@leafygreen-ui/ripple': {
    registeredRippleElements: Map<HTMLElement, Options>;
    setRippleListener: boolean;
  };
}

type LGWindow = Window &
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

  if ((window as LGWindow).__LEAFYGREEN_UTILS__) {
    (window as LGWindow).__LEAFYGREEN_UTILS__.modules[
      '@leafygreen-ui/ripple'
    ] = {
      setRippleListener: false,
      registeredRippleElements: new Map(),
    };
  } else {
    const rippleModule = {
      '@leafygreen-ui/ripple': {
        setRippleListener: false,
        registeredRippleElements: new Map(),
      },
    };

    (window as LGWindow).__LEAFYGREEN_UTILS__ = { modules: rippleModule };
  }

  return (window as LGWindow).__LEAFYGREEN_UTILS__.modules[
    '@leafygreen-ui/ripple'
  ];
}
