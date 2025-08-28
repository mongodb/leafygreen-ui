import React from 'react';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

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
    (Story: StoryFn) => (
      <LeafyGreenChatProvider variant={Variant.Compact}>
        <Message isSender={false} messageBody={SAMPLE_MESSAGE_BODY}>
          <Story />
        </Message>
      </LeafyGreenChatProvider>
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
      decorator: StoryFn => (
        <LeafyGreenChatProvider variant={Variant.Compact}>
          <Message isSender={false} messageBody={SAMPLE_MESSAGE_BODY}>
            <StoryFn />
          </Message>
        </LeafyGreenChatProvider>
      ),
    },
  },
};
export default meta;

const Template: StoryFn<MessageActionsProps> = props => (
  <MessageActions {...props} />
);

export const LiveExample: StoryObj<MessageActionsProps> = {
  render: Template,
  parameters: {
    chromatic: {
      disableSnapshot: true,
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

    // Click thumbs up button
    const thumbsUpButton = canvas.getByRole('radio', {
      name: 'Like this message',
    });
    await userEvent.click(thumbsUpButton);

    // Verify feedback form is visible
    const textarea = canvas.getByTestId(FEEDBACK_TEXTAREA_TEST_ID);
    expect(textarea).toBeInTheDocument();

    const submitButton = canvas.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeInTheDocument();
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

    // Click thumbs up button
    const thumbsUpButton = canvas.getByRole('radio', {
      name: 'Like this message',
    });
    await userEvent.click(thumbsUpButton);

    // Verify feedback form is visible
    const textarea = canvas.getByTestId(FEEDBACK_TEXTAREA_TEST_ID);
    expect(textarea).toBeInTheDocument();

    const submitButton = canvas.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeInTheDocument();
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

      // Click thumbs up button
      const thumbsUpButton = canvas.getByRole('radio', {
        name: 'Like this message',
      });
      await userEvent.click(thumbsUpButton);

      // Type in feedback textarea
      const textarea = canvas.getByTestId(FEEDBACK_TEXTAREA_TEST_ID);
      await userEvent.type(textarea, 'Lorem ipsum');

      // Verify text was entered
      expect(textarea).toHaveValue('Lorem ipsum');

      const submitButton = canvas.getByRole('button', { name: 'Submit' });
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

      // Click thumbs up button
      const thumbsUpButton = canvas.getByRole('radio', {
        name: 'Like this message',
      });
      await userEvent.click(thumbsUpButton);

      // Type in feedback textarea
      const textarea = canvas.getByTestId(FEEDBACK_TEXTAREA_TEST_ID);
      await userEvent.type(textarea, 'Lorem ipsum');

      // Verify text was entered
      expect(textarea).toHaveValue('Lorem ipsum');

      const submitButton = canvas.getByRole('button', { name: 'Submit' });
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

      // Click thumbs up button
      const thumbsUpButton = canvas.getByRole('radio', {
        name: 'Like this message',
      });
      await userEvent.click(thumbsUpButton);

      // Type in feedback textarea
      const textarea = canvas.getByTestId(FEEDBACK_TEXTAREA_TEST_ID);
      await userEvent.type(textarea, 'Lorem ipsum');

      // Submit feedback
      const submitButton = canvas.getByRole('button', { name: 'Submit' });
      await userEvent.click(submitButton);

      // Verify success message is shown
      const successMessage = canvas.getByText('Thanks for your feedback!');
      expect(successMessage).toBeInTheDocument();

      // Verify feedback form is no longer interactive
      expect(canvas.queryByTestId(FEEDBACK_TEXTAREA_TEST_ID)).toBeNull();
      expect(canvas.queryByRole('button', { name: 'Submit' })).toBeNull();
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

      // Click thumbs up button
      const thumbsUpButton = canvas.getByRole('radio', {
        name: 'Like this message',
      });
      await userEvent.click(thumbsUpButton);

      // Type in feedback textarea
      const textarea = canvas.getByTestId(FEEDBACK_TEXTAREA_TEST_ID);
      await userEvent.type(textarea, 'Lorem ipsum');

      // Submit feedback
      const submitButton = canvas.getByRole('button', { name: 'Submit' });
      await userEvent.click(submitButton);

      // Verify success message is shown
      const successMessage = canvas.getByText('Thanks for your feedback!');
      expect(successMessage).toBeInTheDocument();

      // Verify feedback form is no longer interactive
      expect(canvas.queryByTestId(FEEDBACK_TEXTAREA_TEST_ID)).toBeNull();
      expect(canvas.queryByRole('button', { name: 'Submit' })).toBeNull();
    },
    parameters: {
      chromatic: {
        delay: 300,
      },
    },
  };

export const LightModeWithRatingSelectAndFeedbackSubmitError: StoryObj<MessageActionsProps> =
  {
    render: Template,
    args: {
      onRatingChange: testOnRatingChange,
      onSubmitFeedback: async () => {
        // Simulate a failed submission by throwing an error
        throw new Error('Network error');
      },
      errorMessage: 'Failed to submit feedback. Please try again.',
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Click thumbs up button
      const thumbsUpButton = canvas.getByRole('radio', {
        name: 'Like this message',
      });
      await userEvent.click(thumbsUpButton);

      // Type in feedback textarea
      const textarea = canvas.getByTestId(FEEDBACK_TEXTAREA_TEST_ID);
      await userEvent.type(textarea, 'Lorem ipsum');

      // Submit feedback (this will fail)
      const submitButton = canvas.getByRole('button', { name: 'Submit' });
      await userEvent.click(submitButton);

      // Verify error message is shown
      const errorMessage = canvas.getByText(
        'Failed to submit feedback. Please try again.',
      );
      expect(errorMessage).toBeInTheDocument();

      // Verify feedback form is still visible and interactive
      expect(canvas.getByTestId(FEEDBACK_TEXTAREA_TEST_ID)).toBeInTheDocument();
      expect(
        canvas.getByRole('button', { name: 'Submit' }),
      ).toBeInTheDocument();
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
        // Simulate a failed submission by throwing an error
        throw new Error('Network error');
      },
      errorMessage: 'Failed to submit feedback. Please try again.',
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Click thumbs up button
      const thumbsUpButton = canvas.getByRole('radio', {
        name: 'Like this message',
      });
      await userEvent.click(thumbsUpButton);

      // Type in feedback textarea
      const textarea = canvas.getByTestId(FEEDBACK_TEXTAREA_TEST_ID);
      await userEvent.type(textarea, 'Lorem ipsum');

      // Submit feedback (this will fail)
      const submitButton = canvas.getByRole('button', { name: 'Submit' });
      await userEvent.click(submitButton);

      // Verify error message is shown
      const errorMessage = canvas.getByText(
        'Failed to submit feedback. Please try again.',
      );
      expect(errorMessage).toBeInTheDocument();

      // Verify feedback form is still visible and interactive
      expect(canvas.getByTestId(FEEDBACK_TEXTAREA_TEST_ID)).toBeInTheDocument();
      expect(
        canvas.getByRole('button', { name: 'Submit' }),
      ).toBeInTheDocument();
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
