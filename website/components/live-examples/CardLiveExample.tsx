import React from 'react';
import { css } from '@leafygreen-ui/emotion';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';
import Card from '@leafygreen-ui/card';

const cardPadding = css`
  padding: 20px;
`;

const knobsConfig: KnobsConfigInterface<{ as: string; children: string }> = {
  as: {
    type: 'select',
    options: ['div', 'button', 'a'],
    default: 'div',
    label: 'As',
  },
  children: {
    type: 'text',
    default: 'This is a card component.',
    label: 'Children',
  },
};

const CardLiveExample = () => {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({ as = 'div', ...rest }) => (
        <Card
          {...rest}
          className={cardPadding}
          // @ts-ignore
          as={as}
          href={as === 'a' ? 'http://mongodb.design' : undefined}
        />
      )}
    </LiveExample>
  );
};

export default CardLiveExample;
