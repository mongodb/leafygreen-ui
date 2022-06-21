import React from 'react';
import { render, cleanup } from '@testing-library/react';
import LeafyGreenProvider from '.';
import { useDarkModeContext } from './DarkModeContext';

afterAll(cleanup);

describe('packages/leafygreen-provider/DarkModeContext', () => {
  const TestComponent = () => {
    const { globalDarkMode } = useDarkModeContext();
    return <div>{`${globalDarkMode?.toString() || 'undefined'}`}</div>;
  };

  test('without a provider, by default useDarkMode returns false', () => {
    const { container } = render(<TestComponent />);
    expect(container.innerHTML.includes('false')).toBeTruthy();
  });

  test('with a provider, by default useDarkMode returns false', () => {
    const { container } = render(
      <LeafyGreenProvider>
        <TestComponent />
      </LeafyGreenProvider>,
    );

    expect(container.innerHTML.includes('false')).toBeTruthy();
  });

  test(`when darkMode prop is set to true, useDarkMode returns true`, () => {
    const { container } = render(
      <LeafyGreenProvider globalDarkMode={true}>
        <TestComponent />
      </LeafyGreenProvider>,
    );

    expect(container.innerHTML.includes('true')).toBeTruthy();
  });
});
