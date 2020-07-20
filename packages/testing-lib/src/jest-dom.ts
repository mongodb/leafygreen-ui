import { spyContext, SpyHandle } from './jest';
import { within } from './context';

const realConsoleError = console.error;

const errorMatcher = /Error: Not implemented: navigation/;

export function silenceNavigationErrors<TResult>(
  fn: (waitForNavigation: () => Promise<void>) => TResult,
): TResult {
  return within(
    spyContext(console, 'error'),
    (spy: SpyHandle<typeof console, 'error'>) => {
      spy.mockImplementation((...args: Parameters<typeof console.error>) => {
        if (!errorMatcher.test(args[0])) {
          realConsoleError(...args);
        }
      });
      return fn(() =>
        spy.waitForCall(([msg]: Parameters<typeof console.error>) =>
          errorMatcher.test(msg),
        ),
      );
    },
  );
}
