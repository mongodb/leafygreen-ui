import React from 'react';
import { render } from '@testing-library/react';

import { MenuItem } from '.';

describe('MenuItem', () => {
  describe('it returns the correct type of component', () => {
    test('button by default', () => {
      const utils = render(<MenuItem>Example 1</MenuItem>);
      expect(utils.getByRole('menuitem').tagName.toLowerCase()).toBe('button');
    });

    test('anchor when href is supplied', () => {
      const utils = render(<MenuItem href="string">Example 2</MenuItem>);
      expect(utils.getByRole('menuitem').tagName.toLowerCase()).toBe('a');
    });

    test('div when "as" is supplied', () => {
      const utils = render(<MenuItem as="div">Test Content</MenuItem>);
      expect(utils.getByRole('menuitem').tagName.toLowerCase()).toBe('div');
    });
  });

  describe('types behave as expected', () => {
    // eslint-disable-next-line jest/no-disabled-tests
    test.skip('types', () => {
      const ButtonWrapper = (props: JSX.IntrinsicElements['button']) => {
        return <button {...props} />;
      };

      <>
        <MenuItem href="allowed">Children</MenuItem>
        <MenuItem as="a" href="allowed">
          Children
        </MenuItem>
        {/* @ts-expect-error href not allowed when as is div*/}
        <MenuItem as="div" href="string">
          Children
        </MenuItem>
        {/* @ts-expect-error */}
        <MenuItem as={ButtonWrapper} href="string">
          Children
        </MenuItem>
      </>;
    });
  });
});
