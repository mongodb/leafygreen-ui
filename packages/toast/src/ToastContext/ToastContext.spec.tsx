import React from 'react';
import { render, waitFor } from '@testing-library/react';

import { makeToast, makeToastStack } from './utils/makeToast';
import { ToastStack } from './ToastContext.types';
import { ToastProvider } from '.';

/**
 * This suite exclusively tests the context its
 *
 * Render-focused tests are included in `ToastContainer.spec.tsx`
 */
describe('packages/toast/context', () => {
  test('renders children', async () => {
    const { getByTestId, queryByTestId } = render(
      <ToastProvider>
        <div data-testid="div" />
      </ToastProvider>,
    );

    const div = getByTestId('div');
    expect(div).toBeInTheDocument();
    const toast = await waitFor(() => queryByTestId('lg-toast'));
    expect(toast).not.toBeInTheDocument();
  });

  test('renders initial value', async () => {
    const initialValue: ToastStack = makeToastStack([
      makeToast({ title: 'test' }),
    ]);

    const { findByTestId } = render(
      <ToastProvider initialValue={initialValue}>
        <div data-testid="div" />
      </ToastProvider>,
    );

    const toast = await findByTestId('lg-toast');
    expect(toast).toBeInTheDocument();
  });
});
