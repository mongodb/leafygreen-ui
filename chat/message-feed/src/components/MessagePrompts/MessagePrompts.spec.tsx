import React from 'react';

import { MessagePrompts } from './MessagePrompts';

describe('MessagePrompts', () => {
  /* eslint-disable jest/no-disabled-tests */
  describe.skip('types behave as expected', () => {
    test('MessagePrompts rejects enableHideOnSelect prop at type level', () => {
      <>
        {/* @ts-expect-error - enableHideOnSelect is not a prop */}
        <MessagePrompts enableHideOnSelect={false} />
      </>;
    });
    test('MessagePrompts does not throw errors', () => {
      <>
        <MessagePrompts>hello</MessagePrompts>
        <MessagePrompts label="hello" onClickRefresh={() => {}}>
          hello
        </MessagePrompts>
      </>;
    });
  });
});
