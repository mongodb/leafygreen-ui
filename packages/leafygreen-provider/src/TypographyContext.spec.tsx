import React from 'react';
import { cleanup, render } from '@testing-library/react';

import LeafyGreenProvider, { useBaseFontSize } from '.';

afterAll(cleanup);

describe('packages/leafygreen-provider/TypographyContext', () => {
  const value = 16;

  const TestComponent = () => {
    const test = useBaseFontSize();
    return <div>{test}</div>;
  };

  test('without a provider, by default useBaseFontSize returns 14', () => {
    const { container } = render(<TestComponent />);

    expect(container.innerHTML.includes('14')).toBeTruthy();
  });

  test('with a provider, by default useBaseFontSize returns 14', () => {
    const { container } = render(
      <LeafyGreenProvider>
        <TestComponent />
      </LeafyGreenProvider>,
    );

    expect(container.innerHTML.includes('14')).toBeTruthy();
  });

  test(`when baseFontSize prop is set to ${value}, useBaseFontSize returns ${value}`, () => {
    const { container } = render(
      <LeafyGreenProvider baseFontSize={value}>
        <TestComponent />
      </LeafyGreenProvider>,
    );

    expect(container.innerHTML.includes(value.toString())).toBeTruthy();
  });
});
