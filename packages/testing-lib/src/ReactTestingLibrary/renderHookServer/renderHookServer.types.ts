import { ReactNode } from 'react';

export interface RenderHookServerOptions {
  wrapper?: ({ children }: { children: ReactNode }) => JSX.Element;
}

export interface RenderHookServerResult<Hook extends () => any> {
  result: { current: ReturnType<Hook> };
  hydrate: () => void;
}
