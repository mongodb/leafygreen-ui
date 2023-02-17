import React from 'react';
import { render } from '@testing-library/react';

import { InputOption } from '..';

describe('packages/input-option', () => {
  test('renders', () => {
    const { container } = render(<InputOption aria-label="Some label" />);
    expect(container.firstElementChild).toBeInTheDocument();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('Types behave as expected', () => {
    // eslint-disable-next-line jest/expect-expect
    test('Aria labels', () => {
      /** @ts-expect-error - requires label or labelledby*/
      render(<InputOption />);
      render(<InputOption aria-label="Some Label" />);
      render(<InputOption aria-labelledby="some-id" />);
    });

    // eslint-disable-next-line jest/expect-expect
    test('as prop', () => {
      /** @ts-expect-error - requires label, anchor requires href */
      render(<InputOption as="a" />);
      /** @ts-expect-error - anchor requires href */
      render(<InputOption as="a" aria-label="Some-label" />);
      /** @ts-expect-error - requires label*/
      render(<InputOption as="a" href="mongodb.design" />);
      render(
        <InputOption as="a" href="mongodb.design" aria-label="Some Label" />,
      );
    });
  });
});
