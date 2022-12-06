import React from 'react';
import { cleanup, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LeafyGreenProvider, { useDarkMode } from '.';

afterAll(cleanup);

describe('packages/leafygreen-provider/DarkModeContext', () => {
  const TestComponent = () => {
    const { darkMode, theme, setDarkMode } = useDarkMode();

    return (
      <>
        <div data-testid="darkMode" data-mode={darkMode} data-theme={theme} />
        <button onClick={() => setDarkMode(!darkMode)}></button>
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

  test('setter updates mode & theme', () => {
    const { getByTestId, getByRole } = render(
      <LeafyGreenProvider darkMode={true}>
        <TestComponent />
      </LeafyGreenProvider>,
    );
    expect(getByTestId('darkMode')).toHaveAttribute('data-mode', 'true');
    expect(getByTestId('darkMode')).toHaveAttribute('data-theme', 'dark');

    const button = getByRole('button');
    userEvent.click(button);

    expect(getByTestId('darkMode')).toHaveAttribute('data-mode', 'false');
    expect(getByTestId('darkMode')).toHaveAttribute('data-theme', 'light');
  });

  test('dark mode changes if re-rendered with a different value', () => {
    const { getByTestId, rerender } = render(
      <LeafyGreenProvider darkMode={true}>
        <TestComponent />
      </LeafyGreenProvider>,
    );

    waitFor(() => {
      rerender(
        <LeafyGreenProvider darkMode={false}>
          <TestComponent />
        </LeafyGreenProvider>,
      );

      expect(getByTestId('darkMode')).toHaveAttribute('data-mode', 'false');
      expect(getByTestId('darkMode')).toHaveAttribute('data-theme', 'light');
    });
  });
});
