import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Promotion, type PromotionProps } from '.';

const defaultProps: PromotionProps = {
  promotionText: 'Go learn a new skill!',
  promotionUrl: 'https://learn.mongodb.com/skills',
};

const renderPromotion = (props: Partial<PromotionProps> = {}) => {
  const { container } = render(
    <Promotion data-testid="message-promotion" {...defaultProps} {...props} />,
  );
  return { container };
};

describe('Promotion', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderPromotion();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    test('renders promotion text & link', () => {
      const promotionText = 'This is a test promotion message';
      renderPromotion({
        promotionText,
        promotionUrl: 'https://learn.mongodb.com/skills',
      });

      expect(screen.getByText(promotionText)).toBeInTheDocument();
      expect(screen.getByText('Learn More')).toBeInTheDocument();
    });
  });

  describe('callback handling', () => {
    test('onPromotionLinkClick is called when promotion element is clicked', async () => {
      const mockOnClick = jest.fn();

      renderPromotion({
        ...defaultProps,
        onPromotionLinkClick: mockOnClick,
      });

      const learnMoreLink = screen.getByText('Learn More');
      await userEvent.click(learnMoreLink);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    test('onPromotionLinkClick is not required', () => {
      expect(() => {
        renderPromotion({
          ...defaultProps,
          onPromotionLinkClick: undefined,
        });
      }).not.toThrow();
    });
  });
});
