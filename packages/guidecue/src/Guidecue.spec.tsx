import React, { useState } from 'react';
import {
  act,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { axe } from 'jest-axe';
import Guidecue from '.';
import userEvent from '@testing-library/user-event';

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
  numberOfSteps = 1,
  currentStep = 1,
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
      numberOfSteps={numberOfSteps}
      currentStep={currentStep}
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

  describe('Stand-alone guidecue', () => {
    test('is visible when open is "true"', async () => {
      const { getByRole } = renderGuidecue({ open: true });
      const guidecue = getByRole('dialog');
      await waitFor(() => expect(guidecue).toBeVisible());
    });

    test('closes when the primary button is clicked and fires the onButtonClick handler once', async () => {
      const onButtonClick = jest.fn();
      const { getByRole } = renderGuidecue({ open: true, onButtonClick });
      const guidecue = getByRole('dialog');
      const button = getByRole('button');
      userEvent.click(button);
      expect(onButtonClick).toHaveBeenCalledTimes(1);
      await waitForElementToBeRemoved(guidecue);
      expect(guidecue).not.toBeInTheDocument();
    });

    test('backdrop click should do nothing', async () => {
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

    test('expect content to be at the end of the dom', () => {
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

    test('title and body content should be visible', () => {
      const { getByText } = renderGuidecue({
        open: true,
      });

      const title = getByText(guidecueTitle);
      const body = getByText(guidecueChildren);
      expect(title).toBeInTheDocument();
      expect(body).toBeInTheDocument();
    });
  });

  describe('Multistep guidecue', () => {
    test('is visible when open is "true"', async () => {
      const { getByRole } = renderGuidecue({
        open: true,
        numberOfSteps: 2,
        currentStep: 1,
      });
      await act(async () => {
        await waitForTimeout(500);
      });
      const guidecue = getByRole('dialog');
      await waitFor(() => expect(guidecue).toBeVisible());
    });

    test('closes when the X icon is clicked and fires the onClose handler once', async () => {
      const onClose = jest.fn();
      const { getByRole, getByLabelText } = renderGuidecue({
        open: true,
        numberOfSteps: 2,
        currentStep: 1,
        onClose,
      });
      await act(async () => {
        await waitForTimeout(500);
      });
      const guidecue = getByRole('dialog');
      const button = getByLabelText('Close Tooltip', { selector: 'button' });
      userEvent.click(button);
      expect(onClose).toHaveBeenCalledTimes(1);
      await waitForElementToBeRemoved(guidecue);
      expect(guidecue).not.toBeInTheDocument();
    });

    test('closes when the primary button is clicked and fires the onButtonClick handler once', async () => {
      const onButtonClick = jest.fn();
      const { getByRole, getAllByRole } = renderGuidecue({
        open: true,
        numberOfSteps: 2,
        currentStep: 1,
        onButtonClick,
      });
      await act(async () => {
        await waitForTimeout(500);
      });
      const guidecue = getByRole('dialog');
      const button = getAllByRole('button')[1];
      userEvent.click(button);
      expect(onButtonClick).toHaveBeenCalledTimes(1);
      await waitForElementToBeRemoved(guidecue);
      expect(guidecue).not.toBeInTheDocument();
    });

    test('backdrop click should do nothing', async () => {
      const { getByRole, backdrop } = renderGuidecue({
        open: true,
        numberOfSteps: 2,
        currentStep: 1,
      });

      await act(async () => {
        await waitForTimeout(500);
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
        await waitForTimeout(500);
      });

      const modal = getByRole('dialog');
      userEvent.type(modal, '{esc}');

      await waitForElementToBeRemoved(modal);
      expect(modal).not.toBeInTheDocument();
    });

    test('expect content to be at the end of the dom', async () => {
      const { container, getByTestId } = renderGuidecue({
        open: true,
        numberOfSteps: 2,
        currentStep: 1,
      });

      await act(async () => {
        await waitForTimeout(500);
      });
      expect(container).not.toContain(getByTestId(guidecueTestId));
    });

    test('number of steps should be visible', async () => {
      const { getByText } = renderGuidecue({
        open: true,
        numberOfSteps: 2,
        currentStep: 1,
      });

      await act(async () => {
        await waitForTimeout(500);
      });

      const steps = getByText('1 of 2');
      expect(steps).toBeInTheDocument();
    });

    test('title and body content should be visible', async () => {
      const { getByText } = renderGuidecue({
        open: true,
        numberOfSteps: 2,
        currentStep: 1,
      });

      await act(async () => {
        await waitForTimeout(500);
      });

      const title = getByText(guidecueTitle);
      const body = getByText(guidecueChildren);
      expect(title).toBeInTheDocument();
      expect(body).toBeInTheDocument();
    });
  });
});
