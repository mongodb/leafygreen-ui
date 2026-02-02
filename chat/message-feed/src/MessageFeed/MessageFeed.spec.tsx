import React from 'react';
import { render, screen } from '@testing-library/react';

import {
  INITIAL_MESSAGE_DESCRIPTION,
  INITIAL_MESSAGE_TITLE,
} from '../components/InitialMessage/constants';

import { MessageFeed } from './MessageFeed';

jest.mock('@lg-chat/lg-markdown', () => ({
  LGMarkdown: jest.fn(({ children }) => <div>{children}</div>),
}));

describe('MessageFeed', () => {
  const originalScrollTo = Element.prototype.scrollTo;

  beforeAll(() => {
    // Mock scrollTo since it's not implemented in JSDOM
    Element.prototype.scrollTo = jest.fn(function mock(
      this: Element,
      x?: number | ScrollToOptions,
      y?: number,
    ) {
      if (typeof x === 'object' && x !== null) {
        // Handle ScrollToOptions
        if ('top' in x) {
          (this as HTMLElement).scrollTop = x.top ?? 0;
        }

        if ('left' in x) {
          (this as HTMLElement).scrollLeft = x.left ?? 0;
        }
      } else if (typeof x === 'number' && typeof y === 'number') {
        // Handle two number arguments
        (this as HTMLElement).scrollLeft = x;
        (this as HTMLElement).scrollTop = y;
      }
    });
  });

  afterAll(() => {
    // Restore original scrollTo if it existed, otherwise delete the mock
    if (originalScrollTo) {
      Element.prototype.scrollTo = originalScrollTo;
    } else {
      delete (Element.prototype as Partial<Element>).scrollTo;
    }
  });

  test('renders children', () => {
    render(
      <MessageFeed>
        <div>Hello, how can I help you today?</div>
        <div>Hello, fellow message</div>
      </MessageFeed>,
    );
    expect(
      screen.getByText('Hello, how can I help you today?'),
    ).toBeInTheDocument();
    expect(screen.getByText('Hello, fellow message')).toBeInTheDocument();
  });

  test('renders the initial message if the initial message is a child and there are no other children', () => {
    render(
      <MessageFeed>
        <MessageFeed.InitialMessage>
          <MessageFeed.InitialMessage.MessagePrompts>
            <MessageFeed.InitialMessage.MessagePrompt>
              I heard you like MongoDB
            </MessageFeed.InitialMessage.MessagePrompt>
          </MessageFeed.InitialMessage.MessagePrompts>
        </MessageFeed.InitialMessage>
      </MessageFeed>,
    );
    expect(screen.getByText(INITIAL_MESSAGE_TITLE)).toBeInTheDocument();
    expect(screen.getByText(INITIAL_MESSAGE_DESCRIPTION)).toBeInTheDocument();
    expect(screen.getByText('I heard you like MongoDB')).toBeInTheDocument();
  });

  test('does not render the initial message if the initial message is a child and there are other children', () => {
    render(
      <MessageFeed>
        <MessageFeed.InitialMessage>
          <MessageFeed.InitialMessage.MessagePrompts>
            <MessageFeed.InitialMessage.MessagePrompt>
              I heard you like MongoDB
            </MessageFeed.InitialMessage.MessagePrompt>
          </MessageFeed.InitialMessage.MessagePrompts>
        </MessageFeed.InitialMessage>
        <div>Hello, fellow message</div>
      </MessageFeed>,
    );
    expect(screen.queryByText(INITIAL_MESSAGE_TITLE)).not.toBeInTheDocument();
    expect(
      screen.queryByText(INITIAL_MESSAGE_DESCRIPTION),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('I heard you like MongoDB'),
    ).not.toBeInTheDocument();
    expect(screen.getByText('Hello, fellow message')).toBeInTheDocument();
  });

  test('hides the initial message when a new message is added', () => {
    const { rerender } = render(
      <MessageFeed>
        <MessageFeed.InitialMessage>
          <MessageFeed.InitialMessage.MessagePrompts>
            <MessageFeed.InitialMessage.MessagePrompt>
              I heard you like MongoDB
            </MessageFeed.InitialMessage.MessagePrompt>
          </MessageFeed.InitialMessage.MessagePrompts>
        </MessageFeed.InitialMessage>
      </MessageFeed>,
    );

    expect(screen.getByText(INITIAL_MESSAGE_TITLE)).toBeInTheDocument();
    expect(screen.getByText(INITIAL_MESSAGE_DESCRIPTION)).toBeInTheDocument();
    expect(screen.getByText('I heard you like MongoDB')).toBeInTheDocument();

    rerender(
      <MessageFeed>
        <MessageFeed.InitialMessage>
          <MessageFeed.InitialMessage.MessagePrompts>
            <MessageFeed.InitialMessage.MessagePrompt>
              I heard you like MongoDB
            </MessageFeed.InitialMessage.MessagePrompt>
          </MessageFeed.InitialMessage.MessagePrompts>
        </MessageFeed.InitialMessage>
        <div>Hello, how can I help you today?</div>
      </MessageFeed>,
    );

    expect(screen.getByText(INITIAL_MESSAGE_TITLE)).not.toBeVisible();
    expect(screen.getByText(INITIAL_MESSAGE_DESCRIPTION)).not.toBeVisible();
    expect(screen.getByText('I heard you like MongoDB')).not.toBeVisible();
    expect(
      screen.getByText('Hello, how can I help you today?'),
    ).toBeInTheDocument();
  });

  test('renders the MessagePrompts component', () => {
    render(
      <MessageFeed>
        <MessageFeed.InitialMessage>
          <MessageFeed.InitialMessage.MessagePrompts>
            <MessageFeed.InitialMessage.MessagePrompt>
              What is MongoDB?
            </MessageFeed.InitialMessage.MessagePrompt>
            <MessageFeed.InitialMessage.MessagePrompt>
              How do I query MongoDB?
            </MessageFeed.InitialMessage.MessagePrompt>
            <MessageFeed.InitialMessage.MessagePrompt>
              What is blue but not heavy?
            </MessageFeed.InitialMessage.MessagePrompt>
          </MessageFeed.InitialMessage.MessagePrompts>
        </MessageFeed.InitialMessage>
      </MessageFeed>,
    );
    expect(screen.getByText('What is MongoDB?')).toBeInTheDocument();
    expect(screen.getByText('How do I query MongoDB?')).toBeInTheDocument();
    expect(screen.getByText('What is blue but not heavy?')).toBeInTheDocument();
  });
});
