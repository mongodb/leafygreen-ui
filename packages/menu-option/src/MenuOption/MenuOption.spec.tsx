import React from 'react';
import { render } from '@testing-library/react';

import { MenuOption } from '..';

describe('packages/menu-option', () => {
  test('renders', () => {
    const { container } = render(<MenuOption aria-label="Some label" />);
    expect(container.firstElementChild).toBeInTheDocument();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('Types behave as expected', () => {
    // eslint-disable-next-line jest/expect-expect
    test('Aria labels', () => {
      /** @ts-expect-error - requires label or labelledby*/
      render(<MenuOption />);
      render(<MenuOption aria-label="Some Label" />);
      render(<MenuOption aria-labelledby="some-id" />);
    });

    // eslint-disable-next-line jest/expect-expect
    test('as prop', () => {
      /** @ts-expect-error - requires label, anchor requires href */
      render(<MenuOption as="a" />);
      /** @ts-expect-error - anchor requires href */
      render(<MenuOption as="a" aria-label="Some-label" />);
      /** @ts-expect-error - requires label*/
      render(<MenuOption as="a" href="mongodb.design" />);
      render(
        <MenuOption as="a" href="mongodb.design" aria-label="Some Label" />,
      );
    });
  });
});
