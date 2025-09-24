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

describe('findChildren', () => {
  describe('basic functionality', () => {
    it('should find all children with matching static property', () => {
      const children = (
        <>
          <Foo key="1" text="first" />,
          <Bar key="2" text="second" />,
          <Foo key="3" text="third" />,
          <Baz key="4" text="fourth" />,
          <Foo key="5" text="fifth" />,
        </>
      );

      const found = findChildren(children, 'isFoo');
      expect(found).toHaveLength(3);
      expect(found[0].props.text).toBe('first');
      expect(found[1].props.text).toBe('third');
      expect(found[2].props.text).toBe('fifth');
    });

    it('should return empty array if no children match', () => {
      const children = (
        <>
          <Foo key="1" text="first" />,
          <Bar key="2" text="second" />,
        </>
      );

      const found = findChildren(children, 'isBaz');
      expect(found).toEqual([]);
    });

    it('should find single matching child', () => {
      const children = (
        <>
          <Foo key="1" text="only-foo" />,
          <Bar key="2" text="second" />,
        </>
      );

      const found = findChildren(children, 'isFoo');
      expect(found).toHaveLength(1);
      expect(found[0].props.text).toBe('only-foo');
    });

    it('should work with different static properties', () => {
      const children = (
        <>
          <Foo key="1" text="foo1" />,
          <Bar key="2" text="bar1" />,
          <Foo key="3" text="foo2" />,
          <Bar key="4" text="bar2" />,
          <Baz key="5" text="baz1" />,
        </>
      );
      const fooChildren = findChildren(children, 'isFoo');
      const barChildren = findChildren(children, 'isBar');
      const bazChildren = findChildren(children, 'isBaz');

      expect(fooChildren).toHaveLength(2);
      expect(barChildren).toHaveLength(2);
      expect(bazChildren).toHaveLength(1);

      expect(fooChildren.map(c => c.props.text)).toEqual(['foo1', 'foo2']);
      expect(barChildren.map(c => c.props.text)).toEqual(['bar1', 'bar2']);
      expect(bazChildren.map(c => c.props.text)).toEqual(['baz1']);
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
    it('should find children inside single-child Fragments', () => {
      const children = (
        <>
          <Fragment key="1">
            <Foo text="foo-in-fragment" />
          </Fragment>
          <Fragment key="2">
            <Bar text="bar-in-fragment" />
          </Fragment>
          <Fragment key="3">
            <Foo text="another-foo" />
          </Fragment>
        </>
      );

      const found = findChildren(children, 'isFoo');
      expect(found).toHaveLength(2);
      expect(found[0].props.text).toBe('foo-in-fragment');
      expect(found[1].props.text).toBe('another-foo');
    });

    it('should handle mixed Fragment and non-Fragment children', () => {
      const children = (
        <>
          <Foo key="1" text="direct-foo" />
          <Fragment key="2">
            <Foo text="fragment-foo" />
          </Fragment>
          <Bar key="3" text="direct-bar" />
        </>
      );

      const found = findChildren(children, 'isFoo');
      expect(found).toHaveLength(2);
      expect(found.map(c => c.props.text)).toEqual([
        'direct-foo',
        'fragment-foo',
      ]);
    });

    it('should NOT find children in Fragments with multiple children', () => {
      const children = (
        <>
          <Foo key="1" text="direct-foo" />
          <Fragment key="2">
            <Foo text="foo-in-multi-fragment" />
            <Bar text="bar-in-multi-fragment" />
          </Fragment>
          <Bar key="3" text="direct-bar" />
        </>
      );

      // Should only find direct children, not those in multi-child fragments
      const fooFound = findChildren(children, 'isFoo');
      const barFound = findChildren(children, 'isBar');

      expect(fooFound).toHaveLength(1);
      expect(fooFound[0].props.text).toBe('direct-foo');
      expect(barFound).toHaveLength(1);
      expect(barFound[0].props.text).toBe('direct-bar');
    });
  });

  describe('styled components', () => {
    it('should work with styled components from @emotion/styled', () => {
      const StyledFoo = styled(Foo)`
        background-color: red;
        padding: 8px;
      `;

      const children = [
        <Foo key="1" text="regular-foo" />,
        <StyledFoo key="2" text="styled-foo" />,
        <Bar key="3" text="regular-bar" />,
        <Foo key="4" text="another-foo" />,
      ];

      const found = findChildren(children, 'isFoo');
      expect(found).toHaveLength(3);
      expect(found.map(c => c.props.text)).toEqual([
        'regular-foo',
        'styled-foo',
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

    it('should work with multiple styled components', () => {
      const StyledFoo = styled(Foo)`
        background-color: red;
      `;
      const StyledBar = styled(Bar)`
        color: blue;
      `;

      const children = (
        <>
          <Fragment key="1">
            <StyledFoo text="styled-foo1" />
          </Fragment>
          <Fragment key="2">
            <StyledBar text="styled-bar1" />
          </Fragment>
          <Fragment key="3">
            <StyledFoo text="styled-foo2" />
          </Fragment>
        </>
      );

      const fooFound = findChildren(children, 'isFoo');
      const barFound = findChildren(children, 'isBar');

      expect(fooFound).toHaveLength(2);
      expect(barFound).toHaveLength(1);
      expect(fooFound.map(c => c.props.text)).toEqual([
        'styled-foo1',
        'styled-foo2',
      ]);
      expect(barFound.map(c => c.props.text)).toEqual(['styled-bar1']);
    });
  });

  describe('static property edge cases', () => {
    it('should handle components with multiple static properties', () => {
      const MultiPropComponent = ({ text }: { text: string }) => (
        <div>{text}</div>
      );
      (MultiPropComponent as any).isPrimary = true;
      (MultiPropComponent as any).isSecondary = true;

      const children = (
        <>
          <Foo key="1" text="foo1" />
          <MultiPropComponent key="2" text="multi1" />
          <Bar key="3" text="bar1" />
          <MultiPropComponent key="4" text="multi2" />
        </>
      );

      const primaryFound = findChildren(children, 'isPrimary');
      const secondaryFound = findChildren(children, 'isSecondary');

      expect(primaryFound).toHaveLength(2);
      expect(secondaryFound).toHaveLength(2);
      expect(primaryFound.map(c => c.props.text)).toEqual(['multi1', 'multi2']);
      expect(secondaryFound.map(c => c.props.text)).toEqual([
        'multi1',
        'multi2',
      ]);
    });

    it('should handle falsy static property values', () => {
      const FalsyPropComponent = ({ text }: { text: string }) => (
        <div>{text}</div>
      );
      (FalsyPropComponent as any).isFalsy = false;

      const children = [
        <Foo key="1" text="foo1" />,
        <FalsyPropComponent key="2" text="falsy1" />,
        <FalsyPropComponent key="3" text="falsy2" />,
      ];

      // Should not find components with falsy static properties
      const found = findChildren(children, 'isFalsy');
      expect(found).toEqual([]);
    });

    it('should handle truthy non-boolean static property values', () => {
      const TruthyPropComponent = ({ text }: { text: string }) => (
        <div>{text}</div>
      );
      (TruthyPropComponent as any).isSpecial = 'yes';

      const children = [
        <Foo key="1" text="foo1" />,
        <TruthyPropComponent key="2" text="truthy1" />,
        <Bar key="3" text="bar1" />,
        <TruthyPropComponent key="4" text="truthy2" />,
      ];

      const found = findChildren(children, 'isSpecial');
      expect(found).toHaveLength(2);
      expect(found.map(c => c.props.text)).toEqual(['truthy1', 'truthy2']);
    });
  });

  describe('search depth limitations', () => {
    it('should NOT find deeply nested components', () => {
      const children = (
        <>
          {/* Nested fragment - isChildWithProperty won't find these */}
          <Fragment key="1">
            <Fragment>
              <Foo text="deeply-nested" />
            </Fragment>
          </Fragment>

          {/* Component inside div - isChildWithProperty won't find this */}
          <div key="2">
            <Foo text="inside-div" />
          </div>

          {/* Direct child - should find this */}
          <Foo key="3" text="direct-child" />

          {/* Single child in fragment - isChildWithProperty should find this */}
          <Fragment key="4">
            <Bar text="single-in-fragment" />
          </Fragment>
        </>
      );

      const found = findChildren(children, 'isFoo');
      expect(found).toHaveLength(1);
      expect(found[0].props.text).toBe('direct-child');

      const barFound = findChildren(children, 'isBar');
      expect(barFound).toHaveLength(1);
      expect(barFound[0].props.text).toBe('single-in-fragment');
    });

    it('should not find components in Fragments with multiple children', () => {
      const children = (
        <>
          <Foo key="1" text="direct-foo" />
          <Fragment key="2">
            <Foo text="foo-in-multi-fragment" />
            <Bar text="bar-in-multi-fragment" />
          </Fragment>
          <Bar key="3" text="direct-bar" />
        </>
      );

      // Should only find direct children, not those in multi-child fragments
      const fooFound = findChildren(children, 'isFoo');
      const barFound = findChildren(children, 'isBar');

      expect(fooFound).toHaveLength(1);
      expect(fooFound[0].props.text).toBe('direct-foo');
      expect(barFound).toHaveLength(1);
      expect(barFound[0].props.text).toBe('direct-bar');
    });
  });
});
