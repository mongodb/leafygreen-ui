import React from 'react';
import styled from '@emotion/styled';

import { hasAnyStaticProperty, hasStaticProperty } from './hasStaticProperty';

// Test components
const Foo = () => <div>Foo</div>;
(Foo as any).isFoo = true;

const Bar = () => <div>Bar</div>;
(Bar as any).isBar = true;

const Baz = () => <div>Baz</div>;
(Baz as any).isBaz = true;

const Regular = () => <div>Regular</div>;
// No static properties

describe('hasStaticProperty', () => {
  describe('regular components', () => {
    test('should return true when component has the static property', () => {
      expect(hasStaticProperty(Foo, 'isFoo')).toBe(true);
      expect(hasStaticProperty(Bar, 'isBar')).toBe(true);
      expect(hasStaticProperty(Baz, 'isBaz')).toBe(true);
    });

    test('should return false when component does not have the static property', () => {
      expect(hasStaticProperty(Foo, 'isBar')).toBe(false);
      expect(hasStaticProperty(Regular, 'isFoo')).toBe(false);
      expect(hasStaticProperty(Regular, 'nonExistent')).toBe(false);
    });
  });

  describe('styled components', () => {
    test('should work with standard styled() components via .target', () => {
      const StyledFoo = styled(Foo)`
        background-color: blue;
      `;

      expect(hasStaticProperty(StyledFoo, 'isFoo')).toBe(true);
      expect(hasStaticProperty(StyledFoo, 'isBar')).toBe(false);
    });

    test('should work with exotic forward ref styled components via .__emotion_base', () => {
      // Create a component that simulates the exotic forwardRef pattern
      const ExoticComponent = {
        __emotion_base: Foo,
        // Other properties that would exist on an exotic styled component
        render: () => <div>Exotic</div>,
      };

      expect(hasStaticProperty(ExoticComponent, 'isFoo')).toBe(true);
      expect(hasStaticProperty(ExoticComponent, 'isBar')).toBe(false);
    });
  });

  describe('edge cases', () => {
    test('should handle null/undefined components', () => {
      expect(hasStaticProperty(null, 'isFoo')).toBe(false);
      expect(hasStaticProperty(undefined, 'isFoo')).toBe(false);
    });

    test('should handle empty string property', () => {
      expect(hasStaticProperty(Foo, '')).toBe(false);
    });

    test('should handle components with falsy static properties', () => {
      const FalsyComponent = () => <div>Falsy</div>;
      (FalsyComponent as any).isFalsy = false;

      expect(hasStaticProperty(FalsyComponent, 'isFalsy')).toBe(false);
    });

    test('should handle components with truthy non-boolean static properties', () => {
      const TruthyComponent = () => <div>Truthy</div>;
      (TruthyComponent as any).customProp = 'some value';

      expect(hasStaticProperty(TruthyComponent, 'customProp')).toBe(true);
    });

    test('should handle HTML element names (strings) correctly', () => {
      expect(hasStaticProperty('div', 'someProp')).toBe(false);
      expect(hasStaticProperty('span', 'className')).toBe(false);
      expect(hasStaticProperty('button', 'isButton')).toBe(false);
    });
  });
});

describe('hasAnyStaticProperty', () => {
  describe('basic functionality', () => {
    test('should return true when component has any of the specified properties', () => {
      expect(hasAnyStaticProperty(Foo, ['isFoo'])).toBe(true);
      expect(hasAnyStaticProperty(Foo, ['isBar', 'isFoo'])).toBe(true);
      expect(hasAnyStaticProperty(Foo, ['isFoo', 'isBaz'])).toBe(true);
    });

    test('should return false when component has none of the specified properties', () => {
      expect(hasAnyStaticProperty(Foo, ['isBar'])).toBe(false);
      expect(hasAnyStaticProperty(Foo, ['isBar', 'isBaz'])).toBe(false);
      expect(hasAnyStaticProperty(Regular, ['isFoo', 'isBar', 'isBaz'])).toBe(
        false,
      );
    });

    test('should return false for empty properties array', () => {
      expect(hasAnyStaticProperty(Foo, [])).toBe(false);
      expect(hasAnyStaticProperty(Regular, [])).toBe(false);
    });
  });

  describe('styled components', () => {
    test('should work with styled components', () => {
      const StyledFoo = styled(Foo)`
        background-color: red;
      `;

      expect(hasAnyStaticProperty(StyledFoo, ['isFoo'])).toBe(true);
      expect(hasAnyStaticProperty(StyledFoo, ['isBar', 'isFoo'])).toBe(true);
      expect(hasAnyStaticProperty(StyledFoo, ['isBar', 'isBaz'])).toBe(false);
    });
  });

  describe('multiple components scenario', () => {
    test('should correctly identify components with different static properties', () => {
      const components = [Foo, Bar, Baz, Regular];
      const results = components.map(comp =>
        hasAnyStaticProperty(comp, ['isFoo', 'isBar']),
      );

      expect(results).toEqual([true, true, false, false]);
    });
  });

  describe('edge cases', () => {
    test('should handle null/undefined components', () => {
      expect(hasAnyStaticProperty(null, ['isFoo'])).toBe(false);
      expect(hasAnyStaticProperty(undefined, ['isFoo'])).toBe(false);
    });

    test('should handle array with empty strings', () => {
      expect(hasAnyStaticProperty(Foo, ['', 'isFoo'])).toBe(true);
      expect(hasAnyStaticProperty(Foo, ['', 'isBar'])).toBe(false);
    });

    test('should handle HTML element names (strings) correctly', () => {
      expect(hasAnyStaticProperty('div', ['someProp', 'anotherProp'])).toBe(
        false,
      );
      expect(hasAnyStaticProperty('span', ['className'])).toBe(false);
    });
  });
});
