import React from 'react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { defaultProps, renderExpandableCard } from '../testing';

import ExpandableCard from './ExpandableCard';

describe('packages/expandable-card', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderExpandableCard();
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });

  describe('interactivity', () => {
    test('content is not visible by default', () => {
      const { getByText } = renderExpandableCard();
      expect(getByText(defaultProps.children)).not.toBeVisible();
    });

    test('content is visible after click', () => {
      const { getByText } = renderExpandableCard();
      const trigger = getByText(defaultProps.title);
      userEvent.click(trigger);
      expect(getByText(defaultProps.children)).toBeVisible();
    });

    test('renders as open when defaultOpen is set', () => {
      const { getByText } = renderExpandableCard({
        defaultOpen: true,
      });
      expect(getByText(defaultProps.children)).toBeVisible();
    });

    test('rerenders when value of defaultOpen prop changes', () => {
      const { getByText, rerender } = renderExpandableCard();
      expect(getByText(defaultProps.children)).not.toBeVisible();

      rerender(<ExpandableCard {...defaultProps} defaultOpen={true} />);
      expect(getByText(defaultProps.children)).toBeVisible();
    });
  });
});
