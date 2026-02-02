import React from 'react';

import { MessagePromptsItem } from './MessagePromptsItem';

describe('MessagePromptsItem', () => {
  /* eslint-disable jest/no-disabled-tests */
  describe.skip('types behave as expected', () => {
    test('MessagePromptsItem does not throw error', () => {
      <>
        <MessagePromptsItem>hello</MessagePromptsItem>
        <MessagePromptsItem onClick={() => {}} disabled selected>
          hello
        </MessagePromptsItem>
      </>;
    });
  });
});
