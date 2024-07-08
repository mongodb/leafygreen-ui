import React from 'react';
import { render, screen } from '@testing-library/react';

import { MessageBanner, type MessageBannerProps } from '.';

function renderMessageBanner({
  children,
  ...restProps
}: Partial<MessageBannerProps> = {}) {
  if (!children) {
    throw new Error('MessageBanner requires a child element');
  }

  const props: MessageBannerProps = {
    children,
    ...restProps,
  };

  const { container } = render(
    <MessageBanner data-testid="message-banner" {...props} />,
  );
  const messageBanner = screen.getByTestId('message-banner');
  return { messageBanner, container };
}

describe('packages/message-banner', () => {
  describe('variants', () => {
    test('default (info)', () => {
      renderMessageBanner({
        variant: 'info',
        children: 'This is a test default MessageBanner',
      });
      const circleIcon = screen.getByLabelText('Info With Circle Icon');
      expect(circleIcon).toBeInTheDocument();
    });
    test('info', () => {
      renderMessageBanner({
        variant: 'info',
        children: 'This is a test info MessageBanner',
      });
      const circleIcon = screen.getByLabelText('Info With Circle Icon');
      expect(circleIcon).toBeInTheDocument();
    });
    test('warning', () => {
      renderMessageBanner({
        variant: 'warning',
        children: 'This is a test warning MessageBanner',
      });
      const warningIcon = screen.getByLabelText('Important With Circle Icon');
      expect(warningIcon).toBeInTheDocument();
    });
    test('danger', () => {
      renderMessageBanner({
        variant: 'danger',
        children: 'This is a test danger MessageBanner',
      });
      const dangerIcon = screen.getByLabelText('Warning Icon');
      expect(dangerIcon).toBeInTheDocument();
    });
    test('success', () => {
      renderMessageBanner({
        variant: 'success',
        children: 'This is a test success MessageBanner',
      });
      const successIcon = screen.getByLabelText('Checkmark With Circle Icon');
      expect(successIcon).toBeInTheDocument();
    });
  });
});
