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

  test('renders the children', () => {
    renderInitialMessage({
      children: <div>I heard you like MongoDB</div>,
    });
    expect(screen.getByText('I heard you like MongoDB')).toBeInTheDocument();
  });

  test('is hidden when the shouldHideInitialMessage is true', () => {
    renderInitialMessage({
      shouldHideInitialMessage: true,
      children: <div>I heard you like MongoDB</div>,
    });
    expect(screen.getByText(INITIAL_MESSAGE_TITLE)).not.toBeVisible();
    expect(screen.getByText(INITIAL_MESSAGE_DESCRIPTION)).not.toBeVisible();
    expect(screen.getByText('I heard you like MongoDB')).not.toBeVisible();
  });

  // renders the MessagePrompts component
  test('renders the MessagePrompts component', () => {
    renderInitialMessage({
      children: (
        <InitialMessage.MessagePrompts>
          <InitialMessage.MessagePrompt>
            What is MongoDB?
          </InitialMessage.MessagePrompt>
          <InitialMessage.MessagePrompt>
            How do I query MongoDB?
          </InitialMessage.MessagePrompt>
          <InitialMessage.MessagePrompt>
            What is blue but not heavy?
          </InitialMessage.MessagePrompt>
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
      <>
        <InitialMessage.MessagePrompts label="hello">
          <InitialMessage.MessagePrompt selected>
            What is MongoDB?
          </InitialMessage.MessagePrompt>
          <InitialMessage.MessagePrompt disabled>
            How do I query MongoDB?
          </InitialMessage.MessagePrompt>
          <InitialMessage.MessagePrompt onClick={() => {}}>
            What is blue but not heavy?
          </InitialMessage.MessagePrompt>
        </InitialMessage.MessagePrompts>
      </>;
    });

    test('throws errors when enableHideOnSelect is used', () => {
      <>
        {/* @ts-expect-error - enableHideOnSelect is not a prop */}
        <InitialMessage.MessagePrompts enableHideOnSelect={false}>
          <InitialMessage.MessagePrompt>
            What is MongoDB?
          </InitialMessage.MessagePrompt>
          <InitialMessage.MessagePrompt>
            How do I query MongoDB?
          </InitialMessage.MessagePrompt>
          <InitialMessage.MessagePrompt>
            What is blue but not heavy?
          </InitialMessage.MessagePrompt>
        </InitialMessage.MessagePrompts>
      </>;
    });
  });
});
