import React from 'react';
import { render, cleanup } from '@testing-library/react';
import LeafyGreenProvider, { useTypographyScale } from '.';

afterAll(cleanup);

describe('packages/leafygreen-provider/TypographyProvider', () => {
  const value = 16;

  const TestComponent = () => {
    const test = useTypographyScale();
    return <div>{test}</div>;
  };

  test('without a provider, by default useTypographyScale returns 14', () => {
    const { container } = render(<TestComponent />);

    expect(container.innerHTML.includes('14')).toBeTruthy();
  });

  test('with a provider, by default useTypographyScale returns 14', () => {
    const { container } = render(
      <LeafyGreenProvider>
        <TestComponent />
      </LeafyGreenProvider>,
    );

    expect(container.innerHTML.includes('14')).toBeTruthy();
  });

  test(`when typescale prop is set to ${value}, useTypographyScale returns ${value}`, () => {
    const { container } = render(
      <LeafyGreenProvider typescale={value}>
        <TestComponent />
      </LeafyGreenProvider>,
    );

    expect(container.innerHTML.includes(value.toString())).toBeTruthy();
  });
});
