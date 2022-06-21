import React from 'react';
import { render, cleanup } from '@testing-library/react';
import LeafyGreenProvider from '.';
import { useDarkModeContext } from './DarkModeContext';

afterAll(cleanup);

describe('packages/leafygreen-provider/DarkModeContext', () => {
  const TestComponent = () => {
    const { darkMode, theme } = useDarkModeContext();
    return (
      <div>{`${darkMode?.toString() || 'undefined'} - theme: ${theme}`}</div>
    );
  };

  test('without a provider, by default useDarkMode returns false', () => {
    const { container } = render(<TestComponent />);
    expect(container.innerHTML.includes('false')).toBeTruthy();
  });

  test('without a provider, by default theme returns "light"', () => {
    const { container } = render(<TestComponent />);
    expect(container.innerHTML.includes('theme: light')).toBeTruthy();
  });

  test('with a provider, by default useDarkMode returns false', () => {
    const { container } = render(
      <LeafyGreenProvider>
        <TestComponent />
      </LeafyGreenProvider>,
    );

    expect(container.innerHTML.includes('false')).toBeTruthy();
  });

  test('with a provider, by default theme returns "light"', () => {
    const { container } = render(
      <LeafyGreenProvider>
        <TestComponent />
      </LeafyGreenProvider>,
    );

    expect(container.innerHTML.includes('theme: light')).toBeTruthy();
  });

  test(`when darkMode prop is set to true, useDarkMode returns true`, () => {
    const { container } = render(
      <LeafyGreenProvider darkMode={true}>
        <TestComponent />
      </LeafyGreenProvider>,
    );

    expect(container.innerHTML.includes('true')).toBeTruthy();
  });

  test(`when darkMode prop is set to true, theme returns dark`, () => {
    const { container } = render(
      <LeafyGreenProvider darkMode={true}>
        <TestComponent />
      </LeafyGreenProvider>,
    );

    expect(container.innerHTML.includes('theme: dark')).toBeTruthy();
  });
});
