import React, { MouseEventHandler } from 'react';

import { Button } from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import { H1 } from '@leafygreen-ui/typography';

interface PostMessageArgs {
  type: 'tool'; // | 'intent' | 'notify' | 'prompt' | 'link';
  // Would likely use a Discriminated Union for different payload types
  toolName: string;
  params?: Record<string, any>;
}

const postMessage = ({ type, toolName, params }: PostMessageArgs) => {
  window.parent.postMessage(
    {
      type,
      payload: {
        toolName,
        params: { ...params, from: 'remote-dom' },
      },
    },
    '*',
  );
};

export interface HelloWorldMicroUIProps {
  name?: string;
}
export const HelloWorldMicroUI = ({ name }: HelloWorldMicroUIProps) => {
  const handleClick: MouseEventHandler = e => {
    postMessage({
      type: 'tool',
      toolName: 'hello-world',
      params: {
        name,
        target: e.target,
      },
    });
  };

  return (
    <div
      className={css`
        margin: 8px;
      `}
    >
      <H1>Hello {name || 'World'}</H1>
      <Button onClick={handleClick}>Click Me!</Button>
    </div>
  );
};
