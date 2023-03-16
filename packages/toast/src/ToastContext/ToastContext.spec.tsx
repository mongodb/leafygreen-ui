import React from 'react';
import { render } from '@testing-library/react';

import { ToastProvider } from '.';

describe('packages/toast/contexte', () => {
  test('renders children', () => {
    const { getByTestId } = render(
      <ToastProvider>
        <div data-testid="div" />
      </ToastProvider>,
    );

    const div = getByTestId('div');
    expect(div).toBeInTheDocument();
  });
});
