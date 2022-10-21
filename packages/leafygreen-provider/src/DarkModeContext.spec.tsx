import React from 'react';
import { render, cleanup } from '@testing-library/react';
import LeafyGreenProvider, { useDarkMode } from '.';

afterAll(cleanup);

describe('packages/leafygreen-provider/DarkModeContext', () => {
  const TestComponent = () => {
    const { darkMode, theme } = useDarkMode();
    return (
      <>
        <div data-testid="darkMode" data-mode={darkMode} data-theme={theme} />
      </>
    );
  };

  test('without a provider, by default useDarkMode returns false', () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('darkMode')).toHaveAttribute('data-mode', 'false');
  });

  test('without a provider, by default theme returns "light"', () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('darkMode')).toHaveAttribute('data-theme', 'light');
  });

  test('with a provider, by default useDarkMode returns false', () => {
    const { getByTestId } = render(
      <LeafyGreenProvider>
        <TestComponent />
      </LeafyGreenProvider>,
    );
    expect(getByTestId('darkMode')).toHaveAttribute('data-mode', 'false');
  });

  test('with a provider, by default theme returns "light"', () => {
    const { getByTestId } = render(
      <LeafyGreenProvider>
        <TestComponent />
      </LeafyGreenProvider>,
    );
    expect(getByTestId('darkMode')).toHaveAttribute('data-theme', 'light');
  });

  test(`when darkMode prop is set to true, useDarkMode returns true`, () => {
    const { getByTestId } = render(
      <LeafyGreenProvider darkMode={true}>
        <TestComponent />
      </LeafyGreenProvider>,
    );
    expect(getByTestId('darkMode')).toHaveAttribute('data-mode', 'true');
  });

  test(`when darkMode prop is set to true, theme returns dark`, () => {
    const { getByTestId } = render(
      <LeafyGreenProvider darkMode={true}>
        <TestComponent />
      </LeafyGreenProvider>,
    );
    expect(getByTestId('darkMode')).toHaveAttribute('data-theme', 'dark');
  });
});
