import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { keyMap } from '@leafygreen-ui/lib';

import CopyButton from './CopyButton';
import { CopyProps } from './CopyButton.types';

describe('CopyButton', () => {
  const contents = 'Lorem ipsum';
  const testIds = {
    copyButton: 'code_copy-button',
    tooltip: 'code_copy-button_tooltip',
  };

  const renderCopyButton = ({ onCopy }: Pick<CopyProps, 'onCopy'>) => {
    return render(
      <LeafyGreenProvider>
        <CopyButton onCopy={onCopy} contents={contents} />
      </LeafyGreenProvider>,
    );
  };

  describe('mouse events', () => {
    test('invokes onCopy onClick', () => {
      const onCopy = jest.fn();
      const { getByTestId } = renderCopyButton({ onCopy });
      const copyButton = getByTestId(testIds.copyButton);

      fireEvent.click(copyButton);
      expect(onCopy).toHaveBeenCalledTimes(1);
    });

    test('opens tooltip onMouseEnter and closes tooltip onMouseLeave', async () => {
      const onCopy = jest.fn();
      const { getByTestId, queryByTestId } = renderCopyButton({ onCopy });
      const copyButton = getByTestId(testIds.copyButton);
      let tooltip = queryByTestId(testIds.tooltip);

      expect(tooltip).toBeNull();

      await waitFor(() => {
        fireEvent.mouseEnter(copyButton);
        tooltip = queryByTestId(testIds.tooltip);
        expect(tooltip).toBeInTheDocument();
      });

      await waitFor(() => {
        fireEvent.mouseLeave(copyButton);
        tooltip = queryByTestId(testIds.tooltip);
        expect(tooltip).toBeNull();
      });
    });

    test('closes tooltip when clicking out of focused button', async () => {
      const onCopy = jest.fn();
      const { queryByTestId } = renderCopyButton({ onCopy });
      let tooltip = queryByTestId(testIds.tooltip);

      expect(tooltip).toBeNull();

      await waitFor(() => {
        userEvent.tab();
        tooltip = queryByTestId(testIds.tooltip);
        expect(tooltip).toBeInTheDocument();
      });

      await waitFor(() => {
        fireEvent.click(document);
        tooltip = queryByTestId(testIds.tooltip);
        expect(tooltip).toBeNull();
      });
    });
  });

  describe('keyboard events', () => {
    test.each([keyMap.Escape, keyMap.Tab])(
      'closes tooltip when %p is keyed down',
      async key => {
        const onCopy = jest.fn();
        const { getByTestId, queryByTestId } = renderCopyButton({ onCopy });
        const copyButton = getByTestId(testIds.copyButton);
        let tooltip = queryByTestId(testIds.tooltip);

        expect(tooltip).toBeNull();

        await waitFor(() => {
          userEvent.tab();
          tooltip = queryByTestId(testIds.tooltip);
          expect(tooltip).toBeInTheDocument();
        });

        await waitFor(() => {
          fireEvent.keyDown(copyButton, { key });
          tooltip = queryByTestId(testIds.tooltip);
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
        let tooltip = queryByTestId(testIds.tooltip);

        expect(tooltip).toBeNull();

        await waitFor(() => {
          userEvent.tab();
          tooltip = queryByTestId(testIds.tooltip);
          expect(tooltip).toBeInTheDocument();
        });

        await waitFor(() => {
          fireEvent.keyDown(copyButton, { key });
          tooltip = queryByTestId(testIds.tooltip);
          expect(onCopy).toHaveBeenCalledTimes(1);
          expect(tooltip).toBeInTheDocument();
        });
      },
    );
  });
});
