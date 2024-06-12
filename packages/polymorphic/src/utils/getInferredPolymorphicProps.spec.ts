import { PolymorphicAs } from '../Polymorphic';

import { getInferredPolymorphicProps } from './getInferredPolymorphicProps';

const getRandAs = (): PolymorphicAs => (Math.random() > 0.5 ? 'div' : 'a');

describe('packages/polymorphic/getPolymorphicProps', () => {
  describe('explicit', () => {
    test('explicit `as="a"`', () => {
      const { as, href } = getInferredPolymorphicProps('a');
      expect(as).toBe('a');
      expect(href).toBeUndefined();
      // TS
      as satisfies PolymorphicAs;
      // as satisfies 'a';
    });

    test('explicit `as="a"` with href', () => {
      const { as, href } = getInferredPolymorphicProps('a', {
        href: 'mongodb.design',
      });
      expect(as).toBe('a');
      expect(href).toBe('mongodb.design');
      // TS
      as satisfies PolymorphicAs;
      // as satisfies 'a';
    });

    test('explicit `as="button"`', () => {
      const { as, href } = getInferredPolymorphicProps('button');
      expect(as).toBe('button');
      expect(href).toBeUndefined();
      // TS
      as satisfies PolymorphicAs;
      // as satisfies 'button';
    });
  });

  describe('inferred', () => {
    test('inferred as anchor', () => {
      const { as, href } = getInferredPolymorphicProps(undefined, {
        href: 'mongodb.design',
      });
      expect(as).toBe('a');
      expect(href).toBe('mongodb.design');

      // TS
      as satisfies PolymorphicAs;
      // as satisfies 'a';
    });

    test('inferred as default', () => {
      const { as, href } = getInferredPolymorphicProps(undefined, {
        id: 'some-id',
      });
      expect(as).toBe('a');
      expect(href).toBe('mongodb.design');

      // TS
      as satisfies PolymorphicAs;
      // as satisfies 'div';
    });
  });

  describe('arbitrary as prop', () => {
    test('without href', () => {
      const asProp = getRandAs();

      const { as, href } = getInferredPolymorphicProps(asProp);
      expect(as).toBe(asProp);
      expect(href).toBeUndefined();
      // TS
      as satisfies PolymorphicAs;
    });

    test('with href', () => {
      const asProp = getRandAs();

      const { as, href } = getInferredPolymorphicProps(asProp, {
        href: 'mongodb.design',
      });
      expect(as).toBe(asProp);
      expect(href).toBe('mongodb.design');
      // TS
      as satisfies PolymorphicAs;
    });
  });
});
