import React, { createRef, useState } from 'react';
import {
  act,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { timeout1 } from './styles';
import { GuideCue } from '.';

// TODO: maybe add globally
async function expectElementToNotBeRemoved(element: HTMLElement) {
  try {
    await waitForElementToBeRemoved(element);
    throw new Error('Expected to catch error.');
  } catch (error) {
    if (error instanceof Error) {
      expect(error.toString()).toMatch(
        'Timed out in waitForElementToBeRemoved.',
      );
    }
  }
}

function waitForTimeout(timeout = 500) {
  return new Promise(res => setTimeout(res, timeout));
}

const guideCueTestId = 'tooltip-test-id';
const guideCueTitle = 'this is the title';
const guideCueChildren = 'this is the body content';
const buttonTextDefault = 'bottom button';

const GuideCueWrapper = ({
  open: initialOpen = false,
  buttonText = buttonTextDefault,
  currentStep = 1,
  numberOfSteps = 1,
  refEl,
  ...props
}: Partial<React.ComponentProps<typeof GuideCue>>) => {
  const [open, setOpen] = useState(initialOpen);

  return (
    <GuideCue
      open={open}
      setOpen={setOpen}
      data-testid={guideCueTestId}
      title={guideCueTitle}
      refEl={refEl as React.RefObject<HTMLElement>}
      buttonText={buttonText}
      currentStep={currentStep}
      numberOfSteps={numberOfSteps}
      {...props}
    >
      <div>{guideCueChildren}</div>
    </GuideCue>
  );
};

function renderGuideCue(
  props: Partial<React.ComponentProps<typeof GuideCue>> = {},
) {
  const elem = document.createElement('div');
  document.body.appendChild(elem);
  const ref = { current: elem };
  const utils = render(
    <>
      <div data-testid="backdrop" />
      <GuideCueWrapper refEl={ref} {...props} />
    </>,
  );

  const backdrop = utils.getByTestId('backdrop');

  return { ...utils, backdrop };
}

describe('packages/guide-cue', () => {
  describe('A11y', () => {
    test('does not have basic accessibility violations', async () => {
      const { container } = renderGuideCue({ open: true });
      await waitFor(async () => {
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
  });

  describe('Stand-alone tooltip', () => {
    test('is visible when open is "true"', async () => {
      const { getByRole } = renderGuideCue({ open: true });
      const guideCue = getByRole('dialog');
      await waitFor(() => expect(guideCue).toBeVisible());
    });

    test('is not visible when open is "false"', async () => {
      const { queryByRole } = renderGuideCue({ open: false });
      const guideCue = queryByRole('dialog');
      await waitFor(() => expect(guideCue).not.toBeInTheDocument());
    });

    test('is rendered if numberOfSteps < 1', async () => {
      const { getAllByRole } = renderGuideCue({
        open: true,
        numberOfSteps: -1,
      });
      const numOfButtons = getAllByRole('button').length;
      await waitFor(() => expect(numOfButtons).toEqual(1));
    });

    test('closes when the primary button is clicked', async () => {
      const onPrimaryButtonClick = jest.fn();
      const { getByRole } = renderGuideCue({
        open: true,
        onPrimaryButtonClick,
      });
      const guideCue = getByRole('dialog');
      const button = getByRole('button');
      userEvent.click(button);
      await waitForElementToBeRemoved(guideCue);
      expect(guideCue).not.toBeInTheDocument();
    });

    test('fires the onPrimaryButtonClick handler once when the primary button is clicked', async () => {
      const onPrimaryButtonClick = jest.fn();
      const { getByRole } = renderGuideCue({
        open: true,
        onPrimaryButtonClick,
      });
      const button = getByRole('button');
      userEvent.click(button);
      await act(async () => {
        await waitFor(() =>
          expect(onPrimaryButtonClick).toHaveBeenCalledTimes(1),
        );
      });
    });

    test('a click outside of the tooltip should do nothing', async () => {
      const { getByRole, backdrop } = renderGuideCue({
        open: true,
      });
      const guideCue = getByRole('dialog');
      userEvent.click(backdrop);
      await expectElementToNotBeRemoved(guideCue);
      expect(guideCue).toBeVisible();
    });

    test('closes guide-cue when escape key is pressed', async () => {
      const { getByRole } = renderGuideCue({ open: true });
      const guideCue = getByRole('dialog');
      userEvent.type(guideCue, '{esc}');
      await waitForElementToBeRemoved(guideCue);
      expect(guideCue).not.toBeInTheDocument();
    });

    test('content should render in a portal', () => {
      const { container, queryByTestId } = renderGuideCue({
        open: true,
      });
      const guideCue = queryByTestId(guideCueTestId);
      expect(container).not.toContainElement(guideCue);
    });

    test('number of steps should not be visible', () => {
      const { queryByText } = renderGuideCue({
        open: true,
      });

      const steps = queryByText('1 of 1');
      expect(steps).not.toBeInTheDocument();
    });

    test('title should be visible', () => {
      const { getByText } = renderGuideCue({
        open: true,
      });

      const title = getByText(guideCueTitle);
      expect(title).toBeInTheDocument();
    });

    test('body content should be visible', () => {
      const { getByText } = renderGuideCue({
        open: true,
      });

      const body = getByText(guideCueChildren);
      expect(body).toBeInTheDocument();
    });

    test('will render inside portal and scroll container', async () => {
      const elem = document.createElement('div');
      document.body.appendChild(elem);
      renderGuideCue({
        open: true,
        portalContainer: elem,
        scrollContainer: elem,
      });
      await act(async () => {
        expect(elem.innerHTML.includes(guideCueTitle)).toBe(true);
      });
    });

    test('accepts a portalRef', async () => {
      const portalContainer = document.createElement('div');
      document.body.appendChild(portalContainer);
      const portalRef = createRef<HTMLElement>();
      renderGuideCue({
        open: true,
        portalContainer,
        portalRef,
      });
      expect(portalRef.current).toBeDefined();
      expect(portalRef.current).toBe(portalContainer);
    });
  });

  describe('Multi-step tooltip', () => {
    test('is visible when open is "true"', async () => {
      const { getByRole } = renderGuideCue({
        open: true,
        numberOfSteps: 2,
        currentStep: 1,
      });
      await act(async () => {
        await waitForTimeout(timeout1);
      });
      const guideCue = getByRole('dialog');
      await waitFor(() => expect(guideCue).toBeVisible());
    });

    test('closes when the dismiss(X) button is clicked', async () => {
      const onClose = jest.fn();
      const { getByRole, getByLabelText } = renderGuideCue({
        open: true,
        numberOfSteps: 2,
        currentStep: 1,
        onDismiss: onClose,
      });
      await act(async () => {
        await waitForTimeout(timeout1);
      });
      const guideCue = getByRole('dialog');
      const button = getByLabelText('Close Tooltip', { selector: 'button' });
      userEvent.click(button);
      await waitForElementToBeRemoved(guideCue);
      expect(guideCue).not.toBeInTheDocument();
    });

    test('fires the onClose handler once when the dismiss(X) button is clicked', async () => {
      const onClose = jest.fn();
      const { getByLabelText } = renderGuideCue({
        open: true,
        numberOfSteps: 2,
        currentStep: 1,
        onDismiss: onClose,
      });
      await act(async () => {
        await waitForTimeout(timeout1);
      });
      const button = getByLabelText('Close Tooltip', { selector: 'button' });
      userEvent.click(button);
      await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
    });

    test('closes when the primary button is clicked', async () => {
      const onPrimaryButtonClick = jest.fn();
      const { getByRole, getAllByRole } = renderGuideCue({
        open: true,
        numberOfSteps: 2,
        currentStep: 1,
        onPrimaryButtonClick,
      });
      await act(async () => {
        await waitForTimeout(timeout1);
      });
      const guideCue = getByRole('dialog');
      const button = getAllByRole('button')[1];
      userEvent.click(button);
      await waitForElementToBeRemoved(guideCue);
      expect(guideCue).not.toBeInTheDocument();
    });

    test('fires the onPrimaryButtonClick handler once when the primary button is clicked', async () => {
      const onPrimaryButtonClick = jest.fn();
      const { getAllByRole } = renderGuideCue({
        open: true,
        numberOfSteps: 2,
        currentStep: 1,
        onPrimaryButtonClick,
      });
      await act(async () => {
        await waitForTimeout(timeout1);
      });
      const button = getAllByRole('button')[1];
      userEvent.click(button);
      await waitFor(() =>
        expect(onPrimaryButtonClick).toHaveBeenCalledTimes(1),
      );
    });

    test('a click outside the tooltip should do nothing', async () => {
      const { getByRole, backdrop } = renderGuideCue({
        open: true,
        numberOfSteps: 2,
        currentStep: 1,
      });
      await act(async () => {
        await waitForTimeout(timeout1);
      });
      const guideCue = getByRole('dialog');
      userEvent.click(backdrop);
      await expectElementToNotBeRemoved(guideCue);
      expect(guideCue).toBeVisible();
    });

    test('closes guide-cue when escape key is pressed', async () => {
      const { getByRole } = renderGuideCue({
        open: true,
        numberOfSteps: 2,
        currentStep: 1,
      });
      await act(async () => {
        await waitForTimeout(timeout1);
      });
      const modal = getByRole('dialog');
      userEvent.type(modal, '{esc}');
      await waitForElementToBeRemoved(modal);
      expect(modal).not.toBeInTheDocument();
    });

    test('content should render in a portal', async () => {
      const { container, findByTestId } = renderGuideCue({
        open: true,
        numberOfSteps: 2,
        currentStep: 1,
      });

      const guideCue = await findByTestId(guideCueTestId);
      expect(container).not.toContainElement(guideCue);
    });

    test('number of steps should be visible', async () => {
      const { getByText } = renderGuideCue({
        open: true,
        numberOfSteps: 2,
        currentStep: 1,
      });
      await act(async () => {
        await waitForTimeout(timeout1);
      });
      const steps = getByText('1 of 2');
      expect(steps).toBeInTheDocument();
    });

    test('title should be visible', async () => {
      const { getByText } = renderGuideCue({
        open: true,
        numberOfSteps: 2,
        currentStep: 1,
      });
      await act(async () => {
        await waitForTimeout(timeout1);
      });
      const title = getByText(guideCueTitle);
      expect(title).toBeInTheDocument();
    });

    test('body content should be visible', async () => {
      const { getByText } = renderGuideCue({
        open: true,
        numberOfSteps: 2,
        currentStep: 1,
      });
      await act(async () => {
        await waitForTimeout(timeout1);
      });
      const body = getByText(guideCueChildren);
      expect(body).toBeInTheDocument();
    });

    test('dismiss button and primary button should be visible', async () => {
      const { getAllByRole } = renderGuideCue({
        open: true,
        numberOfSteps: 2,
        currentStep: 1,
      });
      await act(async () => {
        await waitForTimeout(timeout1);
      });
      const numOfButtons = getAllByRole('button').length;
      await waitFor(() => expect(numOfButtons).toEqual(2));
    });

    test('will render inside portal and scroll container', async () => {
      const elem = document.createElement('div');
      document.body.appendChild(elem);
      const { findByText } = renderGuideCue({
        open: true,
        numberOfSteps: 2,
        currentStep: 1,
        portalContainer: elem,
        scrollContainer: elem,
      });

      const guideCue = await findByText(guideCueTitle);
      expect(elem).toContainElement(guideCue);
    });
  });
});
