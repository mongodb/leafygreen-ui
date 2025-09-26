/**
 * Disabling `react/jsx-key` lets us pass `children` as an Iterable<ReactNode> directly to the test function
 * instead of needing to wrap everything in a Fragment,
 * which is not representative of real use-cases
 */
/* eslint-disable react/jsx-key */
import React from 'react';
import styled from '@emotion/styled';

import { findChild } from './findChild';

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

describe('packages/lib/findChild', () => {
  test('should find a child component with matching static property', () => {
    // Create an iterable to test different iteration scenarios
    const children = [<Foo text="Foo" />, <Bar text="Bar" />];

    const found = findChild(children, 'isFoo');
    expect(found).toBeDefined();
    expect((found as React.ReactElement).props.text).toBe('Foo');
  });

  test('should find the first child component with matching static property', () => {
    const children = [
      <Foo text="first" />,
      <Bar text="second" />,
      <Foo text="third" />,
    ];

    const found = findChild(children, 'isFoo');
    expect(found).toBeDefined();
    expect((found as React.ReactElement).props.text).toBe('first');
  });

  test('should return undefined if no child matches', () => {
    const children = [<Foo text="first" />, <Bar text="second" />];

    const found = findChild(children, 'isBaz');
    expect(found).toBeUndefined();
  });

  test('should handle empty children', () => {
    const found = findChild(null, 'isFoo');
    expect(found).toBeUndefined();
  });

  test('should handle a single-level of fragment children', () => {
    const children = (
      <React.Fragment>
        <Foo text="in-fragment" />
        <Bar text="also-in-fragment" />
      </React.Fragment>
    );

    const found = findChild(children, 'isBar');
    expect(found).toBeDefined();
    expect((found as React.ReactElement).props.text).toBe('also-in-fragment');
  });

  test('should NOT find components in deeply nested fragments (search depth limitation)', () => {
    const children = (
      <React.Fragment>
        <React.Fragment>
          <Foo text="deeply-nested" />
          <Bar text="also-in-fragment" />
        </React.Fragment>
      </React.Fragment>
    );

    // Should NOT find the deeply nested Foo instances
    const found = findChild(children, 'isFoo');
    expect(found).toBeUndefined();
  });

  test('should NOT find components wrapped in other elements', () => {
    const children = (
      <div>
        <Foo text="inside-div" />
      </div>
    );

    // Should NOT find the deeply nested Foo instances
    const found = findChild(children, 'isFoo');
    expect(found).toBeUndefined();
  });

  test('should work with styled components from @emotion/styled', () => {
    // Create a real styled component using the actual styled() function
    const StyledFoo = styled(Foo)`
      background-color: red;
      padding: 8px;
    `;

    const children = [<StyledFoo text="real-styled" />, <Bar text="regular" />];

    // The key test: findChild should find the styled component
    const found = findChild(children, 'isFoo');
    expect(found).toBeDefined();
    expect((found as React.ReactElement).props.text).toBe('real-styled');

    // Verify it's actually using a styled component (has emotion properties)
    const styledType = found!.type as any;
    const hasEmotionProps = !!(styledType.target || styledType.__emotion_base);
    expect(hasEmotionProps).toBe(true);
  });
});
