import { OneOf } from './index';

describe('packages/lib', () => {
  describe('OneOf', () => {
    test('Basic usage', () => {
      type Test = OneOf<{ foo: number }, { bar: string }>;

      (function* (): Generator<Test, void, never> {
        yield { foo: 42 };
        // @ts-expect-error
        yield { foo: 'hello' };

        yield { bar: 'bar' };
        // @ts-expect-error
        yield { bar: 42 };

        // @ts-expect-error
        yield { foo: 42, bar: 'bar' };
        // @ts-expect-error
        yield {};
      });
    });

    test('Overlapping properties', () => {
      type Test = OneOf<
        { foo: number; same: string; fooOnly: number },
        { bar: string; same: string; barOnly: string }
      >;

      (function* (): Generator<Test, void, never> {
        yield { foo: 42, same: 'same', fooOnly: 42 };
        // @ts-expect-error
        yield { foo: 42, fooOnly: 42 };
        // @ts-expect-error
        yield { foo: 42, same: 'same' };
        // @ts-expect-error
        yield {
          foo: 42,
          same: 'same',
          fooOnly: 42,
          barOnly: 'barOnly',
        };

        yield { bar: 'bar', same: 'same', barOnly: 'barOnly' };
        // @ts-expect-error
        yield { bar: 'bar', barOnly: 'barOnly' };
        // @ts-expect-error
        yield { bar: 'bar', same: 'same' };
        yield {
          bar: 'bar',
          same: 'same',
          barOnly: 'barOnly',
          // @ts-expect-error
          fooOnly: '42',
        };
      });
    });

    test('Optional properties', () => {
      type Test = OneOf<
        { foo: number; same?: string; fooOnly?: number },
        { bar: string; same: string; barOnly?: string }
      >;

      (function* (): Generator<Test, void, never> {
        yield { foo: 42, same: 'same' };
        yield { foo: 42 };

        yield { bar: 'bar', same: 'same' };
        // @ts-expect-error
        yield { bar: 'bar', barOnly: 'barOnly' };

        // @ts-expect-error
        yield { foo: 42, bar: 'bar', same: 'same' };
        // @ts-expect-error
        yield { foo: 42, bar: 'bar' };
        // @ts-expect-error
        yield { same: 'same' };
      });
    });
  });
});
