import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { ChatButton } from '.';

describe('chat/chat-button', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(<ChatButton />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
