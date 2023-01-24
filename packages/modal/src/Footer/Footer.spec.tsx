import React from 'react';
import { render } from '@testing-library/react';

import Footer from './Footer';

const className = 'test-classname';

describe('packages/modal', () => {
  describe('Footer', () => {
    test('renders children', () => {
      const { getByText } = render(
        <Footer>
          <button>Confirm</button>
          <button>Cancel</button>
        </Footer>,
      );

      const confirm = getByText('Confirm');
      expect(confirm).toBeInstanceOf(HTMLButtonElement);
      expect(confirm).toBeVisible();

      const cancel = getByText('Cancel');
      expect(cancel).toBeInstanceOf(HTMLButtonElement);
      expect(cancel).toBeVisible();
    });
  });

  test(`renders ${className} in the classList`, () => {
    const {
      container: { firstElementChild },
    } = render(
      <Footer className={className}>
        <button>Confirm</button>
        <button>Cancel</button>
      </Footer>,
    );

    expect(firstElementChild!.classList.contains(className)).toBe(true);
  });
});
