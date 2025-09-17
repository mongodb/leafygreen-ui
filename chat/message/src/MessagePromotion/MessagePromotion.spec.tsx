import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { MessagePromotion, type MessagePromotionProps } from '.';

jest.mock('@lg-chat/lg-markdown', () => ({
  LGMarkdown: jest.fn(({ children }) => <div>{children}</div>),
}));

const renderMessagePromotion = (props: Partial<MessagePromotionProps> = {}) => {
  const defaultProps: MessagePromotionProps = {
    promotionText: 'This is a test promotion message',
    baseFontSize: 16,
    ...props,
  };

  const { container } = render(
    <MessagePromotion data-testid="message-promotion" {...defaultProps} />
  );
  return { container };
};

describe('MessagePromotion', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderMessagePromotion({
        promotionText: 'Test promotion text',
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    test('renders SVG icon at 16x16 size', () => {
      renderMessagePromotion({
        promotionText: 'Test promotion',
      });

      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('width', '16');
      expect(svg).toHaveAttribute('height', '16');
    });

    test('renders promotion text', () => {
      const promotionText = 'This is a test promotion message';
      renderMessagePromotion({
        promotionText,
      });

      expect(screen.getByText(promotionText)).toBeInTheDocument();
    });
  });

  describe('callback handling', () => {
    test('onPromotionClick is called when promotion element is clicked', async () => {
      const mockOnClick = jest.fn();

      renderMessagePromotion({
        promotionText: 'Clickable promotion',
        onPromotionClick: mockOnClick,
      });

      const promotion = screen.getByTestId('message-promotion');
      await userEvent.click(promotion);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    test('onPromotionClick is not required', () => {
      expect(() => {
        renderMessagePromotion({
          promotionText: 'Test promotion without click handler',
          onPromotionClick: undefined,
        });
      }).not.toThrow();
    });
  });

  describe('edge cases', () => {
    test('if promotion text is empty, does not render anything', () => {
      const { container } = renderMessagePromotion({
        promotionText: '',
      });

      expect(container.firstChild).toBeNull();
    });

    test('if promotion text is null, does not render anything', () => {
      const { container } = renderMessagePromotion({
        promotionText: null as any,
      });

      expect(container.firstChild).toBeNull();
    });

    test('if promotion text is undefined, does not render anything', () => {
      const { container } = renderMessagePromotion({
        promotionText: undefined as any,
      });

      expect(container.firstChild).toBeNull();
    });
  });
});