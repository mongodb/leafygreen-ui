import React from 'react';
import {
  act,
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import ClipboardJS from 'clipboard';
import { axe } from 'jest-axe';

import { Context, jest as localJest } from '@leafygreen-ui/testing-lib';

import Copyable from '.';

describe('packages/copyable', () => {
  test('text elements are rendered', () => {
    const { getByText } = render(
      <Copyable label="Label" description="Description">
        Hello world
      </Copyable>,
    );

    expect(getByText('Label')).toBeVisible();
    expect(getByText('Description')).toBeVisible();
    expect(getByText('Hello world')).toBeVisible();
  });

  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container, getByText } = Context.within(
        localJest.spyContext(ClipboardJS, 'isSupported'),
        spy => {
          spy.mockReturnValue(true);

          return render(
            <Copyable label="Label" description="Description">
              Hello world
            </Copyable>,
          );
        },
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();

      let newResults = null as any;
      act(() => void fireEvent.click(getByText('Copy')));
      await act(async () => {
        newResults = await axe(container);
      });
      expect(newResults).toHaveNoViolations();
    });
  });

  describe('copy button', () => {
    test('fires onCopy callback when clicked', async () => {
      const onCopy = jest.fn();

      await Context.within(
        localJest.spyContext(ClipboardJS, 'isSupported'),
        async spy => {
          spy.mockReturnValue(true);

          const { getByText, queryByText } = render(
            <Copyable label="Label" description="Description" onCopy={onCopy}>
              Hello world
            </Copyable>,
          );

          expect(queryByText('Copied!')).not.toBeInTheDocument();

          const copyButton = getByText('Copy');
          expect(copyButton).toBeVisible();

          await Context.within(
            localJest.spyContext(ClipboardJS.prototype, 'onClick'),
            async spy => {
              expect(spy).not.toHaveBeenCalled();
              fireEvent.click(copyButton);
              await waitFor(() => expect(spy).toHaveBeenCalled());
            },
          );

          await waitFor(() => expect(onCopy).toHaveBeenCalled());
        },
      );
    });

    test('has tooltip when clicked', async () => {
      await Context.within(
        localJest.spyContext(ClipboardJS, 'isSupported'),
        async spy => {
          spy.mockReturnValue(true);

          const { getByText, queryByText } = render(
            <Copyable label="Label" description="Description">
              Hello world
            </Copyable>,
          );

          expect(queryByText('Copied!')).not.toBeInTheDocument();

          const copyButton = getByText('Copy');
          expect(copyButton).toBeVisible();

          await Context.within(
            localJest.spyContext(ClipboardJS.prototype, 'onClick'),
            async spy => {
              expect(spy).not.toHaveBeenCalled();
              fireEvent.click(copyButton);
              await waitFor(() => expect(spy).toHaveBeenCalled());
            },
          );

          await waitFor(() => expect(getByText('Copied!')).toBeVisible());

          // Tooltip should remain visible for a while
          await new Promise(resolve => setTimeout(resolve, 1000));
          expect(getByText('Copied!')).toBeVisible();

          // Tooltip should eventually disappear
          await waitForElementToBeRemoved(() => queryByText('Copied!'));
        },
      );
    });

    test('is not shown when `copyable` is `false`', () => {
      const { queryByText } = render(
        <Copyable label="Label" description="Description" copyable={false}>
          Hello world
        </Copyable>,
      );

      expect(queryByText('Copy')).not.toBeInTheDocument();
    });

    test('is shown by default when clipboard API is supported', () => {
      const { queryByText } = Context.within(
        localJest.spyContext(ClipboardJS, 'isSupported'),
        spy => {
          spy.mockReturnValue(true);

          return render(
            <Copyable label="Label" description="Description">
              Hello world
            </Copyable>,
          );
        },
      );

      expect(queryByText('Copy')).toBeVisible();
    });

    test('is not shown when clipboard API is not supported', () => {
      const { queryByText } = Context.within(
        localJest.spyContext(ClipboardJS, 'isSupported'),
        spy => {
          spy.mockReturnValue(false);

          return render(
            <Copyable label="Label" description="Description">
              Hello world
            </Copyable>,
          );
        },
      );

      expect(queryByText('Copy')).not.toBeInTheDocument();
    });
  });
});
