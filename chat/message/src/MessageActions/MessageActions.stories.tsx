import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { Message } from '../Message';

import { FEEDBACK_TEXTAREA_TEST_ID } from './MessageActions.constants';
import { MessageActions, MessageActionsProps } from '.';

// eslint-disable-next-line no-console
const testOnClickCopy = () => console.log('Copy clicked');
// eslint-disable-next-line no-console
const testOnClickRetry = () => console.log('Retry clicked');
// eslint-disable-next-line no-console
const testOnRatingChange = () => console.log('Rating changed');
// eslint-disable-next-line no-console
const testOnSubmitFeedback = () => console.log('Feedback submitted');

const SAMPLE_MESSAGE_BODY =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

const meta: StoryMetaType<typeof MessageActions> = {
  title: 'Composition/Chat/Message/Actions',
  component: MessageActions,
  args: {
    onClickCopy: testOnClickCopy,
    onClickRetry: testOnClickRetry,
    onRatingChange: testOnRatingChange,
    onSubmitFeedback: testOnSubmitFeedback,
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
  decorators: [
    (Story: StoryFn, context) => (
      <LeafyGreenProvider darkMode={context?.args.darkMode}>
        <Message isSender={false} messageBody={SAMPLE_MESSAGE_BODY}>
          <Story />
        </Message>
      </LeafyGreenProvider>
    ),
  ],
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        onClickRetry: [undefined, testOnClickRetry],
        onRatingChange: [undefined, testOnRatingChange],
      },
      decorator: (StoryFn, context) => (
        <LeafyGreenProvider darkMode={context?.args.darkMode}>
          <Message isSender={false} messageBody={SAMPLE_MESSAGE_BODY}>
            <StoryFn />
          </Message>
        </LeafyGreenProvider>
      ),
    },
  },
};
export default meta;

const Template: StoryFn<MessageActionsProps> = props => (
  <MessageActions {...props} />
);

/** Helper function to hover over a button and verify tooltip appears */
const hoverAndVerifyTooltip = async (
  canvas: ReturnType<typeof within>,
  options: {
    buttonRole: 'button' | 'radio';
    buttonName: string;
    tooltipName: string;
  },
) => {
  const { buttonRole, buttonName, tooltipName } = options;
  const button = canvas.getByRole(buttonRole, { name: buttonName });
  await userEvent.hover(button);
  const tooltip = await canvas.findByRole('tooltip', { name: tooltipName });
  expect(tooltip).toBeInTheDocument();
};

/** Helper function to click a button and unhover it */
const clickAndUnhover = async (
  canvas: ReturnType<typeof within>,
  options: {
    buttonRole: 'button' | 'radio';
    buttonName: string;
  },
) => {
  const { buttonRole, buttonName } = options;
  const button = canvas.getByRole(buttonRole, { name: buttonName });
  await userEvent.click(button);
  await userEvent.unhover(button);
  return button;
};

/** Helper to get feedback form elements */
const getFeedbackFormElements = (canvas: ReturnType<typeof within>) => {
  const textarea = canvas.getByTestId(FEEDBACK_TEXTAREA_TEST_ID);
  const submitButton = canvas.getByRole('button', { name: 'Submit' });
  return { textarea, submitButton };
};

/** Helper to verify feedback form is visible */
const verifyFeedbackFormVisible = (canvas: ReturnType<typeof within>) => {
  const { textarea, submitButton } = getFeedbackFormElements(canvas);
  expect(textarea).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
};

/** Helper to verify feedback form is hidden */
const verifyFeedbackFormHidden = (canvas: ReturnType<typeof within>) => {
  expect(canvas.queryByTestId(FEEDBACK_TEXTAREA_TEST_ID)).toBeNull();
  expect(canvas.queryByRole('button', { name: 'Submit' })).toBeNull();
};

/** Helper to type feedback text */
const typeFeedback = async (
  canvas: ReturnType<typeof within>,
  text: string,
) => {
  const { textarea } = getFeedbackFormElements(canvas);
  await userEvent.type(textarea, text);
  expect(textarea).toHaveValue(text);
};

/** Helper to submit feedback */
const submitFeedback = async (canvas: ReturnType<typeof within>) => {
  const { submitButton } = getFeedbackFormElements(canvas);
  await userEvent.click(submitButton);
};

/** Helper to verify success message */
const verifySuccessMessage = (canvas: ReturnType<typeof within>) => {
  const successMessage = canvas.getByText('Thanks for your feedback!');
  expect(successMessage).toBeInTheDocument();
};

/** Helper to verify error message */
const verifyErrorMessage = (
  canvas: ReturnType<typeof within>,
  errorMessage: string,
) => {
  const error = canvas.getByText(errorMessage);
  expect(error).toBeInTheDocument();
};

export const LiveExample: StoryObj<MessageActionsProps> = {
  render: Template,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const LightModeWithCopyHover: StoryObj<MessageActionsProps> = {
  render: Template,
  args: {
    onClickCopy: testOnClickCopy,
  },
  play: async ({ canvasElement }) => {
    await hoverAndVerifyTooltip(within(canvasElement), {
      buttonRole: 'button',
      buttonName: 'Copy message',
      tooltipName: 'Copy',
    });
  },
  parameters: {
    chromatic: {
      delay: 500,
    },
  },
};

export const DarkModeWithCopyHover: StoryObj<MessageActionsProps> = {
  render: Template,
  args: {
    darkMode: true,
    onClickCopy: testOnClickCopy,
  },
  play: async ({ canvasElement }) => {
    await hoverAndVerifyTooltip(within(canvasElement), {
      buttonRole: 'button',
      buttonName: 'Copy message',
      tooltipName: 'Copy',
    });
  },
  parameters: {
    chromatic: {
      delay: 500,
    },
  },
};

export const LightModeWithRetryHover: StoryObj<MessageActionsProps> = {
  render: Template,
  args: {
    onClickRetry: testOnClickRetry,
  },
  play: async ({ canvasElement }) => {
    await hoverAndVerifyTooltip(within(canvasElement), {
      buttonRole: 'button',
      buttonName: 'Retry message',
      tooltipName: 'Retry',
    });
  },
  parameters: {
    chromatic: {
      delay: 500,
    },
  },
};

export const DarkModeWithRetryHover: StoryObj<MessageActionsProps> = {
  render: Template,
  args: {
    darkMode: true,
    onClickRetry: testOnClickRetry,
  },
  play: async ({ canvasElement }) => {
    await hoverAndVerifyTooltip(within(canvasElement), {
      buttonRole: 'button',
      buttonName: 'Retry message',
      tooltipName: 'Retry',
    });
  },
  parameters: {
    chromatic: {
      delay: 500,
    },
  },
};

export const LightModeWithRatingHover: StoryObj<MessageActionsProps> = {
  render: Template,
  args: {
    onRatingChange: testOnRatingChange,
    onSubmitFeedback: testOnSubmitFeedback,
  },
  play: async ({ canvasElement }) => {
    await hoverAndVerifyTooltip(within(canvasElement), {
      buttonRole: 'radio',
      buttonName: 'Like this message',
      tooltipName: 'Helpful',
    });
  },
  parameters: {
    chromatic: {
      delay: 500,
    },
  },
};

export const DarkModeWithRatingHover: StoryObj<MessageActionsProps> = {
  render: Template,
  args: {
    darkMode: true,
    onRatingChange: testOnRatingChange,
    onSubmitFeedback: testOnSubmitFeedback,
  },
  play: async ({ canvasElement }) => {
    await hoverAndVerifyTooltip(within(canvasElement), {
      buttonRole: 'radio',
      buttonName: 'Like this message',
      tooltipName: 'Helpful',
    });
  },
  parameters: {
    chromatic: {
      delay: 500,
    },
  },
};

export const LightModeWithRatingSelect: StoryObj<MessageActionsProps> = {
  render: Template,
  args: {
    onRatingChange: testOnRatingChange,
    onSubmitFeedback: testOnSubmitFeedback,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await clickAndUnhover(canvas, {
      buttonRole: 'radio',
      buttonName: 'Like this message',
    });

    verifyFeedbackFormVisible(canvas);
  },
  parameters: {
    chromatic: {
      delay: 100,
    },
  },
};

export const DarkModeWithRatingSelect: StoryObj<MessageActionsProps> = {
  render: Template,
  args: {
    darkMode: true,
    onRatingChange: testOnRatingChange,
    onSubmitFeedback: testOnSubmitFeedback,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await clickAndUnhover(canvas, {
      buttonRole: 'radio',
      buttonName: 'Like this message',
    });

    verifyFeedbackFormVisible(canvas);
  },
  parameters: {
    chromatic: {
      delay: 100,
    },
  },
};

export const LightModeWithRatingSelectAndFeedback: StoryObj<MessageActionsProps> =
  {
    render: Template,
    args: {
      onRatingChange: testOnRatingChange,
      onSubmitFeedback: testOnSubmitFeedback,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      await clickAndUnhover(canvas, {
        buttonRole: 'radio',
        buttonName: 'Like this message',
      });

      await typeFeedback(canvas, 'Lorem ipsum');

      const { submitButton } = getFeedbackFormElements(canvas);
      expect(submitButton).toBeInTheDocument();
    },
    parameters: {
      chromatic: {
        delay: 300,
      },
    },
  };

export const DarkModeWithRatingSelectAndFeedback: StoryObj<MessageActionsProps> =
  {
    render: Template,
    args: {
      darkMode: true,
      onRatingChange: testOnRatingChange,
      onSubmitFeedback: testOnSubmitFeedback,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      await clickAndUnhover(canvas, {
        buttonRole: 'radio',
        buttonName: 'Like this message',
      });

      await typeFeedback(canvas, 'Lorem ipsum');

      const { submitButton } = getFeedbackFormElements(canvas);
      expect(submitButton).toBeInTheDocument();
    },
    parameters: {
      chromatic: {
        delay: 300,
      },
    },
  };

export const LightModeWithRatingSelectAndFeedbackAndSubmitSuccess: StoryObj<MessageActionsProps> =
  {
    render: Template,
    args: {
      onRatingChange: testOnRatingChange,
      onSubmitFeedback: testOnSubmitFeedback,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      await clickAndUnhover(canvas, {
        buttonRole: 'radio',
        buttonName: 'Like this message',
      });

      await typeFeedback(canvas, 'Lorem ipsum');

      await submitFeedback(canvas);

      verifySuccessMessage(canvas);

      verifyFeedbackFormHidden(canvas);
    },
    parameters: {
      chromatic: {
        delay: 300,
      },
    },
  };

export const DarkModeWithRatingSelectAndFeedbackAndSubmitSuccess: StoryObj<MessageActionsProps> =
  {
    render: Template,
    args: {
      darkMode: true,
      onRatingChange: testOnRatingChange,
      onSubmitFeedback: testOnSubmitFeedback,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      await clickAndUnhover(canvas, {
        buttonRole: 'radio',
        buttonName: 'Like this message',
      });

      await typeFeedback(canvas, 'Lorem ipsum');

      await submitFeedback(canvas);

      verifySuccessMessage(canvas);

      verifyFeedbackFormHidden(canvas);
    },
    parameters: {
      chromatic: {
        delay: 300,
      },
    },
  };

export const LightModeWithRatingSelectAndFeedbackAndSubmitSuccessAndFade: StoryObj<MessageActionsProps> =
  {
    render: Template,
    args: {
      onRatingChange: testOnRatingChange,
      onSubmitFeedback: testOnSubmitFeedback,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      await clickAndUnhover(canvas, {
        buttonRole: 'radio',
        buttonName: 'Like this message',
      });

      await typeFeedback(canvas, 'Lorem ipsum');

      await submitFeedback(canvas);

      verifySuccessMessage(canvas);

      verifyFeedbackFormHidden(canvas);
    },
    parameters: {
      chromatic: {
        delay: 3600,
      },
    },
  };

export const DarkModeWithRatingSelectAndFeedbackAndSubmitSuccessAndFade: StoryObj<MessageActionsProps> =
  {
    render: Template,
    args: {
      darkMode: true,
      onRatingChange: testOnRatingChange,
      onSubmitFeedback: testOnSubmitFeedback,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      await clickAndUnhover(canvas, {
        buttonRole: 'radio',
        buttonName: 'Like this message',
      });

      await typeFeedback(canvas, 'Lorem ipsum');

      await submitFeedback(canvas);

      verifySuccessMessage(canvas);

      verifyFeedbackFormHidden(canvas);
    },
    parameters: {
      chromatic: {
        delay: 3600,
      },
    },
  };

export const LightModeWithRatingSelectAndFeedbackSubmitError: StoryObj<MessageActionsProps> =
  {
    render: Template,
    args: {
      onRatingChange: testOnRatingChange,
      onSubmitFeedback: async () => {
        throw new Error('Network error');
      },
      errorMessage: 'Failed to submit feedback. Please try again.',
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      await clickAndUnhover(canvas, {
        buttonRole: 'radio',
        buttonName: 'Like this message',
      });

      await typeFeedback(canvas, 'Lorem ipsum');

      await submitFeedback(canvas);

      verifyErrorMessage(
        canvas,
        'Failed to submit feedback. Please try again.',
      );

      verifyFeedbackFormVisible(canvas);
    },
    parameters: {
      chromatic: {
        delay: 300,
      },
    },
  };

export const DarkModeWithRatingSelectAndFeedbackSubmitError: StoryObj<MessageActionsProps> =
  {
    render: Template,
    args: {
      darkMode: true,
      onRatingChange: testOnRatingChange,
      onSubmitFeedback: async () => {
        throw new Error('Network error');
      },
      errorMessage: 'Failed to submit feedback. Please try again.',
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      await clickAndUnhover(canvas, {
        buttonRole: 'radio',
        buttonName: 'Like this message',
      });

      await typeFeedback(canvas, 'Lorem ipsum');

      await submitFeedback(canvas);

      verifyErrorMessage(
        canvas,
        'Failed to submit feedback. Please try again.',
      );

      verifyFeedbackFormVisible(canvas);
    },
    parameters: {
      chromatic: {
        delay: 300,
      },
    },
  };

export const Generated: StoryObj<MessageActionsProps> = {
  render: Template,
};
