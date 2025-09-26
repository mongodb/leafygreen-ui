/**
 * Disabling `react/jsx-key` lets us pass `children` as an Iterable<ReactNode> directly to the test function
 * instead of needing to wrap everything in a Fragment,
 * which is not representative of real use-cases
 */
/* eslint-disable react/jsx-key */
import React, { Fragment } from 'react';
import styled from '@emotion/styled';

import { findChildren } from './findChildren';

// Test components
const Foo = React.forwardRef<HTMLDivElement, { text: string }>(
  ({ text }, ref) => <div ref={ref}>{text}</div>,
);
Foo.displayName = 'Foo';

const Bar = React.forwardRef<HTMLDivElement, { text: string }>(
  ({ text }, ref) => <div ref={ref}>{text}</div>,
);
Bar.displayName = 'Bar';

const Baz = React.forwardRef<HTMLDivElement, { text: string }>(
  ({ text }, ref) => <div ref={ref}>{text}</div>,
);
Baz.displayName = 'Baz';

// Add static properties to test components with type assertion
(Foo as any).isFoo = true;
(Bar as any).isBar = true;
(Baz as any).isBaz = true;

describe('packages/lib/findChildren', () => {
  describe('basic functionality', () => {
    it('should find all children with matching static property', () => {
      const children = [
        <Foo text="first" />,
        <Bar text="second" />,
        <Foo text="third" />,
        <Baz text="fourth" />,
        <Foo text="fifth" />,
      ];

      const found = findChildren(children, 'isFoo');
      expect(found).toHaveLength(3);
      expect(found[0].props.text).toBe('first');
      expect(found[1].props.text).toBe('third');
      expect(found[2].props.text).toBe('fifth');
    });

    it('should return empty array if no children match', () => {
      const children = [<Foo text="first" />, <Bar text="second" />];

      const found = findChildren(children, 'isBaz');
      expect(found).toEqual([]);
    });

    it('should find single matching child', () => {
      const children = [
        <Foo key="1" text="only-foo" />,
        <Bar key="2" text="second" />,
      ];

      const found = findChildren(children, 'isFoo');
      expect(found).toHaveLength(1);
      expect(found[0].props.text).toBe('only-foo');
    });
  });

  describe('empty and null children handling', () => {
    it('should handle null children', () => {
      const found = findChildren(null, 'isFoo');
      expect(found).toEqual([]);
    });

    it('should handle undefined children', () => {
      const found = findChildren(undefined, 'isFoo');
      expect(found).toEqual([]);
    });

    it('should handle empty fragment', () => {
      const children = <></>;
      const found = findChildren(children, 'isFoo');
      expect(found).toEqual([]);
    });

    it('should handle empty array children', () => {
      const children: Array<React.ReactElement> = [];
      const found = findChildren(children, 'isFoo');
      expect(found).toEqual([]);
    });
  });

  describe('Fragment handling', () => {
    it('should handle single-level fragment children', () => {
      const children = (
        <React.Fragment>
          <Foo text="foo-in-fragment" />
          <Bar text="bar-in-fragment" />
          <Foo text="another-foo" />
        </React.Fragment>
      );

      const found = findChildren(children, 'isFoo');
      expect(found).toHaveLength(2);
      expect(found[0].props.text).toBe('foo-in-fragment');
      expect(found[1].props.text).toBe('another-foo');
    });

    it('should NOT find children in deeply nested Fragments', () => {
      const children = (
        <React.Fragment>
          <Foo text="direct-foo" />
          <React.Fragment>
            <React.Fragment>
              <Foo text="deeply-nested-foo" />
            </React.Fragment>
          </React.Fragment>
          <Bar text="direct-bar" />
        </React.Fragment>
      );

      // Should only find direct children, not double-nested ones
      const found = findChildren(children, 'isFoo');
      expect(found).toHaveLength(1);
      expect(found[0].props.text).toBe('direct-foo');
    });
  });

  describe('styled components', () => {
    it('should work with styled components from @emotion/styled', () => {
      const StyledFoo = styled(Foo)`
        background-color: red;
        padding: 8px;
      `;

      const children = [
        <Foo text="regular-foo" />,
        <StyledFoo text="styled-foo" />,
        <StyledFoo text="styled-foo-two" />,
        <Bar text="regular-bar" />,
        <Foo text="another-foo" />,
      ];

      const found = findChildren(children, 'isFoo');
      expect(found).toHaveLength(4);
      expect(found.map(c => c.props.text)).toEqual([
        'regular-foo',
        'styled-foo',
        'styled-foo-two',
        'another-foo',
      ]);

      // Verify the styled component is actually styled
      const styledComponent = found[1];
      const styledType = styledComponent.type as any;
      const hasEmotionProps = !!(
        styledType.target || styledType.__emotion_base
      );
      expect(hasEmotionProps).toBe(true);
    });
  });

  describe('search depth limitations', () => {
    it('should NOT find deeply nested components', () => {
      const children = [
        <Fragment>
          <Foo text="single-fragment" />
        </Fragment>,
        <Fragment>
          <Fragment>
            <Foo text="double-nested" />
          </Fragment>
        </Fragment>,
        <div>
          <Foo text="inside-div" />
        </div>,
        <Foo text="direct-child" />,
      ];

      const found = findChildren(children, 'isFoo');
      expect(found).toHaveLength(1);
      expect(found[0].props.text).toBe('direct-child');
    });
  });
});
