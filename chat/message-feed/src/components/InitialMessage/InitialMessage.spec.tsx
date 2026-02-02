import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { MessageFeedProvider } from '../../MessageFeedContext';

import {
  INITIAL_MESSAGE_DESCRIPTION,
  INITIAL_MESSAGE_TITLE,
} from './constants';
import { InitialMessage } from './InitialMessage';
import { InitialMessageProps } from './InitialMessage.types';

jest.mock('@lg-chat/lg-markdown', () => ({
  LGMarkdown: jest.fn(({ children }) => <div>{children}</div>),
}));

const renderInitialMessage = ({
  shouldHideInitialMessage = false,
  ...rest
}: InitialMessageProps & { shouldHideInitialMessage?: boolean }) => {
  return render(
    <MessageFeedProvider shouldHideInitialMessage={shouldHideInitialMessage}>
      <InitialMessage {...rest} />
    </MessageFeedProvider>,
  );
};

describe('InitialMessage', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderInitialMessage({});
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  test('renders the title and description', () => {
    renderInitialMessage({});
    expect(screen.getByText(INITIAL_MESSAGE_TITLE)).toBeInTheDocument();
    expect(screen.getByText(INITIAL_MESSAGE_DESCRIPTION)).toBeInTheDocument();
  });

  test('does not render children if its not a subcomponent', () => {
    renderInitialMessage({
      children: <div>I heard you like MongoDB</div>,
    });
    expect(
      screen.queryByText('I heard you like MongoDB'),
    ).not.toBeInTheDocument();
  });

  test('is hidden when the shouldHideInitialMessage is true', () => {
    renderInitialMessage({
      shouldHideInitialMessage: true,
      children: (
        <InitialMessage.MessagePrompts>
          <InitialMessage.MessagePromptsItem>
            I heard you like MongoDB
          </InitialMessage.MessagePromptsItem>
        </InitialMessage.MessagePrompts>
      ),
    });
    expect(screen.getByText(INITIAL_MESSAGE_TITLE)).not.toBeVisible();
    expect(screen.getByText(INITIAL_MESSAGE_DESCRIPTION)).not.toBeVisible();
    expect(screen.getByText('I heard you like MongoDB')).not.toBeVisible();
  });

  // renders the MessagePrompts subcomponent
  test('renders the MessagePrompts subcomponent', () => {
    renderInitialMessage({
      children: (
        <InitialMessage.MessagePrompts>
          <InitialMessage.MessagePromptsItem>
            What is MongoDB?
          </InitialMessage.MessagePromptsItem>
          <InitialMessage.MessagePromptsItem>
            How do I query MongoDB?
          </InitialMessage.MessagePromptsItem>
          <InitialMessage.MessagePromptsItem>
            What is blue but not heavy?
          </InitialMessage.MessagePromptsItem>
        </InitialMessage.MessagePrompts>
      ),
    });
    expect(screen.getByText('What is MongoDB?')).toBeInTheDocument();
    expect(screen.getByText('How do I query MongoDB?')).toBeInTheDocument();
    expect(screen.getByText('What is blue but not heavy?')).toBeInTheDocument();
  });

  /* eslint-disable jest/no-disabled-tests */
  describe.skip('types behave as expected', () => {
    test('does not throw errors', () => {
      <InitialMessage>
        <InitialMessage.MessagePrompts label="hello">
          <InitialMessage.MessagePromptsItem selected>
            What is MongoDB?
          </InitialMessage.MessagePromptsItem>
          <InitialMessage.MessagePromptsItem disabled>
            How do I query MongoDB?
          </InitialMessage.MessagePromptsItem>
          <InitialMessage.MessagePromptsItem onClick={() => {}}>
            What is blue but not heavy?
          </InitialMessage.MessagePromptsItem>
        </InitialMessage.MessagePrompts>
      </InitialMessage>;
    });

    test('throws errors when enableHideOnSelect is used', () => {
      <InitialMessage>
        {/* @ts-expect-error - enableHideOnSelect is not a prop */}
        <InitialMessage.MessagePrompts enableHideOnSelect={false}>
          <InitialMessage.MessagePromptsItem>
            What is MongoDB?
          </InitialMessage.MessagePromptsItem>
          <InitialMessage.MessagePromptsItem>
            How do I query MongoDB?
          </InitialMessage.MessagePromptsItem>
          <InitialMessage.MessagePromptsItem>
            What is blue but not heavy?
          </InitialMessage.MessagePromptsItem>
        </InitialMessage.MessagePrompts>
      </InitialMessage>;
    });
  });
});
