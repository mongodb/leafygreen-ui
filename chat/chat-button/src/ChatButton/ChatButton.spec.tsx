import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { ChatButton, type ChatButtonProps } from '.';

const buttonText = 'Button text';

function renderChatButton(props: ChatButtonProps = {}) {
  const utils = render(
    <ChatButton {...props} data-testid="chat-button">
      {buttonText}
    </ChatButton>,
  );
  const button = screen.getByTestId('chat-button');
  return { ...utils, button };
}

describe('chat/chat-button', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderChatButton();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
