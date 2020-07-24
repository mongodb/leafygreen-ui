import { OneOf } from './index';

describe('packages/lib', () => {
  describe('OneOf', () => {
    test('Basic usage', () => {
      type Test = OneOf<{ foo: number }, { bar: string }>;

      const fooOkay: Test = { foo: 42 };
      // @ts-expect-error
      const fooBad: Test = { foo: 'hello' };

      const barOkay: Test = { bar: 'bar' };
      // @ts-expect-error
      const barBad: Test = { bar: 42 };

      // @ts-expect-error
      const bothBad: Test = { foo: 42, bar: 'bar' };
      // @ts-expect-error
      const neitherBad: Test = {};
    });

    test('Overlapping properties', () => {
      type Test = OneOf<
        { foo: number; same: string; fooOnly: number },
        { bar: string; same: string; barOnly: string }
      >;

      const fooOkay: Test = { foo: 42, same: 'same', fooOnly: 42 };
      // @ts-expect-error
      const fooMissingSameBad: Test = { foo: 42, fooOnly: 42 };
      // @ts-expect-error
      const fooMissingFooOnlyBad: Test = { foo: 42, same: 'same' };
      // @ts-expect-error
      const fooWithBarOnlyBad: Test = {
        foo: 42,
        same: 'same',
        fooOnly: 42,
        barOnly: 'barOnly',
      };

      const barOkay: Test = { bar: 'bar', same: 'same', barOnly: 'barOnly' };
      // @ts-expect-error
      const barMissingSameBad: Test = { bar: 'bar', barOnly: 'barOnly' };
      // @ts-expect-error
      const barMissingBarOnlyBad: Test = { bar: 'bar', same: 'same' };
      const barWithFooOnlyBad: Test = {
        bar: 'bar',
        same: 'same',
        barOnly: 'barOnly',
        // @ts-expect-error
        fooOnly: '42',
      };
    });

    test('Optional properties', () => {
      type Test = OneOf<
        { foo: number; same?: string; fooOnly?: number },
        { bar: string; same: string; barOnly?: string }
      >;

      const fooMissingFooOnlyOkay: Test = { foo: 42, same: 'same' };
      const fooMissingOthersOkay: Test = { foo: 42 };

      const barMissingBarOnlyOkay: Test = { bar: 'bar', same: 'same' };
      // @ts-expect-error
      const barMissingSameBad: Test = { bar: 'bar', barOnly: 'barOnly' };

      // @ts-expect-error
      const bothWithSameBad: Test = { foo: 42, bar: 'bar', same: 'same' };
      // @ts-expect-error
      const bothMissingSameBad: Test = { foo: 42, bar: 'bar' };
      // @ts-expect-error
      const neitherWithSameBad: Test = { same: 'same' };
    });
  });
});
