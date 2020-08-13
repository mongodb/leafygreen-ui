import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VerticalEllipsisIcon from '@leafygreen-ui/icon/dist/VerticalEllipsis';
import Banner, { Variant } from '.';

const className = 'test-classname';
const children = 'this is the banner content.';
const onClose = jest.fn();

function renderBanner(props = {}) {
  render(<Banner data-testid="banner" {...props} />);
  const banner = screen.getByTestId('banner');
  return { banner };
}

describe('packages/banner', () => {
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
      const infoIcon = screen.getByTitle('Info With Circle Icon');
      expect(infoIcon).toBeInTheDocument();
    });

    test('does not render the banner as dismissible by default', () => {
      const { banner } = renderBanner();
      expect(banner.innerHTML.includes('X Icon')).not.toBe(true);
    });
  });

  describe('when the "variant" prop is set', () => {
    test('and the value is "warning"', () => {
      renderBanner({ variant: Variant.Warning });
      const icon = screen.getByTitle('Important With Circle Icon');
      expect(icon).toBeInTheDocument();
    });

    test('and the value is "danger"', () => {
      renderBanner({ variant: Variant.Danger });
      const icon = screen.getByTitle('Warning Icon');
      expect(icon).toBeInTheDocument();
    });

    test('and the value is "success"', () => {
      renderBanner({ variant: Variant.Success });
      const icon = screen.getByTitle('Checkmark With Circle Icon');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('when the "dismissible" prop is set', () => {
    test('the X icon is present', () => {
      renderBanner({ dismissible: true });
      const xButton = screen.getByTitle('X Icon');
      expect(xButton).toBeInTheDocument();
    });

    test('onClose fires when the dismiss button is clicked', () => {
      renderBanner({ dismissible: true, onClose });
      const xButton = screen.getByTitle('X Icon');
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
      const image = screen.getByTitle('Vertical Ellipsis Icon');
      expect(image).toBeInTheDocument();
    });
  });
});
