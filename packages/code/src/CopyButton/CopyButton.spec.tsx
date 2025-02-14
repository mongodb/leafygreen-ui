import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ClipboardJS from 'clipboard';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { keyMap } from '@leafygreen-ui/lib';

import { COPIED_SUCCESS_DURATION, COPIED_TEXT, COPY_TEXT } from './constants';
import CopyButton from './CopyButton';
import { CopyProps } from './CopyButton.types';
import CodeContextProvider from '../CodeContext/CodeContext';
import { getLgIds } from '../utils';

jest.mock('clipboard', () => {
  return jest.fn().mockImplementation(() => ({
    destroy: jest.fn(),
  }));
});

describe('CopyButton', () => {
  const contents = 'Lorem ipsum';
  const testIds = getLgIds();

  const renderCopyButton = ({ onCopy }: Pick<CopyProps, 'onCopy'>) => {
    return render(
      <CodeContextProvider
        // @ts-expect-error - other ids are missing but not needed for test
        lgids={{
          copyButton: `lg-code-copy_button`,
          copyTooltip: `lg-code-copy_tooltip`,
        }}
      >
        <CopyButton onCopy={onCopy} contents={contents} />
      </CodeContextProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test(`tooltip displays "${COPY_TEXT}" text while trigger is hovered`, async () => {
    const { getByTestId, queryByTestId } = renderCopyButton({});
    const copyButton = getByTestId(testIds.copyButton);
    let tooltip = queryByTestId(testIds.copyTooltip);
    expect(tooltip).toBeNull();

    fireEvent.mouseEnter(copyButton);

    await waitFor(() => {
      tooltip = queryByTestId(testIds.copyTooltip);
      expect(tooltip).toHaveTextContent(COPY_TEXT);
    });
  });

  test(`tooltip displays "${COPIED_TEXT}" text for ${COPIED_SUCCESS_DURATION}ms after trigger is clicked`, async () => {
    const { getByTestId, queryByTestId } = renderCopyButton({});
    const copyButton = getByTestId(testIds.copyButton);

    userEvent.click(copyButton);

    let tooltip = queryByTestId(testIds.copyTooltip);
    await waitFor(() => {
      expect(tooltip).toHaveTextContent(COPIED_TEXT);
    });

    jest.advanceTimersByTime(COPIED_SUCCESS_DURATION);

    await waitFor(() => {
      tooltip = queryByTestId(testIds.copyTooltip);
      expect(tooltip).toHaveTextContent(COPY_TEXT);
    });
  });

  describe('mouse events', () => {
    test('opens tooltip onMouseEnter and closes tooltip onMouseLeave', async () => {
      const { getByTestId, queryByTestId } = renderCopyButton({});
      const copyButton = getByTestId(testIds.copyButton);
      let tooltip = queryByTestId(testIds.copyTooltip);
      expect(tooltip).toBeNull();

      await waitFor(() => {
        fireEvent.mouseEnter(copyButton);
        tooltip = queryByTestId(testIds.copyTooltip);
        expect(tooltip).toBeInTheDocument();
      });

      await waitFor(() => {
        fireEvent.mouseLeave(copyButton);
        tooltip = queryByTestId(testIds.copyTooltip);
        expect(tooltip).toBeNull();
      });
    });

    test('invokes onCopy and copies contents to clipboard onClick', () => {
      const onCopy = jest.fn();
      const { getByTestId } = renderCopyButton({ onCopy });
      const copyButton = getByTestId(testIds.copyButton);

      userEvent.click(copyButton);

      waitFor(() => {
        expect(onCopy).toHaveBeenCalledTimes(1);
        expect(ClipboardJS).toHaveBeenCalledWith(copyButton, {
          text: expect.any(Function),
          container: undefined,
        });
      });
    });

    test('closes tooltip when clicking out of focused button', async () => {
      const { queryByTestId } = renderCopyButton({});
      let tooltip = queryByTestId(testIds.copyTooltip);
      expect(tooltip).toBeNull();

      userEvent.tab();

      await waitFor(() => {
        tooltip = queryByTestId(testIds.copyTooltip);
        expect(tooltip).toBeInTheDocument();
      });

      fireEvent.click(document);

      await waitFor(() => {
        tooltip = queryByTestId(testIds.copyTooltip);
        expect(tooltip).toBeNull();
      });
    });
  });

  describe('keyboard events', () => {
    test.each([keyMap.Escape, keyMap.Tab])(
      'closes tooltip when %p is keyed down',
      async key => {
        const { getByTestId, queryByTestId } = renderCopyButton({});
        const copyButton = getByTestId(testIds.copyButton);
        let tooltip = queryByTestId(testIds.copyTooltip);
        expect(tooltip).toBeNull();

        userEvent.tab();

        await waitFor(() => {
          tooltip = queryByTestId(testIds.copyTooltip);
          expect(tooltip).toBeInTheDocument();
        });

        fireEvent.keyDown(copyButton, { key });

        await waitFor(() => {
          tooltip = queryByTestId(testIds.copyTooltip);
          expect(tooltip).toBeNull();
        });
      },
    );

    test.each([keyMap.Enter, keyMap.Space])(
      'invokes onCopy and tooltip stays open when %p is keyed down',
      async key => {
        const onCopy = jest.fn();
        const { getByTestId, queryByTestId } = renderCopyButton({ onCopy });
        const copyButton = getByTestId(testIds.copyButton);
        let tooltip = queryByTestId(testIds.copyTooltip);
        expect(tooltip).toBeNull();

        userEvent.tab();

        await waitFor(() => {
          tooltip = queryByTestId(testIds.copyTooltip);
          expect(tooltip).toBeInTheDocument();
        });

        fireEvent.keyDown(copyButton, { key });

        await waitFor(() => {
          tooltip = queryByTestId(testIds.copyTooltip);
          expect(onCopy).toHaveBeenCalledTimes(1);
          expect(ClipboardJS).toHaveBeenCalledWith(copyButton, {
            text: expect.any(Function),
            container: undefined,
          });
          expect(tooltip).toBeInTheDocument();
        });
      },
    );
  });
});
