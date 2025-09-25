import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { MessagePromotion, type MessagePromotionProps } from '.';

const defaultProps: MessagePromotionProps = {
  promotionText: 'Go learn a new skill!',
  promotionUrl: 'https://learn.mongodb.com/skills',
};

const renderMessagePromotion = (props: Partial<MessagePromotionProps> = {}) => {
  const { container } = render(
    <MessagePromotion
      data-testid="message-promotion"
      {...defaultProps}
      {...props}
    />,
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
    test('renders promotion text & link', () => {
      const promotionText = 'This is a test promotion message';
      renderMessagePromotion({
        promotionText,
        promotionUrl: 'https://learn.mongodb.com/skills',
      });

      expect(screen.getByText(promotionText)).toBeInTheDocument();
      expect(screen.getByText('Learn More')).toBeInTheDocument();
    });
  });

  describe('callback handling', () => {
    test('onPromotionClick is called when promotion element is clicked', async () => {
      const mockOnClick = jest.fn();

      renderMessagePromotion({
        ...defaultProps,
        onPromotionClick: mockOnClick,
      });

      const learnMoreLink = screen.getByText('Learn More');
      await userEvent.click(learnMoreLink);

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
});
