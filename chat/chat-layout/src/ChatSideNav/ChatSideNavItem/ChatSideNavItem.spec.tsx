import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AriaCurrentValue } from '@leafygreen-ui/lib';

import { ChatSideNav } from '../..';

describe('ChatSideNavItem', () => {
  test('renders with children', () => {
    render(
      <ChatSideNav>
        <ChatSideNav.Content>
          <ChatSideNav.SideNavItem>Chat Name</ChatSideNav.SideNavItem>
        </ChatSideNav.Content>
      </ChatSideNav>,
    );

    expect(screen.getByText('Chat Name')).toBeInTheDocument();
  });

  test('renders as anchor when href is provided', () => {
    render(
      <ChatSideNav>
        <ChatSideNav.Content>
          <ChatSideNav.SideNavItem href="/chat/123">
            Chat Name
          </ChatSideNav.SideNavItem>
        </ChatSideNav.Content>
      </ChatSideNav>,
    );

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/chat/123');
  });

  test('applies expected aria-current value when active', () => {
    render(
      <ChatSideNav>
        <ChatSideNav.Content>
          <ChatSideNav.SideNavItem active>Active Chat</ChatSideNav.SideNavItem>
        </ChatSideNav.Content>
      </ChatSideNav>,
    );

    const item = screen.getByText('Active Chat').closest('div');
    expect(item).toHaveAttribute('aria-current', AriaCurrentValue.Page);
  });

  test('applies expected aria-current value when inactive', () => {
    render(
      <ChatSideNav>
        <ChatSideNav.Content>
          <ChatSideNav.SideNavItem>Inactive Chat</ChatSideNav.SideNavItem>
        </ChatSideNav.Content>
      </ChatSideNav>,
    );

    const item = screen.getByText('Inactive Chat').closest('div');
    expect(item).toHaveAttribute('aria-current', AriaCurrentValue.Unset);
  });

  test('calls onClick prop when clicked', async () => {
    const onClick = jest.fn();

    render(
      <ChatSideNav>
        <ChatSideNav.Content>
          <ChatSideNav.SideNavItem onClick={onClick}>
            Clickable Chat
          </ChatSideNav.SideNavItem>
        </ChatSideNav.Content>
      </ChatSideNav>,
    );

    const item = screen.getByText('Clickable Chat').closest('div');
    await userEvent.click(item!);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('applies className prop', () => {
    render(
      <ChatSideNav>
        <ChatSideNav.Content>
          <ChatSideNav.SideNavItem className="custom-class">
            Custom Chat
          </ChatSideNav.SideNavItem>
        </ChatSideNav.Content>
      </ChatSideNav>,
    );

    const item = screen.getByText('Custom Chat').closest('div');
    expect(item).toHaveClass('custom-class');
  });
});
