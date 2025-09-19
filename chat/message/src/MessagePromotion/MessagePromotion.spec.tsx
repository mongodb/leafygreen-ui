import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { MessagePromotion, type MessagePromotionProps } from '.';

jest.mock('@lg-chat/lg-markdown', () => ({
  LGMarkdown: jest.fn(({ children }) => <div>{children}</div>),
}));

const defaultProps: MessagePromotionProps = {
  promotionText: 'Go learn a new skill!',
  promotionUrl: 'https://learn.mongodb.com/skills',
  baseFontSize: 16,
};

const renderMessagePromotion = (props: Partial<MessagePromotionProps> = {}) => {
  const { container } = render(
    <MessagePromotion data-testid="message-promotion" {...defaultProps} {...props} />
  );
  return { container };
};

describe('MessagePromotion', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderMessagePromotion();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    test('renders SVG icon at 16x16 size', () => {
      renderMessagePromotion();

      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('width', '16');
      expect(svg).toHaveAttribute('height', '16');
    });

    test('renders promotion text', () => {
      const promotionText = 'This is a test promotion message';
      renderMessagePromotion({
        promotionText,
        promotionUrl: 'https://learn.mongodb.com/skills',
      });

      expect(screen.getByText(promotionText)).toBeInTheDocument();
    });

    test('renders learn more link', () => {
      renderMessagePromotion();
      expect(screen.getByText("Learn more")).toBeInTheDocument();
    });

    test('renders text but not external link when no URL', () => {
      const promotionText = 'This is a test promotion message';
      renderMessagePromotion({
        promotionText,
        promotionUrl: undefined,
      });

      expect(screen.getByText(promotionText)).toBeInTheDocument();
      expect(screen.queryByText("Learn more")).not.toBeInTheDocument();
    });
  });

  describe('callback handling', () => {
    test('onPromotionClick is called when promotion element is clicked', async () => {
      const mockOnClick = jest.fn();

      renderMessagePromotion({
        ...defaultProps,
        onPromotionClick: mockOnClick,
      });

      const promotion = screen.getByTestId('message-promotion');
      await userEvent.click(promotion);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    test('onPromotionClick is not required', () => {
      expect(() => {
        renderMessagePromotion({
          ...defaultProps,
          onPromotionClick: undefined,
        });
      }).not.toThrow();
    });
  });

  describe('edge cases', () => {
    test('if promotion text is empty, does not render anything', () => {
      const { container } = renderMessagePromotion({
        ...defaultProps,
        promotionText: '',
      });

      expect(container.firstChild).toBeNull();
    });

    test('if promotion text is undefined, does not render anything', () => {
      const { container } = renderMessagePromotion({
        ...defaultProps,
        promotionText: undefined,
      });

      expect(container.firstChild).toBeNull();
    });

    test('if promotion url is empty, does not render anything', () => {
      const { container } = renderMessagePromotion({
        ...defaultProps,
        promotionUrl: '',
      });

      expect(container.firstChild).toBeNull();
    });

    test('if promotion url is undefined, does not render anything', () => {
      const { container } = renderMessagePromotion({
        ...defaultProps,
        promotionUrl: undefined,
      });

      expect(container.firstChild).toBeNull();
    });
  });
});