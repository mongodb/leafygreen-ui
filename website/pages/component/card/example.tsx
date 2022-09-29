import React from 'react';
import { css } from '@emotion/css';
import Card from '@leafygreen-ui/card';
import { Body } from '@leafygreen-ui/typography';
import { uiColors } from '@leafygreen-ui/palette';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const cardPadding = css`
  padding: 20px;
`;

const knobsConfig: KnobsConfigInterface<{
  as: string;
  children: string;
  darkMode: boolean;
}> = {
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
  darkMode: {
    type: 'boolean',
    default: false,
    label: 'Dark Mode',
  },
};

export default function CardLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({ as = 'div', children, darkMode, ...rest }) => (
        <Card
          {...rest}
          className={cardPadding}
          // @ts-ignore
          as={as}
          // @ts-ignore
          href={as === 'a' ? 'http://mongodb.design' : undefined}
          darkMode={darkMode}
        >
          <Body
            className={css`
              color: ${darkMode ? uiColors.white : uiColors.gray.dark3};
            `}
          >
            {children}
          </Body>
        </Card>
      )}
    </LiveExample>
  );
}
