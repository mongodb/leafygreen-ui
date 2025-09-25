import React from 'react';
import styled from '@emotion/styled';

import { filterChildren } from './filterChildren';

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

describe('filterChildren', () => {
  test('should filter out children with matching static properties', () => {
    const children = (
      <>
        <Foo text="should-be-filtered" />
        <Bar text="should-remain" />
        <Baz text="should-be-filtered" />
        <div>regular-div</div>
      </>
    );

    const filtered = filterChildren(children, ['isFoo', 'isBaz']);
    const filteredArray = React.Children.toArray(filtered);

    expect(filteredArray).toHaveLength(2);
    expect((filteredArray[0] as React.ReactElement).props.text).toBe(
      'should-remain',
    );
    expect((filteredArray[1] as React.ReactElement).type).toBe('div');
  });

  test('should return all children when no properties match', () => {
    const children = (
      <>
        <Foo text="first" />
        <Bar text="second" />
      </>
    );

    const filtered = filterChildren(children, ['isNonExistent']);
    const filteredArray = React.Children.toArray(filtered);

    expect(filteredArray).toHaveLength(2);
    expect((filteredArray[0] as React.ReactElement).props.text).toBe('first');
    expect((filteredArray[1] as React.ReactElement).props.text).toBe('second');
  });

  test('should handle empty children', () => {
    const filtered = filterChildren(null, ['isFoo']);
    expect(filtered).toEqual([]);
  });

  test('should handle array children', () => {
    const children = [
      <Foo key="1" text="filter-me" />,
      <Bar key="2" text="keep-me" />,
    ];

    const filtered = filterChildren(children, ['isFoo']);
    const filteredArray = React.Children.toArray(filtered);

    expect(filteredArray).toHaveLength(1);
    expect((filteredArray[0] as React.ReactElement).props.text).toBe('keep-me');
  });

  test('should filter children inside fragments', () => {
    const children = (
      <React.Fragment>
        <Foo text="filter-from-fragment" />
        <Bar text="keep-from-fragment" />
      </React.Fragment>
    );

    const filtered = filterChildren(children, ['isFoo']);
    const filteredArray = React.Children.toArray(filtered);

    // Fragment children get flattened, so we should have 1 Bar component directly
    expect(filteredArray).toHaveLength(1);
    expect((filteredArray[0] as React.ReactElement).props.text).toBe(
      'keep-from-fragment',
    );
  });

  test('should work with styled components from @emotion/styled', () => {
    // Create a real styled component
    const StyledFoo = styled(Foo)`
      background-color: blue;
    `;

    const children = (
      <>
        <StyledFoo text="styled-should-be-filtered" />
        <Bar text="regular-should-remain" />
      </>
    );

    const filtered = filterChildren(children, ['isFoo']);
    const filteredArray = React.Children.toArray(filtered);

    // Should only have Bar remaining (fragment gets flattened)
    expect(filteredArray).toHaveLength(1);
    expect((filteredArray[0] as React.ReactElement).props.text).toBe(
      'regular-should-remain',
    );
  });

  test('should NOT filter deeply nested components (search depth limitation)', () => {
    const children = (
      <>
        {/* Nested fragment - should NOT be filtered */}
        <React.Fragment>
          <React.Fragment>
            <Foo text="deeply-nested" />
          </React.Fragment>
        </React.Fragment>

        {/* Component inside div - should NOT be filtered */}
        <div>
          <Foo text="inside-div" />
        </div>

        {/* Direct Foo - SHOULD be filtered */}
        <Foo text="direct-foo" />
        <Bar text="direct-bar" />
      </>
    );

    const filtered = filterChildren(children, ['isFoo']);
    const filteredArray = React.Children.toArray(filtered);

    // Should have 3 items: nested fragment content, div with Foo inside, and Bar
    // (fragments get flattened, so nested fragment becomes its children)
    expect(filteredArray).toHaveLength(3);

    // The direct Foo should be filtered out, but nested ones should remain
    const barChild = filteredArray.find(
      child =>
        React.isValidElement(child) &&
        (child as React.ReactElement).props.text === 'direct-bar',
    );
    expect(barChild).toBeDefined();
  });

  test('should handle multiple properties to filter', () => {
    const children = (
      <>
        <Foo text="filter-foo" />
        <Bar text="filter-bar" />
        <Baz text="keep-baz" />
        <div>keep-div</div>
      </>
    );

    const filtered = filterChildren(children, ['isFoo', 'isBar']);
    const filteredArray = React.Children.toArray(filtered);

    expect(filteredArray).toHaveLength(2);
    expect((filteredArray[0] as React.ReactElement).props.text).toBe(
      'keep-baz',
    );
    expect((filteredArray[1] as React.ReactElement).type).toBe('div');
  });
});
