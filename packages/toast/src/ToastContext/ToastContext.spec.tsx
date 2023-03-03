import React from 'react';
import {
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Basic as ContextStory } from './ToastContext.story';
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

  describe('opening toasts', () => {
    test('opens toast when triggered', async () => {
      const { getByTestId } = render(<ContextStory />);
      const button = getByTestId('toast-trigger');
      userEvent.click(button);
      const toast = await waitFor(() => getByTestId('lg-toast'));
      expect(toast).toBeInTheDocument();
    });

    test('opens multiple toasts', async () => {
      const { getByTestId, getAllByTestId } = render(<ContextStory />);
      const button = getByTestId('toast-trigger');
      userEvent.click(button);
      userEvent.click(button);
      userEvent.click(button);
      const toasts = await waitFor(() => getAllByTestId('lg-toast'));
      expect(toasts.length).toBe(3);
    });
  });

  describe('closing toasts', () => {
    test('toast closes after timeout', async () => {
      const { getByTestId } = render(<ContextStory timeout={50} />);
      const button = getByTestId('toast-trigger');
      userEvent.click(button);
      const toast = await waitFor(() => getByTestId('lg-toast'));
      expect(toast).toBeInTheDocument();

      setTimeout(() => {
        expect(toast).not.toBeInTheDocument();
      }, 51);
    });

    // TODO: find a way to test this adequately
    // eslint-disable-next-line jest/no-disabled-tests
    test.skip('toast does _NOT_ close after timeout when container is hovered', async () => {
      const { getByTestId } = render(<ContextStory timeout={50} />);
      const button = getByTestId('toast-trigger');
      userEvent.click(button);
      const container = getByTestId('lg-toast-region');
      const toast = await waitFor(() => getByTestId('lg-toast'));
      expect(toast).toBeInTheDocument();
      fireEvent(container, new Event('mouseenter', { bubbles: true }));
      setTimeout(() => {
        expect(toast).toBeInTheDocument();
      }, 51);
    });

    test('toast closes when the dismiss button is clicked', async () => {
      const { getByTestId } = render(<ContextStory timeout={50} />);
      const button = getByTestId('toast-trigger');
      userEvent.click(button);
      const toast = await waitFor(() => getByTestId('lg-toast'));
      const dismiss = getByTestId('lg-toast-dismiss-button');
      userEvent.click(dismiss);
      await waitForElementToBeRemoved(toast);
    });
  });

  describe('onClose', () => {
    test.todo(
      'is called with a payload that differentiates timeout vs dismiss',
    );

    test.todo(
      'is _NOT_ called after timeout if `variant` is progress, and `progress` is < 1',
    );
  });
});
