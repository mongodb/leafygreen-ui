import { getRippleGlobalNamespace, LGWindow } from './getRippleGlobalNamespace';

type Global = Omit<LGWindow, 'name'>;

const lgNamespace = '__LEAFYGREEN_UTILS__';

describe('getRippleGlobalNamespace', () => {
  describe(`when ${lgNamespace} namespace has not yet been defined`, () => {
    test(`it appends ${lgNamespace} to the window`, () => {
      getRippleGlobalNamespace();
      expect(global).toHaveProperty(lgNamespace);
    });
  });

  describe(`when ${lgNamespace} is already defined`, () => {
    beforeAll(() => {
      ((global as unknown) as Global)[lgNamespace].modules[
        '@leafygreen-ui/button'
      ] = { present: true };
    });

    afterAll(() => {
      delete ((global as unknown) as Global)[lgNamespace];
    });

    test('it adds the @leafygreen-ui/ripple module to the namespace', () => {
      getRippleGlobalNamespace();
      expect(
        ((global as unknown) as Global)[lgNamespace].modules,
      ).toHaveProperty('@leafygreen-ui/ripple');
    });

    test('it initializes the @leafygreen-ui/ripple module correctly', () => {
      const rippleNamespace = getRippleGlobalNamespace();
      expect(rippleNamespace).toStrictEqual({
        setRippleListener: false,
        registeredRippleElements: new Map(),
      });
    });

    test('it does not overwrite existing modules', () => {
      getRippleGlobalNamespace();
      expect(
        ((global as unknown) as Global)[lgNamespace].modules,
      ).toHaveProperty('@leafygreen-ui/button');
    });
  });
});
