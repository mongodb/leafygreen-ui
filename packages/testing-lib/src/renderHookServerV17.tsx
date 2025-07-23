import { renderHook } from '@testing-library/react-hooks/server';

import {
  RenderHookServerOptions,
  RenderHookServerResult,
} from './renderHookServer';

/**
 * Allows you to mock the server side rendering of a hook in pre React 18 versions.
 * For versions >=18, use `@testing-lib/renderHookServer`.
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
  { wrapper }: RenderHookServerOptions = {},
): RenderHookServerResult<Hook> {
  // @ts-ignore Type 'undefined' is not assignable to type 'Window'.
  jest.spyOn(global, 'window', 'get').mockImplementation(() => undefined);
  const response = renderHook(useHook, { wrapper });
  jest.spyOn(global, 'window', 'get').mockRestore();
  return response;
}
