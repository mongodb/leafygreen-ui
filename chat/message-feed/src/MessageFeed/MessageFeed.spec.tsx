import React from 'react';
import { render, screen } from '@testing-library/react';

import {
  INITIAL_MESSAGE_DESCRIPTION,
  INITIAL_MESSAGE_TITLE,
} from '../Components/InitialMessage/constants';

import { MessageFeed } from './MessageFeed';

describe('MessageFeed', () => {
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
          <div>I heard you like MongoDB</div>
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
          <div>I heard you like MongoDB</div>
        </MessageFeed.InitialMessage>
        <div>Hello, fellow message</div>
      </MessageFeed>,
    );
    expect(screen.getByText(INITIAL_MESSAGE_TITLE)).not.toBeInTheDocument();
    expect(
      screen.getByText(INITIAL_MESSAGE_DESCRIPTION),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText('I heard you like MongoDB'),
    ).not.toBeInTheDocument();
    expect(screen.getByText('Hello, fellow message')).toBeInTheDocument();
  });

  test('hides the initial message when a new message is added', () => {
    const { rerender } = render(
      <MessageFeed>
        <MessageFeed.InitialMessage>
          <div>I heard you like MongoDB</div>
        </MessageFeed.InitialMessage>
      </MessageFeed>,
    );

    expect(screen.getByText(INITIAL_MESSAGE_TITLE)).toBeInTheDocument();
    expect(screen.getByText(INITIAL_MESSAGE_DESCRIPTION)).toBeInTheDocument();
    expect(screen.getByText('I heard you like MongoDB')).toBeInTheDocument();

    rerender(
      <MessageFeed>
        <MessageFeed.InitialMessage>
          <div>I heard you like MongoDB</div>
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
});
