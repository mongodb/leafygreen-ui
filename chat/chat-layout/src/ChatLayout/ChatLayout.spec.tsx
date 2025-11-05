import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ChatLayout, useChatLayoutContext } from '.';

describe('packages/chat-layout', () => {
  describe('ChatLayout', () => {
    test('renders children', () => {
      render(
        <ChatLayout>
          <div>Test Content</div>
        </ChatLayout>,
      );
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    test('provides isPinned context with default value', () => {
      const TestConsumer = () => {
        const { isPinned } = useChatLayoutContext();
        return <div>isPinned: {isPinned.toString()}</div>;
      };

      render(
        <ChatLayout>
          <TestConsumer />
        </ChatLayout>,
      );
      expect(screen.getByText('isPinned: true')).toBeInTheDocument();
    });

    test('accepts initialIsPinned prop', () => {
      const TestConsumer = () => {
        const { isPinned } = useChatLayoutContext();
        return <div>isPinned: {isPinned.toString()}</div>;
      };

      render(
        <ChatLayout initialIsPinned={false}>
          <TestConsumer />
        </ChatLayout>,
      );
      expect(screen.getByText('isPinned: false')).toBeInTheDocument();
    });

    test('togglePin function updates isPinned state', async () => {
      const TestConsumer = () => {
        const { isPinned, togglePin } = useChatLayoutContext();
        return (
          <>
            <div>isPinned: {isPinned.toString()}</div>
            <button onClick={togglePin}>Toggle</button>
          </>
        );
      };

      render(
        <ChatLayout>
          <TestConsumer />
        </ChatLayout>,
      );

      expect(screen.getByText('isPinned: true')).toBeInTheDocument();

      await userEvent.click(screen.getByRole('button', { name: 'Toggle' }));

      expect(screen.getByText('isPinned: false')).toBeInTheDocument();

      await userEvent.click(screen.getByRole('button', { name: 'Toggle' }));

      expect(screen.getByText('isPinned: true')).toBeInTheDocument();
    });

    test('forwards HTML attributes to the div wrapper', () => {
      render(
        <ChatLayout data-testid="chat-layout">
          <div>Content</div>
        </ChatLayout>,
      );
      expect(screen.getByTestId('chat-layout')).toBeInTheDocument();
    });

    test('calls onTogglePinned callback when togglePin is called', async () => {
      const onTogglePinned = jest.fn();

      const TestConsumer = () => {
        const { togglePin } = useChatLayoutContext();
        return <button onClick={togglePin}>Toggle</button>;
      };

      render(
        <ChatLayout onTogglePinned={onTogglePinned}>
          <TestConsumer />
        </ChatLayout>,
      );

      const toggleButton = screen.getByRole('button', { name: 'Toggle' });

      await userEvent.click(toggleButton);

      expect(onTogglePinned).toHaveBeenCalledTimes(1);
      expect(onTogglePinned).toHaveBeenCalledWith(false);

      await userEvent.click(toggleButton);

      expect(onTogglePinned).toHaveBeenCalledTimes(2);
      expect(onTogglePinned).toHaveBeenCalledWith(true);
    });

    test('onTogglePinned receives correct isPinned value based on initialIsPinned', async () => {
      const onTogglePinned = jest.fn();

      const TestConsumer = () => {
        const { togglePin } = useChatLayoutContext();
        return <button onClick={togglePin}>Toggle</button>;
      };

      render(
        <ChatLayout initialIsPinned={false} onTogglePinned={onTogglePinned}>
          <TestConsumer />
        </ChatLayout>,
      );

      await userEvent.click(screen.getByRole('button', { name: 'Toggle' }));

      expect(onTogglePinned).toHaveBeenCalledWith(true);
    });

    test('applies custom className', () => {
      render(
        <ChatLayout data-testid="chat-layout" className="custom-class">
          <div>Content</div>
        </ChatLayout>,
      );
      const element = screen.getByTestId('chat-layout');
      expect(element).toHaveClass('custom-class');
    });

    test('provides isSideNavHovered context with default value', () => {
      const TestConsumer = () => {
        const { isSideNavHovered } = useChatLayoutContext();
        return <div>isSideNavHovered: {isSideNavHovered.toString()}</div>;
      };

      render(
        <ChatLayout>
          <TestConsumer />
        </ChatLayout>,
      );
      expect(screen.getByText('isSideNavHovered: false')).toBeInTheDocument();
    });

    test('setIsSideNavHovered function updates isSideNavHovered state', async () => {
      const TestConsumer = () => {
        const { isSideNavHovered, setIsSideNavHovered } =
          useChatLayoutContext();
        return (
          <>
            <div>isSideNavHovered: {isSideNavHovered.toString()}</div>
            <button onClick={() => setIsSideNavHovered(true)}>
              Set Hovered
            </button>
            <button onClick={() => setIsSideNavHovered(false)}>
              Set Not Hovered
            </button>
          </>
        );
      };

      render(
        <ChatLayout>
          <TestConsumer />
        </ChatLayout>,
      );

      expect(screen.getByText('isSideNavHovered: false')).toBeInTheDocument();

      await userEvent.click(
        screen.getByRole('button', { name: 'Set Hovered' }),
      );
      expect(screen.getByText('isSideNavHovered: true')).toBeInTheDocument();

      await userEvent.click(
        screen.getByRole('button', { name: 'Set Not Hovered' }),
      );
      expect(screen.getByText('isSideNavHovered: false')).toBeInTheDocument();
    });

    test('togglePin updates isPinned state correctly when hovered', async () => {
      const TestConsumer = () => {
        const { isPinned, togglePin, isSideNavHovered } =
          useChatLayoutContext();
        return (
          <>
            <div>isPinned: {isPinned.toString()}</div>
            <div>isSideNavHovered: {isSideNavHovered.toString()}</div>
            <button onClick={togglePin}>Toggle</button>
          </>
        );
      };

      render(
        <ChatLayout initialIsPinned={false}>
          <TestConsumer />
        </ChatLayout>,
      );

      expect(screen.getByText('isPinned: false')).toBeInTheDocument();
      expect(screen.getByText('isSideNavHovered: false')).toBeInTheDocument();

      await userEvent.click(screen.getByRole('button', { name: 'Toggle' }));

      expect(screen.getByText('isPinned: true')).toBeInTheDocument();
      expect(screen.getByText('isSideNavHovered: false')).toBeInTheDocument();
    });
  });
});
