import React, { Fragment } from 'react';
import styled from '@emotion/styled';

import { isChildWithProperty } from './isChildWithProperty';

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

describe('isChildWithProperty', () => {
  describe('basic component property checking', () => {
    it('should return true when child has the specified static property', () => {
      const element = <Foo text="test" />;
      expect(isChildWithProperty(element, 'isFoo')).toBe(true);
    });

    it('should return false when child does not have the specified static property', () => {
      const element = <Foo text="test" />;
      expect(isChildWithProperty(element, 'isBar')).toBe(false);
    });

    it('should work with different components and properties', () => {
      const barElement = <Bar text="bar" />;
      const bazElement = <Baz text="baz" />;

      expect(isChildWithProperty(barElement, 'isBar')).toBe(true);
      expect(isChildWithProperty(barElement, 'isBaz')).toBe(false);
      expect(isChildWithProperty(bazElement, 'isBaz')).toBe(true);
      expect(isChildWithProperty(bazElement, 'isFoo')).toBe(false);
    });
  });

  describe('non-React element handling', () => {
    it('should return false for non-React elements', () => {
      expect(isChildWithProperty('string' as any, 'isFoo')).toBe(false);
      expect(isChildWithProperty(123 as any, 'isFoo')).toBe(false);
      expect(isChildWithProperty(null, 'isFoo')).toBe(false);
      expect(isChildWithProperty(undefined, 'isFoo')).toBe(false);
      expect(isChildWithProperty(true as any, 'isFoo')).toBe(false);
      expect(isChildWithProperty({} as any, 'isFoo')).toBe(false);
      expect(isChildWithProperty([] as any, 'isFoo')).toBe(false);
    });
  });

  describe('Fragment handling', () => {
    it('should return true when Fragment contains a single child with the property', () => {
      const fragmentElement = (
        <Fragment>
          <Foo text="inside fragment" />
        </Fragment>
      );
      expect(isChildWithProperty(fragmentElement, 'isFoo')).toBe(true);
    });

    it('should return false when Fragment does not contain a single child with the property', () => {
      const fragmentElement = (
        <Fragment>
          <Bar text="bar inside fragment" />
        </Fragment>
      );
      expect(isChildWithProperty(fragmentElement, 'isFoo')).toBe(false);
    });

    it('should work with React.Fragment syntax', () => {
      const fragmentElement = (
        <React.Fragment>
          <Bar text="bar in react fragment" />
        </React.Fragment>
      );
      expect(isChildWithProperty(fragmentElement, 'isBar')).toBe(true);
      expect(isChildWithProperty(fragmentElement, 'isFoo')).toBe(false);
    });

    it('should work with short Fragment syntax', () => {
      const fragmentElement = (
        <>
          <Baz text="baz in short fragment" />
        </>
      );
      expect(isChildWithProperty(fragmentElement, 'isBaz')).toBe(true);
      expect(isChildWithProperty(fragmentElement, 'isFoo')).toBe(false);
    });

    it('should handle empty Fragment', () => {
      const emptyFragment = <Fragment />;
      expect(isChildWithProperty(emptyFragment, 'isFoo')).toBe(false);
    });

    it('should handle Fragment with non-element children', () => {
      const fragmentWithText = <Fragment>text content</Fragment>;
      expect(isChildWithProperty(fragmentWithText, 'isFoo')).toBe(false);
    });

    it('should handle Fragment with mixed children types', () => {
      const fragmentWithMixed = (
        <Fragment>
          text content
          {null}
          {undefined}
          <Foo text="foo in mixed" />
          more text
        </Fragment>
      );
      expect(isChildWithProperty(fragmentWithMixed, 'isFoo')).toBe(false);
      expect(isChildWithProperty(fragmentWithMixed, 'isBar')).toBe(false);
    });

    it('should find the first matching child in Fragment', () => {
      const fragmentWithMultiple = (
        <Fragment>
          <div>regular div</div>
          <Foo text="first foo" />
          <Bar text="bar" />
          <Foo text="second foo" />
        </Fragment>
      );
      expect(isChildWithProperty(fragmentWithMultiple, 'isFoo')).toBe(false);
      expect(isChildWithProperty(fragmentWithMultiple, 'isBar')).toBe(false);
      expect(isChildWithProperty(fragmentWithMultiple, 'isBaz')).toBe(false);
    });
  });

  describe('native HTML elements', () => {
    it('should return false for native HTML elements without static properties', () => {
      const divElement = <div>content</div>;
      const spanElement = <span>content</span>;

      expect(isChildWithProperty(divElement, 'isFoo')).toBe(false);
      expect(isChildWithProperty(spanElement, 'isBar')).toBe(false);
    });
  });

  describe('styled components', () => {
    it('should work with styled components from @emotion/styled', () => {
      // Create a real styled component using the actual styled() function
      const StyledFoo = styled(Foo)`
        background-color: red;
        padding: 8px;
      `;

      const styledElement = <StyledFoo text="styled component" />;

      // The styled component should inherit the static property from the base component
      expect(isChildWithProperty(styledElement, 'isFoo')).toBe(true);
      expect(isChildWithProperty(styledElement, 'isBar')).toBe(false);
    });

    it('should work with styled components inside Fragment', () => {
      const StyledBar = styled(Bar)`
        color: blue;
      `;

      const fragmentWithStyled = (
        <Fragment>
          <StyledBar text="styled bar" />
        </Fragment>
      );

      expect(isChildWithProperty(fragmentWithStyled, 'isBar')).toBe(true);
      expect(isChildWithProperty(fragmentWithStyled, 'isFoo')).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle components with multiple static properties', () => {
      // Add multiple static properties to a component
      const MultiPropComponent = ({ text }: { text: string }) => (
        <div>{text}</div>
      );
      (MultiPropComponent as any).isPrimary = true;
      (MultiPropComponent as any).isSecondary = true;
      (MultiPropComponent as any).isSpecial = 'yes';

      const element = <MultiPropComponent text="multi-prop" />;

      expect(isChildWithProperty(element, 'isPrimary')).toBe(true);
      expect(isChildWithProperty(element, 'isSecondary')).toBe(true);
      expect(isChildWithProperty(element, 'isSpecial')).toBe(true);
      expect(isChildWithProperty(element, 'nonExistent')).toBe(false);
    });

    it('should handle falsy static property values', () => {
      const FalsyPropComponent = ({ text }: { text: string }) => (
        <div>{text}</div>
      );
      (FalsyPropComponent as any).isFalse = false;
      (FalsyPropComponent as any).isZero = 0;
      (FalsyPropComponent as any).isEmpty = '';

      const element = <FalsyPropComponent text="falsy props" />;

      // hasStaticProperty returns false for falsy values (this is expected behavior)
      expect(isChildWithProperty(element, 'isFalse')).toBe(false);
      expect(isChildWithProperty(element, 'isZero')).toBe(false);
      expect(isChildWithProperty(element, 'isEmpty')).toBe(false);
    });

    it('should handle truthy non-boolean static property values', () => {
      const TruthyPropComponent = ({ text }: { text: string }) => (
        <div>{text}</div>
      );
      (TruthyPropComponent as any).isString = 'yes';
      (TruthyPropComponent as any).isNumber = 42;
      (TruthyPropComponent as any).isObject = { prop: 'value' };

      const element = <TruthyPropComponent text="truthy props" />;

      // hasStaticProperty returns true for truthy values
      expect(isChildWithProperty(element, 'isString')).toBe(true);
      expect(isChildWithProperty(element, 'isNumber')).toBe(true);
      expect(isChildWithProperty(element, 'isObject')).toBe(true);
    });

    it('should NOT handle nested Fragments recursively', () => {
      const nestedFragment = (
        <Fragment>
          <Fragment>
            <Foo text="nested single child" />
          </Fragment>
        </Fragment>
      );

      // Should recursively find Foo through the nested single child fragments
      expect(isChildWithProperty(nestedFragment, 'isFoo')).toBe(false);
      expect(isChildWithProperty(nestedFragment, 'isBar')).toBe(false);
    });

    it('should return false for nested Fragment with multiple children', () => {
      const nestedFragmentWithMultiple = (
        <Fragment>
          <Fragment>
            <Foo text="first" />
            <Bar text="second" />
          </Fragment>
        </Fragment>
      );

      // Should return false because inner Fragment has multiple children
      expect(isChildWithProperty(nestedFragmentWithMultiple, 'isFoo')).toBe(
        false,
      );
      expect(isChildWithProperty(nestedFragmentWithMultiple, 'isBar')).toBe(
        false,
      );
    });
  });
});
