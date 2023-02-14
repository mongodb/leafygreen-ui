import React from 'react';
import { render } from '@testing-library/react';

import { SubMenu } from '.';

describe('MenuItem', () => {
  describe('it returns the correct type of component', () => {
    test('button by default', () => {
      const utils = render(<SubMenu>Example 1</SubMenu>);
      expect(utils.getByRole('menuitem').tagName.toLowerCase()).toBe('button');
    });

    test('anchor when href is supplied', () => {
      const utils = render(<SubMenu href="string">Example 2</SubMenu>);
      expect(utils.getByRole('menuitem').tagName.toLowerCase()).toBe('a');
    });

    test('div when "as" is supplied', () => {
      const utils = render(<SubMenu as="div">Test Content</SubMenu>);
      expect(utils.getByRole('menuitem').tagName.toLowerCase()).toBe('div');
    });
  });

  describe('types behave as expected', () => {
    test.skip('types', () => {
      <>
        <SubMenu href="allowed">Children</SubMenu>
        <SubMenu as="a" href="allowed">
          Children
        </SubMenu>
        {/* @ts-expect-error href not allowed when as is div*/}
        <SubMenu as="div" href="string">
          Children
        </SubMenu>
      </>;
    });
  });
});
