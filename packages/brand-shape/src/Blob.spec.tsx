import React from 'react';
import { getByTestId, render } from '@testing-library/react';
import { Blob } from '.';

describe('packages/blob', () => {
  test('Blob renders', () => {
    const { container } = render(
      <Blob
        data-testid="blob"
        shape={[
          ['o', ' ', ' ', ' '],
          [' ', 'o', ' ', ' '],
          [' ', 'o', 'o', ' '],
          ['o', ' ', ' ', 'o'],
        ]}
      />,
    );

    const blob = getByTestId(container, 'blob');
    expect(blob).toBeInTheDocument();
  });

  // TODO: add more tests
});
