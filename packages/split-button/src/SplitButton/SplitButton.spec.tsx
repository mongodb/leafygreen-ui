import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { MenuItem } from '@leafygreen-ui/menu';

import { SplitButton } from '.';

const defaultProps = {
  className: 'split-button-class',
  label: 'Button Label',
  onClick: jest.fn(),
};

const getMenuItems = () => {
  return (
    <>
      <MenuItem description="I am a description" disabled>
        Disabled Menu Item
      </MenuItem>
      <MenuItem description="I am also a description">
        Menu Item With Description
      </MenuItem>
    </>
  );
};

function renderSplitButton(props = {}) {
  const utils = render(
    // @ts-expect-error - data-testid gives an error but passes in types checks test below
    <SplitButton data-testid="split-button" {...props} />,
  );
  const splitButton = utils.getByTestId('split-button');
  return {
    ...utils,
    splitButton,
  };
}

describe('packages/split-button', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderSplitButton({
        menuItems: getMenuItems(),
        ...defaultProps,
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

// TODO: consoles error if no menu items are passes
// TODO: test that label shows up
// TODO: test that disabled works
// TODO: test that menu items show up
// TODO: renders className
// TODO: button type
// TODO: onClick is triggered
