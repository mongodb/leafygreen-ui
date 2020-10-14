import SpyContext from './jest';
import { within } from './context';

const errorMatcher = /Error: Not implemented: navigation/;

export function silenceNavigationErrors<TResult>(
  fn: (waitForNavigation: () => Promise<void>) => TResult,
): TResult {
  return within(SpyContext.method(console, 'error'), spy => {
    spy.mockImplementation((...args: Parameters<typeof console.error>) => {
      if (!errorMatcher.test(args[0])) {
        spy.original(...args);
      }
    });

    return fn(() =>
      spy.waitForCall(([msg]: Parameters<typeof console.error>) =>
        errorMatcher.test(msg),
      ),
    );
  });
}
