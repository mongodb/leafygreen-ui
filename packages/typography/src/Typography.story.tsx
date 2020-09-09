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
      <InlineCode className={displayBlock}>InlineCode</InlineCode>
      <>
        <InlineKeyCode>CTRL</InlineKeyCode>
        <InlineCode>+</InlineCode>
        <InlineKeyCode>C</InlineKeyCode>
      </>
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
    <Body
      className={css`
        width: 400px;
        border: 1px solid gold;
        padding: 20px;
        font-size: 14px;
      `}
    >
      <InlineCode href="test">Lorem ipsum dolor</InlineCode> sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
      dolore magna aliqua. Ut enim ad minim{' '}
      <InlineCode>veniam, quis nostrud</InlineCode> exercitation ullamco laboris
      nisi ut aliquip ex ea commodo consequat.{' '}
      <InlineCode href="test">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      </InlineCode>{' '}
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Body>
  </LeafygreenProvider>
));
