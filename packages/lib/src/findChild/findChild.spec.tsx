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

describe('findChild', () => {
  test('should find the first child component with matching static property', () => {
    const children = (
      <>
        <Foo text="first" />
        <Bar text="second" />
        <Foo text="third" />
      </>
    );

    const found = findChild(children, 'isFoo');
    expect(found).toBeDefined();
    expect((found as React.ReactElement).props.text).toBe('first');
  });

  test('should return undefined if no child matches', () => {
    const children = (
      <>
        <Foo text="first" />
        <Bar text="second" />
      </>
    );

    const found = findChild(children, 'isBaz');
    expect(found).toBeUndefined();
  });

  test('should handle empty children', () => {
    const found = findChild(null, 'isFoo');
    expect(found).toBeUndefined();
  });

  test('should work with array children', () => {
    const children = [
      <Foo key="1" text="first" />,
      <Bar key="2" text="second" />,
    ];

    const found = findChild(children, 'isBar');
    expect(found).toBeDefined();
    expect((found as React.ReactElement).props.text).toBe('second');
  });

  test('should handle fragment children', () => {
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

  test('should find first match even with multiple matches', () => {
    const children = (
      <>
        <Foo text="first-match" />
        <Foo text="second-match" />
        <Bar text="different" />
      </>
    );

    const found = findChild(children, 'isFoo');
    expect(found).toBeDefined();
    expect((found as React.ReactElement).props.text).toBe('first-match');
  });

  test('should NOT find deeply nested components (search depth limitation)', () => {
    const children = (
      <>
        {/* Nested fragment - should NOT find */}
        <React.Fragment>
          <React.Fragment>
            <Foo text="deeply-nested" />
          </React.Fragment>
        </React.Fragment>

        {/* Component inside div - should NOT find */}
        <div>
          <Foo text="inside-div" />
        </div>

        <Bar text="direct-child" />
      </>
    );

    // Should NOT find the deeply nested Foo instances
    const found = findChild(children, 'isFoo');
    expect(found).toBeUndefined();

    // Should find the direct Bar
    const found2 = findChild(children, 'isBar');
    expect(found2).toBeDefined();
    expect((found2 as React.ReactElement).props.text).toBe('direct-child');
  });

  test('should work with styled components from @emotion/styled', () => {
    // Create a real styled component using the actual styled() function
    const RealStyledFoo = styled(Foo)`
      background-color: red;
      padding: 8px;
    `;

    const children = (
      <>
        <RealStyledFoo text="real-styled" />
        <Bar text="regular" />
      </>
    );

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
