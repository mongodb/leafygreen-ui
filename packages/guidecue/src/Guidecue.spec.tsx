import React, { useState } from 'react';
import {
  act,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { axe } from 'jest-axe';
import { Guidecue } from '.';
import userEvent from '@testing-library/user-event';
import { timeout1 } from './styles';

// TODO: maybe add globally
async function expectElementToNotBeRemoved(element: HTMLElement) {
  try {
    await waitForElementToBeRemoved(element);
    throw new Error('Expected to catch error.');
  } catch (error) {
    // eslint-disable-next-line jest/no-try-expect
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

const guidecueTestId = 'tooltip-test-id';
const guidecueTitle = 'this is the title';
const guidecueChildren = 'this is the body content';
const buttonTextDefault = 'bottom button';

const GuidecueWrapper = ({
  open: initialOpen = false,
  buttonText = buttonTextDefault,
  currentStep = 1,
  numberOfSteps = 1,
  ...props
}: Partial<React.ComponentProps<typeof Guidecue>>) => {
  const [open, setOpen] = useState(initialOpen);

  const elem = document.createElement('div');
  const ref = { current: elem };

  return (
    <Guidecue
      open={open}
      setOpen={setOpen}
      data-testid={guidecueTestId}
      title={guidecueTitle}
      refEl={ref}
      buttonText={buttonText}
      currentStep={currentStep}
      numberOfSteps={numberOfSteps}
      {...props}
    >
      <div>{guidecueChildren}</div>
    </Guidecue>
  );
};

function renderGuidecue(
  props: Partial<React.ComponentProps<typeof Guidecue>> = {},
) {
  const utils = render(
    <>
      <div data-testid="backdrop" />
      <GuidecueWrapper {...props} />
    </>,
  );

  const backdrop = utils.getByTestId('backdrop');

  return { ...utils, backdrop };
}

describe('packages/guidecue', () => {
  describe('A11y', () => {
    test('does not have basic accessibility violations', async () => {
      const { container } = renderGuidecue({ open: true });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Stand-alone tooltip', () => {
    test('is visible when open is "true"', async () => {
      const { getByRole } = renderGuidecue({ open: true });
      const guidecue = getByRole('dialog');
      await waitFor(() => expect(guidecue).toBeVisible());
    });

    test('is not visible when open is "false"', async () => {
      const { queryByRole } = renderGuidecue({ open: true });
      const guidecue = queryByRole('dialog');
      await waitFor(() => expect(guidecue).not.toBeVisible());
    });

    test('is rendered if numberOfSteps < 1', async () => {
      const { getAllByRole } = renderGuidecue({
        open: true,
        numberOfSteps: -1,
      });
      const numOfButtons = getAllByRole('button').length;
      await waitFor(() => expect(numOfButtons).toEqual(1));
    });

    test('closes when the primary button is clicked', async () => {
      const onPrimaryButtonClick = jest.fn();
      const { getByRole } = renderGuidecue({
        open: true,
        onPrimaryButtonClick,
      });
      const guidecue = getByRole('dialog');
      const button = getByRole('button');
      userEvent.click(button);
      await waitForElementToBeRemoved(guidecue);
      expect(guidecue).not.toBeInTheDocument();
    });

    test('fires the onPrimaryButtonClick handler once when the primary button is clicked', async () => {
      const onPrimaryButtonClick = jest.fn();
      const { getByRole } = renderGuidecue({
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
      const { getByRole, backdrop } = renderGuidecue({
        open: true,
      });
      const guidecue = getByRole('dialog');
      userEvent.click(backdrop);
      await expectElementToNotBeRemoved(guidecue);
      expect(guidecue).toBeVisible();
    });

    test('closes guidecue when escape key is pressed', async () => {
      const { getByRole } = renderGuidecue({ open: true });
      const guidecue = getByRole('dialog');
      userEvent.type(guidecue, '{esc}');
      await waitForElementToBeRemoved(guidecue);
      expect(guidecue).not.toBeInTheDocument();
    });

    test('content should render in a portal', () => {
      const { container, getByTestId } = renderGuidecue({
        open: true,
      });
      expect(container).not.toContain(getByTestId(guidecueTestId));
    });

    test('number of steps should not be visible', () => {
      const { queryByText } = renderGuidecue({
        open: true,
      });

      const steps = queryByText('1 of 1');
      expect(steps).not.toBeInTheDocument();
    });

    test('title should be visible', () => {
      const { getByText } = renderGuidecue({
        open: true,
      });

      const title = getByText(guidecueTitle);
      expect(title).toBeInTheDocument();
    });

    test('body content should be visible', () => {
      const { getByText } = renderGuidecue({
        open: true,
      });

      const body = getByText(guidecueChildren);
      expect(body).toBeInTheDocument();
    });

    test('will render inside portal and scroll container', async () => {
      const elem = document.createElement('div');
      document.body.appendChild(elem);
      renderGuidecue({
        open: true,
        portalContainer: elem,
        scrollContainer: elem,
      });
      await act(async () => {
        expect(elem.innerHTML.includes(guidecueTitle)).toBe(true);
      });
    });
  });

  describe('Multi-step tooltip', () => {
    test('is visible when open is "true"', async () => {
      const { getByRole } = renderGuidecue({
        open: true,
        numberOfSteps: 2,
        currentStep: 1,
      });
      await act(async () => {
        await waitForTimeout(timeout1);
      });
      const guidecue = getByRole('dialog');
      await waitFor(() => expect(guidecue).toBeVisible());
    });

    test('closes when the dismiss(X) button is clicked', async () => {
      const onClose = jest.fn();
      const { getByRole, getByLabelText } = renderGuidecue({
        open: true,
        numberOfSteps: 2,
        currentStep: 1,
        onDismiss: onClose,
      });
      await act(async () => {
        await waitForTimeout(timeout1);
      });
      const guidecue = getByRole('dialog');
      const button = getByLabelText('Close Tooltip', { selector: 'button' });
      userEvent.click(button);
      await waitForElementToBeRemoved(guidecue);
      expect(guidecue).not.toBeInTheDocument();
    });

    test('fires the onClose handler once when the dismiss(X) button is clicked', async () => {
      const onClose = jest.fn();
      const { getByLabelText } = renderGuidecue({
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
      await act(async () => {
        await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
      });
    });

    test('closes when the primary button is clicked', async () => {
      const onPrimaryButtonClick = jest.fn();
      const { getByRole, getAllByRole } = renderGuidecue({
        open: true,
        numberOfSteps: 2,
        currentStep: 1,
        onPrimaryButtonClick,
      });
      await act(async () => {
        await waitForTimeout(timeout1);
      });
      const guidecue = getByRole('dialog');
      const button = getAllByRole('button')[1];
      userEvent.click(button);
      await waitForElementToBeRemoved(guidecue);
      expect(guidecue).not.toBeInTheDocument();
    });

    test('fires the onPrimaryButtonClick handler once when the primary button is clicked', async () => {
      const onPrimaryButtonClick = jest.fn();
      const { getAllByRole } = renderGuidecue({
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
      await act(async () => {
        await waitFor(() =>
          expect(onPrimaryButtonClick).toHaveBeenCalledTimes(1),
        );
      });
    });

    test('a click outside the tooltip should do nothing', async () => {
      const { getByRole, backdrop } = renderGuidecue({
        open: true,
        numberOfSteps: 2,
        currentStep: 1,
      });
      await act(async () => {
        await waitForTimeout(timeout1);
      });
      const guidecue = getByRole('dialog');
      userEvent.click(backdrop);
      await expectElementToNotBeRemoved(guidecue);
      expect(guidecue).toBeVisible();
    });

    test('closes guidecue when escape key is pressed', async () => {
      const { getByRole } = renderGuidecue({
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
      const { container, getByTestId } = renderGuidecue({
        open: true,
        numberOfSteps: 2,
        currentStep: 1,
      });
      await act(async () => {
        await waitFor(() =>
          expect(container).not.toContain(getByTestId(guidecueTestId)),
        );
      });
    });

    test('number of steps should be visible', async () => {
      const { getByText } = renderGuidecue({
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
      const { getByText } = renderGuidecue({
        open: true,
        numberOfSteps: 2,
        currentStep: 1,
      });
      await act(async () => {
        await waitForTimeout(timeout1);
      });
      const title = getByText(guidecueTitle);
      expect(title).toBeInTheDocument();
    });

    test('body content should be visible', async () => {
      const { getByText } = renderGuidecue({
        open: true,
        numberOfSteps: 2,
        currentStep: 1,
      });
      await act(async () => {
        await waitForTimeout(timeout1);
      });
      const body = getByText(guidecueChildren);
      expect(body).toBeInTheDocument();
    });

    test('dismiss button and primary button should be visible', async () => {
      const { getAllByRole } = renderGuidecue({
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
      renderGuidecue({
        open: true,
        numberOfSteps: 2,
        currentStep: 1,
        portalContainer: elem,
        scrollContainer: elem,
      });
      await act(async () => {
        await waitFor(() =>
          expect(elem.innerHTML.includes(guidecueTitle)).toBe(true),
        );
      });
    });
  });
});
