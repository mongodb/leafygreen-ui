import { act, waitFor } from '@testing-library/react';

import { getTestUtils } from './getTestUtils';
import {
  renderAsyncPreviewCard,
  renderMultiplePreviewCards,
  renderPreviewCard,
} from './utils';

const {
  getPreviewCard,
  findPreviewCard,
  queryPreviewCard,
  getContent,
  getToggle,
  isExpanded,
} = getTestUtils();

const { getPreviewCard: getPreviewCard2, isExpanded: isExpanded2 } =
  getTestUtils('lg-preview_card-2');

describe('packages/preview-card/getTestUtils', () => {
  test('getPreviewCard returns the correct element', () => {
    renderPreviewCard();
    const card = getPreviewCard();
    expect(card).toBeInTheDocument();
  });

  test('queryPreviewCard returns the correct element', () => {
    renderPreviewCard();
    const card = queryPreviewCard();
    expect(card).toBeInTheDocument();
  });

  test('findPreviewCard returns the correct element', async () => {
    renderPreviewCard();
    const card = await findPreviewCard();
    expect(card).toBeInTheDocument();
  });

  test('returns null when element is not found', () => {
    renderPreviewCard();
    const { queryPreviewCard: query } = getTestUtils('lg-not-a-real-id');
    expect(query()).not.toBeInTheDocument();
  });

  test('throws when element is not found', async () => {
    renderPreviewCard();
    const { getPreviewCard: get, findPreviewCard: find } =
      getTestUtils('lg-not-a-real-id');
    expect(() => get()).toThrow();
    await expect(find()).rejects.toThrow();
  });

  describe('when component is rendered asynchronously', () => {
    test('findPreviewCard finds the element', async () => {
      const { openButton } = renderAsyncPreviewCard();
      let card: HTMLElement | null = queryPreviewCard();
      expect(card).not.toBeInTheDocument();
      act(() => {
        openButton.click();
      });
      card = await findPreviewCard();
      expect(card).toBeInTheDocument();
    });
  });

  test('getContent returns the correct element', () => {
    renderPreviewCard();
    const content = getContent();
    expect(content).toBeInTheDocument();
  });

  test('getToggle returns the correct element', () => {
    renderPreviewCard();
    const toggle = getToggle();
    expect(toggle).toBeInTheDocument();
  });

  describe('isExpanded', () => {
    test('returns false when the card is closed', () => {
      renderPreviewCard();
      expect(isExpanded()).toBe(false);
    });

    test('returns true when the card is open', () => {
      renderPreviewCard({ defaultOpen: true });
      expect(isExpanded()).toBe(true);
    });

    test('returns the correct value when toggled', async () => {
      renderPreviewCard();
      const toggle = getToggle();
      expect(isExpanded()).toBe(false);
      act(() => {
        toggle.click();
      });
      await waitFor(() => {
        expect(isExpanded()).toBe(true);
      });
    });
  });

  describe('with multiple cards', () => {
    test('queries the correct card', () => {
      renderMultiplePreviewCards();
      const card1 = getPreviewCard();
      const card2 = getPreviewCard2();
      expect(card1).toBeInTheDocument();
      expect(card2).toBeInTheDocument();
      expect(card1).not.toEqual(card2);
    });

    test('isExpanded queries the correct card', () => {
      renderMultiplePreviewCards();
      expect(isExpanded()).toBe(false);
      expect(isExpanded2()).toBe(true);
    });
  });
});
