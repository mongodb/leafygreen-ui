import type { ReactNode } from 'react';
import React from 'react';
//@ts-ignore Cannot find module 'react-dom/client' or its corresponding type declarations
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { act } from 'react-dom/test-utils';

export interface renderHookServerOptions {
  wrapper?: ({ children }: { children: ReactNode }) => JSX.Element;
}

export interface renderHookServerResult<Hook extends () => any> {
  result: { current: ReturnType<Hook> };
  hydrate: () => void;
}

/**
 * Allows you to mock the server side rendering of a hook.
 *
 * @testing-library/react-hooks/server exposed a `renderHook` method
 * that allowed for one to render hooks as if SSR, and control
 * hydration. This is no longer supported in versions >=18.
 *
 * This code was extracted from @testing-library/react-hooks/server and
 * updated to be compatible with React version >= 18 using `hydrateRoot`.
 *
 * More context found here:
 * https://github.com/testing-library/react-testing-library/issues/1120
 *
 * e.g.
 * ```typescript
 *   it('should return true when server-side rendered and false after hydration', () => {
 *     const { result, hydrate } = renderHookServer(useMyHook);
 *     expect(result.current).toBe(true);
 *     hydrate();
 *     expect(result.current).toBe(false);
 *   });
 * ```
}
 */
export function renderHookServer<Hook extends () => any>(
  useHook: Hook,
  { wrapper: Wrapper }: renderHookServerOptions = {},
): renderHookServerResult<Hook> {
  // Store hook return value
  const results: Array<ReturnType<Hook>> = [];
  const result = {
    get current() {
      return results.slice(-1)[0];
    },
  };

  // Test component to render hook in
  const Component = ({ useHook }: { useHook: Hook }) => {
    results.push(useHook());
    return null;
  };

  // Add wrapper if necessary
  const component = Wrapper ? (
    <Wrapper>
      <Component useHook={useHook} />
    </Wrapper>
  ) : (
    <Component useHook={useHook} />
  );

  // Running tests in an environment that simulates a browser (like Jest with jsdom),
  // the window object will still be available even when server rendered. To ensure
  // that window is not available during SSR we need to explicitly mock or remove the
  // window object.
  // @ts-ignore Type 'undefined' is not assignable to type 'Window'.
  jest.spyOn(global, 'window', 'get').mockImplementation(() => undefined);

  // Render hook on server
  const serverOutput = renderToString(component);

  // Restore window
  jest.spyOn(global, 'window', 'get').mockRestore();

  // Render hook on client
  const hydrate = () => {
    const root = document.createElement('div');
    root.innerHTML = serverOutput;
    act(() => {
      hydrateRoot(root, component);
    });
  };

  return {
    result,
    hydrate,
  };
}
