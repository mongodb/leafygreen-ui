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

import { FEEDBACK_TEXTAREA_TEST_ID } from './constants';
import { MessageActions, MessageActionsProps } from '.';

const meta: StoryMetaType<typeof MessageActions> = {
  title: 'Composition/Chat/MessageActions',
  component: MessageActions,
  args: {
    // eslint-disable-next-line no-console
    onClickCopy: () => console.log('Copy clicked'),
    // eslint-disable-next-line no-console
    onClickRetry: () => console.log('Retry clicked'),
    // eslint-disable-next-line no-console
    onSubmitFeedback: () => console.log('Feedback submitted'),
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams],
    },
  },
};
export default meta;

const Template: StoryFn<MessageActionsProps> = props => (
  <LeafyGreenChatProvider variant={Variant.Compact}>
    <MessageActions {...props} />
  </LeafyGreenChatProvider>
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click thumbs up button
    const thumbsUpButton = canvas.getByRole('radio', {
      name: 'Thumbs up this message',
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click thumbs up button
    const thumbsUpButton = canvas.getByRole('radio', {
      name: 'Thumbs up this message',
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
  args: {
    darkMode: true,
  },
};

export const LightModeWithRatingSelectAndFeedback: StoryObj<MessageActionsProps> =
  {
    render: Template,
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Click thumbs up button
      const thumbsUpButton = canvas.getByRole('radio', {
        name: 'Thumbs up this message',
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Click thumbs up button
      const thumbsUpButton = canvas.getByRole('radio', {
        name: 'Thumbs up this message',
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
    args: {
      darkMode: true,
    },
  };

export const LightModeWithRatingSelectAndFeedbackAndSubmit: StoryObj<MessageActionsProps> =
  {
    render: Template,
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Click thumbs up button
      const thumbsUpButton = canvas.getByRole('radio', {
        name: 'Thumbs up this message',
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

export const DarkModeWithRatingSelectAndFeedbackAndSubmit: StoryObj<MessageActionsProps> =
  {
    render: Template,
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Click thumbs up button
      const thumbsUpButton = canvas.getByRole('radio', {
        name: 'Thumbs up this message',
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
    args: {
      darkMode: true,
    },
  };
