import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import VerticalEllipsisIcon from '@leafygreen-ui/icon/dist/VerticalEllipsis';

import Banner, { Variant } from '..';

const className = 'test-classname';
const children = 'this is the banner content.';
const onClose = jest.fn();

function renderBanner(props = {}) {
  const { container } = render(<Banner data-testid="banner" {...props} />);
  const banner = screen.getByTestId('banner');
  return { banner, container };
}

describe('packages/banner', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderBanner();
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });

  describe('by default', () => {
    test(`renders "${className}" in the badge's classList`, () => {
      const { banner } = renderBanner({
        className,
      });
      expect(banner.classList.contains(className)).toBe(true);
    });

    test(`renders "${children}" in the badge's classList`, () => {
      const { banner } = renderBanner({
        children,
      });
      expect(banner.innerHTML.includes(children)).toBe(true);
    });

    test('renders banner with "info" variant by default', () => {
      renderBanner();
      const circleIcon = screen.getByLabelText('Info With Circle Icon');
      expect(circleIcon).toBeInTheDocument();
    });

    test('does not render the banner as dismissible by default', () => {
      const { banner } = renderBanner();
      expect(banner.innerHTML.includes('X Icon')).not.toBe(true);
    });
  });

  describe('when the "variant" prop is set', () => {
    test('and the value is "warning"', () => {
      renderBanner({ variant: Variant.Warning });
      const warningIcon = screen.getByLabelText('Important With Circle Icon');
      expect(warningIcon).toBeInTheDocument();
    });

    test('and the value is "danger"', () => {
      renderBanner({ variant: Variant.Danger });
      const dangerIcon = screen.getByLabelText('Warning Icon');
      expect(dangerIcon).toBeInTheDocument();
    });

    test('and the value is "success"', () => {
      renderBanner({ variant: Variant.Success });
      const successIcon = screen.getByLabelText('Checkmark With Circle Icon');
      expect(successIcon).toBeInTheDocument();
    });
  });

  describe('when the "dismissible" prop is set', () => {
    test('the X icon is present', () => {
      renderBanner({ dismissible: true });
      const xButton = screen.getByLabelText('X Icon');
      expect(xButton).toBeInTheDocument();
    });

    test('onClose fires when the dismiss button is clicked', () => {
      renderBanner({ dismissible: true, onClose });
      const xButton = screen.getByLabelText('X Icon');
      fireEvent.click(xButton);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the "image" prop is set', () => {
    test('the default icon does not appear', () => {
      const { banner } = renderBanner({
        image: <VerticalEllipsisIcon />,
      });

      expect(banner.innerHTML.includes('Info With Circle')).not.toBe(true);
      const image = screen.getByLabelText('Vertical Ellipsis Icon');
      expect(image).toBeInTheDocument();
    });
  });
});
