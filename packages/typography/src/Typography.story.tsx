import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
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
} from '.';
import { Link, ArrowAppearance } from './Link';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import { css } from '@leafygreen-ui/emotion';

const displayBlock = css`
  display: block;
`;

storiesOf('Typography', module).add('Default', () => (
  <LeafygreenProvider baseFontSize={select('baseFontSize', [14, 16], 14)}>
    <div>
      <H1>Heading 1</H1>
      <H2>Heading 2</H2>
      <H3>Heading 3</H3>
      <Subtitle>Subtitle</Subtitle>
      <Body
        weight={select('select Body weight', ['medium', 'regular'], 'regular')}
        className={displayBlock}
      >
        Body
      </Body>
      <InlineCode className={displayBlock}>InlineCode</InlineCode> and{' '}
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
    </div>
  </LeafygreenProvider>
));
