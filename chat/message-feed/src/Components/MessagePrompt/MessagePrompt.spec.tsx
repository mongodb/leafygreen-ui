import React from 'react';

import { MessagePrompt } from './MessagePrompt';

describe('MessagePrompts', () => {
  /* eslint-disable jest/no-disabled-tests */
  describe.skip('types behave as expected', () => {
    test('MessagePrompts throws error when no required props are provided', () => {
      <>
        <MessagePrompt>hello</MessagePrompt>
        <MessagePrompt onClick={() => {}} disabled selected>
          hello
        </MessagePrompt>
      </>;
    });
  });
});
