import React from 'react';

import { MessagePrompt } from './MessagePrompt';

describe('MessagePrompt', () => {
  /* eslint-disable jest/no-disabled-tests */
  describe.skip('types behave as expected', () => {
    test('MessagePrompt does not throw error', () => {
      <>
        <MessagePrompt>hello</MessagePrompt>
        <MessagePrompt onClick={() => {}} disabled selected>
          hello
        </MessagePrompt>
      </>;
    });
  });
});
