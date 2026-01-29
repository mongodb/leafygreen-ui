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
});
