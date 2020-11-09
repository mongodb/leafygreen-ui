import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import {
  H1,
  H2,
  H3,
  Subtitle,
  Body,
  InlineCode,
  InlineKeyCode,
  Disclaimer,
  Overline,
  Label,
  Description,
} from '.';
import { Link, ArrowAppearance } from './Link';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';

const displayBlock = css`
  display: block;
`;

storiesOf('Typography', module).add('Default', () => {
  const darkMode = boolean('darkMode', false);

  return (
    <LeafygreenProvider baseFontSize={select('baseFontSize', [14, 16], 14)}>
      <div>
        <H1>Heading 1</H1>
        <H2>Heading 2</H2>
        <H3>Heading 3</H3>
        <Subtitle>Subtitle</Subtitle>
        <Body
          weight={select(
            'select Body weight',
            ['medium', 'regular'],
            'regular',
          )}
          className={displayBlock}
        >
          Body
        </Body>
        <div className={displayBlock}>
          <InlineCode>InlineCode</InlineCode> and{' '}
        </div>
        <InlineCode href="https://mongodb.design">with link</InlineCode>
        <div className={displayBlock}>
          <InlineKeyCode>CTRL</InlineKeyCode>
          <code>+</code>
          <InlineKeyCode>C</InlineKeyCode>
        </div>
        <Disclaimer className={displayBlock}>Disclaimer</Disclaimer>
        <Overline>Overline</Overline>
        <Link
          href={select(
            'select Link href',
            [
              'http://localhost:9001',
              'https://mongodb.github.io/leafygreen-ui/?path=/story/*',
            ],
            'http://localhost:9001',
          )}
          arrowAppearance={select(
            'select Link arrowAppearance',
            Object.values(ArrowAppearance),
            ArrowAppearance.Hover,
          )}
        >
          Link
        </Link>
        <div
          className={css`
            background-color: ${darkMode
              ? uiColors.gray.dark3
              : uiColors.white};
          `}
        >
          <Label darkMode={darkMode} htmlFor="id">
            This is a label
          </Label>
          <Description darkMode={darkMode}>
            This is the description for said label
          </Description>
        </div>
      </div>
    </LeafygreenProvider>
  );
});
