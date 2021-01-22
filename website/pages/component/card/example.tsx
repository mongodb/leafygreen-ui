import React from 'react';
import { css } from 'emotion';
import Card from '@leafygreen-ui/card';
import { Body } from '@leafygreen-ui/typography';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

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
    type: 'area',
    default:
      'Sync user data between mobile devices and Atlas, without writing any conflict resolution or networking code. Easily backup user data, build collaborative features, and keep data up-to-date whenever devices are online.',
    label: 'Children',
  },
};

export default function CardLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({ as = 'div', children, ...rest }) => (
        <Card
          {...rest}
          className={cardPadding}
          // @ts-ignore
          as={as}
          href={as === 'a' ? 'http://mongodb.design' : undefined}
        >
          <Body>{children}</Body>
        </Card>
      )}
    </LiveExample>
  );
}
