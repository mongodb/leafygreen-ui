import React from 'react';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ChatSideNav } from '.';

const Providers = ({ children }: { children: React.ReactNode }) => (
  <LeafyGreenChatProvider variant={Variant.Compact}>
    {children}
  </LeafyGreenChatProvider>
);

describe('ChatSideNav', () => {
  beforeAll(() => {
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Header shows "New Chat" button when onClickNewChat provided', async () => {
    const onClickNewChat = jest.fn();

    render(
      <Providers>
        <ChatSideNav>
          <ChatSideNav.Header onClickNewChat={onClickNewChat} />
          <ChatSideNav.Content />
        </ChatSideNav>
      </Providers>,
    );

    const button = screen.getByRole('button', { name: /new chat/i });
    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    expect(onClickNewChat).toHaveBeenCalledTimes(1);
  });

  test('Header does not render "New Chat" button when onClickNewChat is absent', () => {
    render(
      <Providers>
        <ChatSideNav>
          <ChatSideNav.Header />
          <ChatSideNav.Content />
        </ChatSideNav>
      </Providers>,
    );

    expect(
      screen.queryByRole('button', { name: /new chat/i }),
    ).not.toBeInTheDocument();
  });
});
