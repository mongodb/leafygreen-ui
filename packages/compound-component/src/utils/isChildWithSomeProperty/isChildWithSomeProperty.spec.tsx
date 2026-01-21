import React, { Fragment } from 'react';
import styled from '@emotion/styled';

import { isChildWithSomeProperty } from './isChildWithSomeProperty';

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

describe('isChildWithSomeProperty', () => {
  describe('basic component property checking', () => {
    test('should return true when child has the specified static property', () => {
      const element = <Foo text="test" />;
      expect(isChildWithSomeProperty(element, 'isFoo')).toBe(true);
    });

    test('should return false when child does not have the specified static property', () => {
      const element = <Foo text="test" />;
      expect(isChildWithSomeProperty(element, 'isBar')).toBe(false);
    });
  });

  describe('array of properties', () => {
    test('should return true when child has any of the specified static properties', () => {
      const fooElement = <Foo text="test" />;
      const barElement = <Bar text="test" />;

      expect(isChildWithSomeProperty(fooElement, ['isFoo', 'isBar'])).toBe(
        true,
      );
      expect(isChildWithSomeProperty(barElement, ['isFoo', 'isBar'])).toBe(
        true,
      );
    });

    test('should return false when child has none of the specified static properties', () => {
      const bazElement = <Baz text="test" />;

      expect(isChildWithSomeProperty(bazElement, ['isFoo', 'isBar'])).toBe(
        false,
      );
    });

    test('should return true when child has at least one property from the array', () => {
      const fooElement = <Foo text="test" />;

      expect(
        isChildWithSomeProperty(fooElement, ['isFoo', 'isBar', 'isBaz']),
      ).toBe(true);
    });

    test('should handle empty array', () => {
      const fooElement = <Foo text="test" />;

      expect(isChildWithSomeProperty(fooElement, [])).toBe(false);
    });

    test('should handle single-element array same as string', () => {
      const fooElement = <Foo text="test" />;

      expect(isChildWithSomeProperty(fooElement, ['isFoo'])).toBe(true);
      expect(isChildWithSomeProperty(fooElement, ['isBar'])).toBe(false);
    });
  });

  describe('non-React element handling', () => {
    test('should return false for non-React elements', () => {
      expect(isChildWithSomeProperty('string' as any, 'isFoo')).toBe(false);
      expect(isChildWithSomeProperty(123 as any, 'isFoo')).toBe(false);
      expect(isChildWithSomeProperty(null, 'isFoo')).toBe(false);
      expect(isChildWithSomeProperty(undefined, 'isFoo')).toBe(false);
      expect(isChildWithSomeProperty(true as any, 'isFoo')).toBe(false);
      expect(isChildWithSomeProperty({} as any, 'isFoo')).toBe(false);
      expect(isChildWithSomeProperty([] as any, 'isFoo')).toBe(false);
    });
  });

  describe('Fragment handling', () => {
    test('should return false when root element is a fragment', () => {
      const fragmentElement = (
        <Fragment>
          <Foo text="inside fragment" />
        </Fragment>
      );
      expect(isChildWithSomeProperty(fragmentElement, 'isFoo')).toBe(false);
    });

    test('should handle empty Fragment', () => {
      const emptyFragment = <Fragment />;
      expect(isChildWithSomeProperty(emptyFragment, 'isFoo')).toBe(false);
    });

    test('should handle Fragment with non-element children', () => {
      const fragmentWithText = <Fragment>text content</Fragment>;
      expect(isChildWithSomeProperty(fragmentWithText, 'isFoo')).toBe(false);
    });

    test('should NOT handle nested Fragments recursively', () => {
      const nestedFragment = (
        <Fragment>
          <Fragment>
            <Foo text="nested single child" />
          </Fragment>
        </Fragment>
      );

      // Should recursively find Foo through the nested single child fragments
      expect(isChildWithSomeProperty(nestedFragment, 'isFoo')).toBe(false);
      expect(isChildWithSomeProperty(nestedFragment, 'isBar')).toBe(false);
    });
  });

  describe('native HTML elements', () => {
    test('should return false for native HTML elements without static properties', () => {
      const divElement = <div>content</div>;
      const spanElement = <span>content</span>;

      expect(isChildWithSomeProperty(divElement, 'isFoo')).toBe(false);
      expect(isChildWithSomeProperty(spanElement, 'isBar')).toBe(false);
    });
  });

  describe('styled components', () => {
    test('should work with styled components from @emotion/styled', () => {
      // Create a real styled component using the actual styled() function
      const StyledFoo = styled(Foo)`
        background-color: red;
        padding: 8px;
      `;

      const styledElement = <StyledFoo text="styled component" />;

      // The styled component should inherit the static property from the base component
      expect(isChildWithSomeProperty(styledElement, 'isFoo')).toBe(true);
      expect(isChildWithSomeProperty(styledElement, 'isBar')).toBe(false);
    });
  });

  describe('edge cases', () => {
    test('should handle components with multiple static properties', () => {
      // Add multiple static properties to a component
      const ComponentWithProps = ({ text }: { text: string }) => (
        <div>{text}</div>
      );
      (ComponentWithProps as any).isPrimary = true;
      (ComponentWithProps as any).isSecondary = true;
      (ComponentWithProps as any).isSpecial = 'yes';

      const element = <ComponentWithProps text="multi-prop" />;

      expect(isChildWithSomeProperty(element, 'isPrimary')).toBe(true);
      expect(isChildWithSomeProperty(element, 'isSecondary')).toBe(true);
      expect(isChildWithSomeProperty(element, 'isSpecial')).toBe(true);
      expect(isChildWithSomeProperty(element, 'nonExistent')).toBe(false);
    });

    test('should handle falsy static property values', () => {
      const FalsyPropComponent = ({ text }: { text: string }) => (
        <div>{text}</div>
      );
      (FalsyPropComponent as any).isFalse = false;
      (FalsyPropComponent as any).isZero = 0;
      (FalsyPropComponent as any).isEmpty = '';

      const element = <FalsyPropComponent text="falsy props" />;

      // hasStaticProperty returns false for falsy values (this is expected behavior)
      expect(isChildWithSomeProperty(element, 'isFalse')).toBe(false);
      expect(isChildWithSomeProperty(element, 'isZero')).toBe(false);
      expect(isChildWithSomeProperty(element, 'isEmpty')).toBe(false);
    });
  });
});
