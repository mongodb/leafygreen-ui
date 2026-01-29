import React from 'react';

import { MessagePrompts } from './MessagePrompts';

describe('MessagePrompts', () => {
  /* eslint-disable jest/no-disabled-tests */
  describe.skip('types behave as expected', () => {
    test('MessagePrompts throws error when no required props are provided', () => {
      <>
        <MessagePrompts>hello</MessagePrompts>
        <MessagePrompts label="hello" onClickRefresh={() => {}}>
          hello
        </MessagePrompts>

        {/* @ts-expect-error - enableHideOnSelect is not a prop */}
        <MessagePrompts enableHideOnSelect={false} />
      </>;
    });
  });
});
