import { spyContext } from './jest';
import { within } from './context';

const realConsoleError = console.error;

export function silenceNavigationErrors<TResult>(fn: () => TResult): TResult {
  return within(
    spyContext(console, 'error'),
    (resource: jest.SpiedFunction<typeof console.error>) => {
      resource.mockImplementation(
        (...args: Parameters<typeof console.error>) => {
          if (!/Error: Not implemented: navigation/.test(args[0])) {
            realConsoleError(...args);
          }
        },
      );
      return fn();
    },
  );
}
