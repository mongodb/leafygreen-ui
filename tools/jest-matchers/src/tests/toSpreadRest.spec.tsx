import React from 'react';

describe('tools/jest-matchers/.toSpreadRest', () => {
  test('spreads rest', () => {
    const Component = (props: React.ComponentProps<'div'>) => {
      return (
        <div id="some-id" {...props}>
          Children
        </div>
      );
    };

    expect(Component).toSpreadRest();
  });

  test('does not spread rest', () => {
    const Component = (props: React.ComponentProps<'div'>) => {
      return <div id="some-id">Children</div>;
    };

    expect(Component).not.toSpreadRest();
  });
});
