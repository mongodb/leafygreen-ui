import React from 'react';
import { render, screen } from '@testing-library/react';

import { Banner } from './Banner';
import { BannerProps } from './Banner.types';

function renderBanner({ children, ...restProps }: Partial<BannerProps> = {}) {
  if (!children) {
    throw new Error('Banner requires a child element');
  }

  const props: BannerProps = {
    children,
    ...restProps,
  };

  const { container } = render(
    <Banner data-testid="message-banner" {...props} />,
  );
  const messageBanner = screen.getByTestId('message-banner');
  return { messageBanner, container };
}

describe('packages/message-banner', () => {
  describe('variants', () => {
    test('default (info)', () => {
      renderBanner({
        variant: 'info',
        children: 'This is a test default Banner',
      });
      const circleIcon = screen.getByLabelText('Info With Circle Icon');
      expect(circleIcon).toBeInTheDocument();
    });
    test('info', () => {
      renderBanner({
        variant: 'info',
        children: 'This is a test info Banner',
      });
      const circleIcon = screen.getByLabelText('Info With Circle Icon');
      expect(circleIcon).toBeInTheDocument();
    });
    test('warning', () => {
      renderBanner({
        variant: 'warning',
        children: 'This is a test warning Banner',
      });
      const warningIcon = screen.getByLabelText('Important With Circle Icon');
      expect(warningIcon).toBeInTheDocument();
    });
    test('danger', () => {
      renderBanner({
        variant: 'danger',
        children: 'This is a test danger Banner',
      });
      const dangerIcon = screen.getByLabelText('Warning Icon');
      expect(dangerIcon).toBeInTheDocument();
    });
    test('success', () => {
      renderBanner({
        variant: 'success',
        children: 'This is a test success Banner',
      });
      const successIcon = screen.getByLabelText('Checkmark With Circle Icon');
      expect(successIcon).toBeInTheDocument();
    });
  });
});
