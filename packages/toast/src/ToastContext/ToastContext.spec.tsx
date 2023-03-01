import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Basic as Story } from './ToastContext.story';
import { ToastProvider } from '.';

describe('packages/toast/context', () => {
  test('renders children', () => {
    const { getByTestId } = render(
      <ToastProvider>
        <div data-testid="div" />
      </ToastProvider>,
    );

    const div = getByTestId('div');
    expect(div).toBeInTheDocument();
  });

  test('opens toast when triggered', async () => {
    const { getByTestId } = render(<Story />);
    const button = getByTestId('toast-trigger');
    userEvent.click(button);
    const toast = await waitFor(() => getByTestId('lg-toast'));
    expect(toast).toBeInTheDocument();
  });

  test('opens multiple toasts', async () => {
    const { getByTestId, getAllByTestId } = render(<Story />);
    const button = getByTestId('toast-trigger');
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    const toasts = await waitFor(() => getAllByTestId('lg-toast'));
    expect(toasts.length).toBe(3);
  });

  test.todo('toasts close after timeout');

  test.todo('toast close when the dismiss button is clicked');
});
