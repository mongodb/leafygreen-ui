import React from 'react';
import { getByText, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import ExpandableCard from './ExpandableCard';

const defaultProps = {
  title: 'Card title',
  description: 'Card description',
  children: 'Lorem ipsum dolor sit amet',
};

const renderCard = () =>
  render(
    <ExpandableCard title="Card title" description="Card description">
      Lorem ipsum dolor sit amet
    </ExpandableCard>,
  );

describe('packages/expandable-card', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderCard();
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });

  describe('interactivity', () => {
    test('content is not visible by default', () => {
      const { container } = renderCard();
      expect(
        getByText(container, 'Lorem ipsum dolor sit amet'),
      ).not.toBeVisible();
    });

    test('content is visible after click', () => {
      const { container } = renderCard();
      const trigger = getByText(container, 'Card title');
      userEvent.click(trigger);
      expect(getByText(container, 'Lorem ipsum dolor sit amet')).toBeVisible();
    });

    test('renders as open when defaultOpen is set', () => {
      const { container } = render(
        <ExpandableCard {...defaultProps} defaultOpen />,
      );
      expect(getByText(container, 'Lorem ipsum dolor sit amet')).toBeVisible();
    });

    test('rerenders when value of defaultOpen prop changes', () => {
      const { container, rerender } = render(
        <ExpandableCard {...defaultProps} />,
      );
      expect(
        getByText(container, 'Lorem ipsum dolor sit amet'),
      ).not.toBeVisible();

      rerender(<ExpandableCard {...defaultProps} defaultOpen={true} />);
      expect(getByText(container, 'Lorem ipsum dolor sit amet')).toBeVisible();
    });
  });
});
