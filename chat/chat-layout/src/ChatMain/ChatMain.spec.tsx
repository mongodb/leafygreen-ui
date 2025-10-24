import React from 'react';
import { render, screen } from '@testing-library/react';

import { ChatLayout } from '../ChatLayout';

import { ChatMain } from '.';

describe('packages/chat-layout/ChatMain', () => {
  describe('ChatMain', () => {
    test('renders children', () => {
      render(
        <ChatLayout>
          <ChatMain>
            <div>Main Content</div>
          </ChatMain>
        </ChatLayout>,
      );
      expect(screen.getByText('Main Content')).toBeInTheDocument();
    });

    test('forwards HTML attributes to the div element', () => {
      render(
        <ChatLayout>
          <ChatMain data-testid="chat-main" aria-label="Chat content">
            Content
          </ChatMain>
        </ChatLayout>,
      );
      const element = screen.getByTestId('chat-main');
      expect(element).toHaveAttribute('aria-label', 'Chat content');
    });

    test('forwards ref to the div element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <ChatLayout>
          <ChatMain ref={ref}>Content</ChatMain>
        </ChatLayout>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.tagName).toBe('DIV');
    });

    test('applies custom className', () => {
      render(
        <ChatLayout>
          <ChatMain data-testid="chat-main" className="custom-class">
            Content
          </ChatMain>
        </ChatLayout>,
      );
      const element = screen.getByTestId('chat-main');
      expect(element).toHaveClass('custom-class');
    });
  });
});
