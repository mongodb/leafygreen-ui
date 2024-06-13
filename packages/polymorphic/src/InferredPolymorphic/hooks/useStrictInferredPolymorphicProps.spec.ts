import { PolymorphicAs } from '../../Polymorphic';

import { useStrictInferredPolymorphicProps } from './useStrictInferredPolymorphicProps';

const getRandAs = (): PolymorphicAs | undefined =>
  Math.random() > 0.5 ? 'div' : 'a';
const getProps = (anchor?: boolean): Record<string, any> =>
  anchor ? { href: 'mongodb.design' } : { foo: 'bar' };

describe('packages/polymorphic/getPolymorphicProps', () => {
  describe('explicit', () => {
    test('explicit `as="a"`', () => {
      const { as, href, ...rest } = useStrictInferredPolymorphicProps('a', {});
      expect(as).toBe('a');
      expect(href).toBeUndefined();

      // TS
      as satisfies PolymorphicAs;
      as satisfies 'a';
      href satisfies string;
      // can access anchor-only props
      rest.target satisfies string | undefined;
      rest.rel satisfies string | undefined;
    });

    test('explicit `as="a"` with href', () => {
      const { as, href, ...rest } = useStrictInferredPolymorphicProps('a', {
        href: 'mongodb.design',
      });
      expect(as).toBe('a');
      expect(href).toBe('mongodb.design');

      // TS
      as satisfies PolymorphicAs;
      as satisfies 'a';
      href satisfies string;
      rest.target satisfies string | undefined;
      rest.rel satisfies string | undefined;
    });

    test('explicit `as="button"`', () => {
      const { as, href, ...rest } = useStrictInferredPolymorphicProps(
        'button',
        {},
      );
      expect(as).toBe('button');
      expect(href).toBeUndefined();

      // TS
      as satisfies PolymorphicAs;
      as satisfies 'button';
      href satisfies string | undefined;
      // @ts-expect-error - target does not exist for explicit `button`
      rest.target;
    });
  });

  describe('inferred', () => {
    test('inferred as anchor', () => {
      const { as, href, ...rest } = useStrictInferredPolymorphicProps(
        undefined,
        {
          href: 'mongodb.design',
        },
      );
      expect(as).toBe('a');
      expect(href).toBe('mongodb.design');

      // TS
      as satisfies PolymorphicAs;
      as satisfies 'a';
      href satisfies string | undefined;
      rest.target satisfies string | undefined;
      rest.rel satisfies string | undefined;
    });

    test('inferred as default', () => {
      const { as, href, ...rest } = useStrictInferredPolymorphicProps(
        undefined,
        {
          id: 'id',
        },
        'span',
      );
      expect(as).toBe('span');
      expect(href).toBeUndefined();

      // TS
      as satisfies PolymorphicAs;
      as satisfies 'span';
      href satisfies string | undefined;
      // @ts-expect-error
      rest.target;
    });

    test('inferred as fallback', () => {
      const { as, href, ...rest } = useStrictInferredPolymorphicProps(
        undefined,
        {
          id: 'id',
        },
      );
      expect(as).toBe('div');
      expect(href).toBeUndefined();

      // TS
      as satisfies PolymorphicAs;
      as satisfies 'div';
      href satisfies string | undefined;
      // @ts-expect-error
      rest.target;
    });
  });

  describe('arbitrary as prop', () => {
    test('without href', () => {
      const asProp = getRandAs();

      const { as, href, ...rest } = useStrictInferredPolymorphicProps(
        asProp,
        {},
      );
      expect(as).toBe(asProp);
      expect(href).toBeUndefined();
      // TS
      as satisfies PolymorphicAs;
      as satisfies typeof asProp;
      href satisfies string | undefined;
      // @ts-expect-error - since rest is explicitly defined
      rest.target;
    });

    test('with href', () => {
      const asProp = getRandAs();

      const { as, href, ...rest } = useStrictInferredPolymorphicProps(asProp, {
        href: 'mongodb.design',
      });
      expect(as).toBe('a');
      expect(href).toBe('mongodb.design');
      // TS
      as satisfies PolymorphicAs;
      as satisfies 'a';
      href satisfies string;
      rest.target satisfies string | undefined;
    });
  });

  describe('arbitrary props', () => {
    test('without href', () => {
      const asProp = getRandAs();
      const props = getProps(false);

      const { as, href, ...rest } = useStrictInferredPolymorphicProps(
        asProp,
        props,
      );
      expect(as).toBe(asProp);
      expect(href).toBeUndefined();
      // TS
      as satisfies PolymorphicAs;
      as satisfies typeof asProp;
      href satisfies string | undefined;
      rest.target satisfies string | undefined;
    });

    test('with href', () => {
      const asProp = getRandAs();
      const props = getProps(true);

      const { as, href, ...rest } = useStrictInferredPolymorphicProps(
        asProp,
        props,
      );
      expect(as).toBe('a');
      expect(href).toBe('mongodb.design');
      // TS
      as satisfies PolymorphicAs;
      as satisfies typeof asProp; // we can't know at the TS level that href exists
      href satisfies string | undefined;
      rest.target satisfies string | undefined;
    });
  });
});
