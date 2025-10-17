import React, { MouseEventHandler, useState } from 'react';
import { Chart, Line } from '@lg-charts/core';

import { Button } from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import { Body, H1 } from '@leafygreen-ui/typography';

export interface HelloWorldMicroUIProps {
  name?: string;
}
export const HelloWorldMicroUI = ({ name }: HelloWorldMicroUIProps) => {
  const [clicks, setClicks] = useState(0);

  const handleClick: MouseEventHandler = e => {
    e.target.style.backgroundColor = 'red';

    console.log('Handle UUI Click');
    setClicks(c => c + 1);

    const msg = {
      type: 'tool',
      payload: {
        toolName: 'hello-world',
        params: { name, from: 'remote-dom' },
      },
    };

    window.postMessage(msg, '*');
    window.parent.postMessage(msg, '*');
    window.parent.parent.postMessage(msg, '*');
  };

  return (
    <>
      <div
        className={css`
          margin: 8px;
        `}
        data-clicks={clicks}
      >
        <H1>Hello {name || 'World'}</H1>
        <Button id="my-button" onClick={handleClick}>
          Click Me!
        </Button>
        <Body>{clicks}</Body>
      </div>
    </>
  );
};
HelloWorldMicroUI.displayName = 'HelloWorldMicroUI';

export const ChartHelloWorldMicroUI = () => {
  return (
    <Chart state={'unset'}>
      <Line
        name={'Hello'}
        data={[
          //  X      Y
          [3.4, 4.5],
          [4.2, 2.3],
          [10.8, 9.5],
          [7.2, 8.8],
        ]}
      />
    </Chart>
  );
};
