import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { ChatIconButton } from './ChatIconButton';
import { ChatIconButtonProps } from './ChatIconButton.types';

const ariaLabel = 'MongoDB Assistant';

function renderChatIconButton(props: ChatIconButtonProps = {}) {
  const utils = render(
    <ChatIconButton
      {...props}
      aria-label={ariaLabel}
      data-testid="chat-icon-button"
    />,
  );
  const button = screen.getByTestId('chat-icon-button');
  return { ...utils, button };
}

describe('chat/chat-button/ChatIconButton', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderChatIconButton();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
