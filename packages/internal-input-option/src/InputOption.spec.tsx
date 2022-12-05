import React from 'react';
import { render } from '@testing-library/react';
import { InputOption, type InputOptionProps } from '.';

describe('packages/internal/input-option', () => {
  test('renders', () => {
    const { container } = render(<InputOption aria-label="" />);

    expect(container.firstElementChild).toBeInTheDocument();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('Types behave as expected', () => {
    // eslint-disable-next-line jest/expect-expect
    test('types', () => {
      const MyComponent = (props: InputOptionProps) => <li {...props} />;

      /** @ts-expect-error */
      render(<MyComponent />);
      render(<MyComponent aria-label="asdf" />);
      render(<MyComponent aria-labelledby="asdf" />);

      /** @ts-expect-error */
      render(<InputOption />);
      render(<InputOption href="asdf" />);
      render(<InputOption aria-label="Some Label" />);
      render(<InputOption aria-labelledby="some-id" />);
    });
  });
});
