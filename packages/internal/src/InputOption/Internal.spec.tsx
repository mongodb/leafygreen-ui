import React from 'react';
import { render } from '@testing-library/react';
import { InputOption } from '.';

describe('packages/internal/input-option', () => {
  test('renders', () => {
    const { container } = render(<InputOption aria-label="" />);

    expect(container.firstElementChild).toBeInTheDocument();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('Types behave as expected', () => {
    /// @ts-expect-error
    <InputOption />;
    <InputOption aria-label="Some Label" />;
    <InputOption aria-labelledby="some-id" />;
  });
});
