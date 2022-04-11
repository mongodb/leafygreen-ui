import { Options } from './utils';

export interface ModuleType {
  '@leafygreen-ui/ripple': {
    registeredRippleElements: WeakMap<HTMLElement, Options>;
    setRippleListener: boolean;
  };
}

type SetWindow = Window &
  typeof globalThis & {
    __LEAFYGREEN_UTILS__: {
      modules: {};
    };
  };

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
    registeredRippleElements: new WeakMap(),
  };

  (window as SetWindow).__LEAFYGREEN_UTILS__ ??= { modules: {} };

  (window as LGWindow).__LEAFYGREEN_UTILS__.modules['@leafygreen-ui/ripple'] =
    defaultRippleParams;

  return (window as LGWindow).__LEAFYGREEN_UTILS__.modules[
    '@leafygreen-ui/ripple'
  ];
}
