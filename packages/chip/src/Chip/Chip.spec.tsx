import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import Icon from '@leafygreen-ui/icon';

import { Chip } from '.';

const longLabel = 'crush crush crush';
const shortLabel = 'crush';

function renderChip(props = {}) {
  const utils = render(<Chip data-testid="chip" label="chip" {...props} />);

  const chip = utils.getByTestId('chip');
  const chipText = utils.getByTestId('chip-text');

  return {
    ...utils,
    chip,
    chipText,
  };
}

describe('packages/chip', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderChip({});
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('does not have basic accessibility issues with dismiss button', async () => {
      const { container } = renderChip({ onDismiss: () => {} });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('does not have basic accessibility issues with truncated text', async () => {
      const { container } = renderChip({ label: longLabel });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('does not have basic accessibility issues with truncated text tooltip', async () => {
      const { container, chipText } = renderChip({
        label: longLabel,
        chipTruncationLocation: 'end',
        chipCharacterLimit: 15,
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();

      let newResults;
      act(() => void fireEvent.mouseEnter(chipText));
      await act(async () => {
        newResults = await axe(container);
      });
      expect(newResults).toHaveNoViolations();
    });

    test('does not have basic accessibility issues with truncated text and dismiss button', async () => {
      const { container } = renderChip({
        label: longLabel,
        chipTruncationLocation: 'end',
        chipCharacterLimit: 15,
        onDismiss: () => {},
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('chip', () => {
    test('renders correct label', () => {
      const { chipText } = renderChip({});
      expect(chipText).toHaveTextContent('chip');
    });

    test('does not render a dismiss button', () => {
      const { queryByTestId } = renderChip({});
      const button = queryByTestId('chip-dismiss-button');
      expect(button).not.toBeInTheDocument();
    });

    test('does not truncate text', () => {
      const { chipText } = renderChip({ label: longLabel });
      expect(chipText).toHaveTextContent(longLabel);
    });

    test('renders aria-disabled attribute when disabled is set', () => {
      const { chip } = renderChip({ disabled: true });
      expect(chip.getAttribute('aria-disabled')).toBe('true');
    });
  });

  describe('truncated chip', () => {
    describe('with a short string', () => {
      test('does not truncate text when chipCharacterLimit is 15 and chipTruncationLocation is none', () => {
        const { chipText } = renderChip({
          label: shortLabel,
          chipTruncationLocation: 'none',
          chipCharacterLimit: 15,
        });
        expect(chipText).toHaveTextContent(shortLabel);
      });

      test('does not truncate text when chipCharacterLimit is 15 and chipTruncationLocation is end', () => {
        const { chipText } = renderChip({
          label: shortLabel,
          chipTruncationLocation: 'end',
          chipCharacterLimit: 15,
        });
        expect(chipText).toHaveTextContent(shortLabel);
      });

      test('does not truncate text when chipCharacterLimit is 15 and chipTruncationLocation is start', () => {
        const { chipText } = renderChip({
          label: shortLabel,
          chipTruncationLocation: 'start',
          chipCharacterLimit: 15,
        });
        expect(chipText).toHaveTextContent(shortLabel);
      });

      test('does not truncate text when chipCharacterLimit is 15 and chipTruncationLocation is middle', () => {
        const { chipText } = renderChip({
          label: shortLabel,
          chipTruncationLocation: 'middle',
          chipCharacterLimit: 15,
        });
        expect(chipText).toHaveTextContent(shortLabel);
      });
    });

    describe('with a long string', () => {
      test('does not truncate text when chipCharacterLimit is 15 and chipTruncationLocation is none', () => {
        const { chipText } = renderChip({
          label: longLabel,
          chipTruncationLocation: 'none',
        });
        expect(chipText).toHaveTextContent(longLabel);
      });

      test('renders correct label when chipCharacterLimit is 15 and chipTruncationLocation is end', () => {
        const { chipText } = renderChip({
          label: longLabel,
          chipTruncationLocation: 'end',
          chipCharacterLimit: 15,
        });
        expect(chipText).toHaveTextContent('crush crush…');
      });

      test('renders correct label when chipCharacterLimit is 15 and chipTruncationLocation is start', () => {
        const { chipText } = renderChip({
          label: longLabel,
          chipTruncationLocation: 'start',
          chipCharacterLimit: 15,
        });
        expect(chipText).toHaveTextContent('…crush crush');
      });

      test('renders correct label when chipCharacterLimit is 15 and chipTruncationLocation is middle', () => {
        const { chipText } = renderChip({
          label: longLabel,
          chipTruncationLocation: 'middle',
          chipCharacterLimit: 15,
        });
        expect(chipText).toHaveTextContent('crush…crush');
      });

      test('renders correct label when chipCharacterLimit is 10 and chipTruncationLocation is end', () => {
        const { chipText } = renderChip({
          label: longLabel,
          chipCharacterLimit: 10,
          chipTruncationLocation: 'end',
        });
        expect(chipText).toHaveTextContent('crush c…');
      });

      test('renders correct label when chipCharacterLimit is 10 and chipTruncationLocation is start', () => {
        const { chipText } = renderChip({
          label: longLabel,
          chipCharacterLimit: 10,
          chipTruncationLocation: 'start',
        });
        expect(chipText).toHaveTextContent('…h crush');
      });

      test('renders correct label when chipCharacterLimit is 10 and chipTruncationLocation is middle', () => {
        const { chipText } = renderChip({
          label: longLabel,
          chipCharacterLimit: 10,
          chipTruncationLocation: 'middle',
        });
        expect(chipText).toHaveTextContent('cru…rush');
      });
    });
  });

  describe('dismiss button', () => {
    test('renders when onDismiss is passed', () => {
      const onDismiss = jest.fn();
      const { queryByTestId } = renderChip({ onDismiss });
      const button = queryByTestId('chip-dismiss-button');
      expect(button).toBeInTheDocument();
    });

    test('fires onDismiss callback', () => {
      const onDismiss = jest.fn();
      const { queryByTestId } = renderChip({ onDismiss });
      const button = queryByTestId('chip-dismiss-button');
      userEvent.click(button!);
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    test('renders with default aria-label', () => {
      const onDismiss = jest.fn();
      const { queryByTestId } = renderChip({ onDismiss });
      const button = queryByTestId('chip-dismiss-button');
      expect(button?.getAttribute('aria-label')).toBe('Deselect chip');
    });

    test('renders with updated aria-label when dismissButtonAriaLabel is passed', () => {
      const onDismiss = jest.fn();
      const { queryByTestId } = renderChip({
        onDismiss,
        dismissButtonAriaLabel: 'new aria label',
      });
      const button = queryByTestId('chip-dismiss-button');
      expect(button?.getAttribute('aria-label')).toBe('new aria label');
    });

    test('renders aria-disabled attribute when disabled is set', () => {
      const onDismiss = jest.fn();
      const { queryByTestId } = renderChip({ disabled: true, onDismiss });
      const button = queryByTestId('chip-dismiss-button');
      expect(button?.getAttribute('aria-disabled')).toBe('true');
    });

    test('does nothing when disabled button is clicked', () => {
      const onDismiss = jest.fn();
      const { queryByTestId } = renderChip({ disabled: true, onDismiss });
      const button = queryByTestId('chip-dismiss-button');
      expect(() => userEvent.click(button!)).toThrow();
      expect(onDismiss).not.toHaveBeenCalled();
    });
  });

  describe('glyph', () => {
    test('renders when glyph is passed', () => {
      const { getByTestId } = renderChip({
        glyph: <Icon glyph="Wizard" data-testid="chip-glyph" />,
      });
      const icon = getByTestId('chip-glyph');
      expect(icon).toBeInTheDocument();
    });

    test('does not renders when glyph is not passed', () => {
      const { queryByTestId } = renderChip();
      const icon = queryByTestId('chip-glyph');
      expect(icon).not.toBeInTheDocument();
    });
  });

  describe('dismiss button with truncated text', () => {
    test('renders when onDismiss is passed', () => {
      const onDismiss = jest.fn();
      const { queryByTestId } = renderChip({
        onDismiss,
        label: longLabel,
        chipTruncationLocation: 'end',
        chipCharacterLimit: 15,
      });
      const button = queryByTestId('chip-dismiss-button');
      expect(button).toBeInTheDocument();
    });

    test('fires onDismiss callback', () => {
      const onDismiss = jest.fn();
      const { queryByTestId } = renderChip({
        onDismiss,
        label: longLabel,
        chipTruncationLocation: 'end',
        chipCharacterLimit: 15,
      });
      const button = queryByTestId('chip-dismiss-button');
      userEvent.click(button!);
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    test('renders with default aria-label', () => {
      const onDismiss = jest.fn();
      const { queryByTestId } = renderChip({
        onDismiss,
        label: longLabel,
        chipTruncationLocation: 'end',
        chipCharacterLimit: 15,
      });
      const button = queryByTestId('chip-dismiss-button');
      expect(button?.getAttribute('aria-label')).toBe(
        'Deselect crush crush crush',
      );
    });

    test('renders with updated aria-label when dismissButtonAriaLabel is passed', () => {
      const onDismiss = jest.fn();
      const { queryByTestId } = renderChip({
        label: longLabel,
        onDismiss,
        dismissButtonAriaLabel: 'new aria label',
        chipTruncationLocation: 'end',
        chipCharacterLimit: 15,
      });
      const button = queryByTestId('chip-dismiss-button');
      expect(button?.getAttribute('aria-label')).toBe('new aria label');
    });

    test('renders correct label when chipCharacterLimit is 15 and chipTruncationLocation is end', () => {
      const onDismiss = jest.fn();
      const { chipText } = renderChip({
        onDismiss,
        label: longLabel,
        chipTruncationLocation: 'end',
        chipCharacterLimit: 15,
      });
      expect(chipText).toHaveTextContent('crush crush…');
    });

    test('renders correct label when chipCharacterLimit is 10 and chipTruncationLocation is end', () => {
      const onDismiss = jest.fn();
      const { chipText } = renderChip({
        onDismiss,
        label: longLabel,
        chipCharacterLimit: 10,
        chipTruncationLocation: 'end',
      });
      expect(chipText).toHaveTextContent('crush c…');
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('types behave as expected', () => {
    <>
      {/* @ts-expect-error - Missing label prop */}
      <Chip />

      <Chip label="chip" />
      <Chip
        label="chip"
        variant="blue"
        baseFontSize={13}
        disabled
        onDismiss={() => {}}
        chipCharacterLimit={10}
        chipTruncationLocation="end"
        dismissButtonAriaLabel="deselect"
        glyph={<Icon glyph="Wizard" />}
        darkMode
      />
    </>;
  });
});
