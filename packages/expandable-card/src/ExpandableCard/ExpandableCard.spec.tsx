import React from 'react';
import { getByText, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import ExpandableCard from './ExpandableCard';

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
  });
});
