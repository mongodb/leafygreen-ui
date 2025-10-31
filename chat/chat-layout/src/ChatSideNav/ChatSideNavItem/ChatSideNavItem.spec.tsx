import React from 'react';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AriaCurrentValue } from '@leafygreen-ui/lib';

import { ChatSideNav } from '../..';

const Providers = ({ children }: { children: React.ReactNode }) => (
  <LeafyGreenChatProvider variant={Variant.Compact}>
    {children}
  </LeafyGreenChatProvider>
);

describe('ChatSideNavItem', () => {
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

  test('renders with children', () => {
    render(
      <Providers>
        <ChatSideNav>
          <ChatSideNav.Content>
            <ChatSideNav.SideNavItem>Chat Name</ChatSideNav.SideNavItem>
          </ChatSideNav.Content>
        </ChatSideNav>
      </Providers>,
    );

    expect(screen.getByText('Chat Name')).toBeInTheDocument();
  });

  test('renders as anchor when href is provided', () => {
    render(
      <Providers>
        <ChatSideNav>
          <ChatSideNav.Content>
            <ChatSideNav.SideNavItem href="/chat/123">
              Chat Name
            </ChatSideNav.SideNavItem>
          </ChatSideNav.Content>
        </ChatSideNav>
      </Providers>,
    );

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/chat/123');
  });

  test('applies expected aria-current value when active', () => {
    render(
      <Providers>
        <ChatSideNav>
          <ChatSideNav.Content>
            <ChatSideNav.SideNavItem active>
              Active Chat
            </ChatSideNav.SideNavItem>
          </ChatSideNav.Content>
        </ChatSideNav>
      </Providers>,
    );

    const item = screen.getByText('Active Chat');
    expect(item).toHaveAttribute('aria-current', AriaCurrentValue.Page);
  });

  test('applies expected aria-current value when inactive', () => {
    render(
      <Providers>
        <ChatSideNav>
          <ChatSideNav.Content>
            <ChatSideNav.SideNavItem>Inactive Chat</ChatSideNav.SideNavItem>
          </ChatSideNav.Content>
        </ChatSideNav>
      </Providers>,
    );

    const item = screen.getByText('Inactive Chat');
    expect(item).toHaveAttribute('aria-current', AriaCurrentValue.Unset);
  });

  test('calls onClick prop when clicked', async () => {
    const onClick = jest.fn();

    render(
      <Providers>
        <ChatSideNav>
          <ChatSideNav.Content>
            <ChatSideNav.SideNavItem onClick={onClick}>
              Clickable Chat
            </ChatSideNav.SideNavItem>
          </ChatSideNav.Content>
        </ChatSideNav>
      </Providers>,
    );

    const item = screen.getByText('Clickable Chat');
    await userEvent.click(item);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('applies className prop', () => {
    render(
      <Providers>
        <ChatSideNav>
          <ChatSideNav.Content>
            <ChatSideNav.SideNavItem className="custom-class">
              Custom Chat
            </ChatSideNav.SideNavItem>
          </ChatSideNav.Content>
        </ChatSideNav>
      </Providers>,
    );

    const item = screen.getByText('Custom Chat');
    expect(item).toHaveClass('custom-class');
  });
});
