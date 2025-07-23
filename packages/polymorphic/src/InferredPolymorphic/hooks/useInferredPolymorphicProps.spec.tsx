import React from 'react';

import { PolymorphicAs } from '../../Polymorphic';
import { NodeUrlLike } from '../../utils/Polymorphic.utils';

import { useInferredPolymorphicProps } from './useInferredPolymorphicProps';

const TestAnchorLike = ((_props: { href: string }) => (
  <></>
)) satisfies PolymorphicAs;
const TestNodeURLAnchorLike = ((_props: { href: NodeUrlLike }) => (
  <></>
)) satisfies PolymorphicAs;

const TestArbitraryComponent = ((_props: { someProp: any }) => (
  <></>
)) satisfies PolymorphicAs;

describe('packages/polymorphic/useInferredPolymorphicProps', () => {
  describe('explicit `as` prop', () => {
    test('as = "a"', () => {
      const { as, ...rest } = useInferredPolymorphicProps('a', {});
      expect(as).toBe('a');
      expect(rest.href).toBeUndefined();
    });

    test('as = "a" with href', () => {
      const { as, ...rest } = useInferredPolymorphicProps('a', {
        href: 'mongodb.design',
      });
      expect(as).toBe('a');
      expect(rest.href).toBe('mongodb.design');
    });

    test('as = "button"', () => {
      const { as, ...rest } = useInferredPolymorphicProps('button', {});
      expect(as).toBe('button');
      expect(rest.href).toBeUndefined();
    });

    test('as TestAnchorLike', () => {
      const { as, ...rest } = useInferredPolymorphicProps(TestAnchorLike, {
        href: 'foo',
      });

      expect(as).toBe(TestAnchorLike);
      expect(rest.href).toBe('foo');
    });

    test('as TestNodeURLAnchorLike', () => {
      const { as, ...rest } = useInferredPolymorphicProps(
        TestNodeURLAnchorLike,
        {
          href: { hostname: 'foobar' },
        },
      );
      expect(as).toBe(TestNodeURLAnchorLike);
      expect(rest.href).toEqual({ hostname: 'foobar' });
    });

    test('as TestArbitraryComponent', () => {
      const { as, ...rest } = useInferredPolymorphicProps(
        TestArbitraryComponent,
        {
          someProp: 'foo',
        },
      );
      expect(as).toBe(TestArbitraryComponent);
      expect(rest.href).toBeUndefined();
      expect(rest.someProp).toBe('foo');
    });
  });

  describe('undefined `as` prop', () => {
    test('inferred as default', () => {
      const { as, ...rest } = useInferredPolymorphicProps(
        undefined,
        {
          id: 'id',
        },
        'span',
      );
      expect(as).toBe('span');
      expect(rest?.href).toBeUndefined();
    });

    test('inferred as fallback', () => {
      const { as, ...rest } = useInferredPolymorphicProps(undefined, {
        id: 'id',
      });
      expect(as).toBe('div');
      expect(rest?.href).toBeUndefined();
    });
  });

  describe('inferred', () => {
    test('inferred as anchor', () => {
      const { as, ...rest } = useInferredPolymorphicProps(undefined, {
        href: 'mongodb.design',
      });
      expect(as).toBe('a');
      expect(rest).toBeDefined();
      expect(rest.href).toBe('mongodb.design');
    });

    test('`href` DOES NOT override provided `as` arg', () => {
      const { as, ...rest } = useInferredPolymorphicProps('button', {
        href: 'mongodb.design',
      });
      expect(as).toBe('button');
      expect(rest).toBeDefined();
      expect(rest.href).toBe('mongodb.design');
    });

    test('inferred `href` overrides default arg', () => {
      const { as, ...rest } = useInferredPolymorphicProps(
        undefined,
        {
          href: 'mongodb.design',
        },
        'span',
      );
      expect(as).toBe('a');
      expect(rest).toBeDefined();
      expect(rest.href).toBe('mongodb.design');
    });
  });
});
