import userEvent from '@testing-library/user-event';

import { getTestUtils } from './getTestUtils';
import {
  defaultProps,
  renderAsyncExpandableCard,
  renderExpandableCard,
  renderMultipleExpandableCards,
} from './utils';

describe('packages/expandable-card/getTestUtils', () => {
  describe('single expandable card', () => {
    describe('getExpandableCard', () => {
      test('returns the root element', () => {
        renderExpandableCard();
        const utils = getTestUtils();
        const card = utils.getExpandableCard();

        expect(card).toBeInTheDocument();
        expect(card).toHaveTextContent(defaultProps.title);
        expect(card).toHaveTextContent(defaultProps.description);
        expect(card).toHaveTextContent(defaultProps.children);
      });
    });

    describe('getToggle', () => {
      test('returns the toggle element', () => {
        renderExpandableCard();
        const utils = getTestUtils();
        const toggle = utils.getToggle();

        expect(toggle).toBeInTheDocument();
        expect(toggle).toHaveTextContent(defaultProps.title);
      });
    });

    describe('isExpanded', () => {
      test('returns false when card is collapsed', () => {
        renderExpandableCard();
        const utils = getTestUtils();
        expect(utils.isExpanded()).toBeFalsy();
      });

      test('returns true when card is expanded', () => {
        renderExpandableCard({ defaultOpen: true });
        const utils = getTestUtils();
        expect(utils.isExpanded()).toBeTruthy();
      });

      test('changes after toggle', () => {
        renderExpandableCard();
        const utils = getTestUtils();

        expect(utils.isExpanded()).toBeFalsy();

        userEvent.click(utils.getToggle());

        expect(utils.isExpanded()).toBeTruthy();
      });
    });

    describe('findExpandableCard', () => {
      test('finds the expandable card asynchronously', async () => {
        const { openButton } = renderAsyncExpandableCard();

        userEvent.click(openButton);

        const utils = getTestUtils();
        const card = await utils.findExpandableCard();

        expect(card).toBeInTheDocument();
      });
    });

    describe('queryExpandableCard', () => {
      test('returns the expandable card or null', () => {
        renderExpandableCard();
        const utils = getTestUtils();
        const card = utils.queryExpandableCard();

        expect(card).toBeInTheDocument();
      });
    });
  });

  describe('multiple expandable cards', () => {
    test('can target specific cards by ID', () => {
      renderMultipleExpandableCards();
      const utils1 = getTestUtils('lg-expandable_card-1');
      const utils2 = getTestUtils('lg-expandable_card-2');

      // First card should be collapsed by default
      expect(utils1.isExpanded()).toBeFalsy();
      expect(utils1.getToggle()).toHaveTextContent('Card Title');

      // Second card was rendered with defaultOpen={true}
      expect(utils2.isExpanded()).toBeTruthy();
      expect(utils2.getToggle()).toHaveTextContent('Card 2 Title');
    });

    test('can toggle cards independently', () => {
      renderMultipleExpandableCards();
      const utils1 = getTestUtils('lg-expandable_card-1');
      const utils2 = getTestUtils('lg-expandable_card-2');

      // Card 1: Collapsed -> Expanded
      expect(utils1.isExpanded()).toBeFalsy();
      userEvent.click(utils1.getToggle());
      expect(utils1.isExpanded()).toBeTruthy();

      // Card 2: Expanded -> Collapsed
      expect(utils2.isExpanded()).toBeTruthy();
      userEvent.click(utils2.getToggle());
      expect(utils2.isExpanded()).toBeFalsy();
    });
  });
});
