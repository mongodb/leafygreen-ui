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
import { cx, css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';

const displayBlock = css`
  display: block;
  max-width: 500px;
  padding: 8px 16px;
`;

const darkModeBodyStyles = css`
  background-color: ${uiColors.gray.dark3};
`;

storiesOf('Packages/Typography', module).add('Default', () => {
  const darkMode = boolean('darkMode', false);

  const href = select(
    'select Link href',
    [
      'http://localhost:9001',
      '?path=/story/button--icon-only',
      'https://mongodb.github.io/leafygreen-ui/?path=/story/*',
    ],
    'http://localhost:9001',
  );

  const linkArrowAppearance = select(
    'select Link arrowAppearance',
    Object.values(ArrowAppearance),
    ArrowAppearance.Hover,
  );

  return (
    <LeafygreenProvider baseFontSize={select('baseFontSize', [14, 16], 14)}>
      <div>
        <H1 className={displayBlock}>Heading 1</H1>
        <H2 className={displayBlock}>Heading 2</H2>
        <H3 className={displayBlock}>Heading 3</H3>
        <Subtitle className={displayBlock}>Subtitle</Subtitle>

        <Body
          weight={select(
            'select Body weight',
            ['medium', 'regular'],
            'regular',
          )}
          className={cx(displayBlock)}
        >
          <div>Body</div>
          <div>
            <strong>Body (Strong)</strong>
          </div>
          <div>
            <em>Body (Italic)</em>
          </div>
          <div>
            <strong>
              <em>Body (Strong Italic)</em>
            </strong>
          </div>
        </Body>

        <Body
          className={cx(
            displayBlock,
            css`
              display: flex;
              gap: 8px;
            `,
            { [darkModeBodyStyles]: darkMode },
          )}
        >
          <InlineCode darkMode={darkMode}>Inline Code</InlineCode>
          <InlineCode darkMode={darkMode} href={href}>
            Inline Code Link
          </InlineCode>
        </Body>

        <div
          className={cx(
            displayBlock,
            css`
              display: flex;
              gap: 8px;
            `,
          )}
        >
          <Link href={href} arrowAppearance={linkArrowAppearance}>
            Link
          </Link>
          <Link href="?path=/story/button--icon-only" arrowAppearance="persist">
            Internal
          </Link>
          <Link
            href="https://mongodb.github.io/leafygreen-ui/?path=/story/*"
            arrowAppearance="persist"
          >
            External
          </Link>
        </div>
        <div className={displayBlock}>
          <InlineKeyCode>CTRL</InlineKeyCode>
          <code> + </code>
          <InlineKeyCode>C</InlineKeyCode>
        </div>

        <Overline className={displayBlock}>Overline</Overline>
        <Disclaimer className={displayBlock}>Disclaimer</Disclaimer>

        <div
          className={cx(displayBlock, {
            [css`
              background-color: ${uiColors.gray.dark3};
            `]: darkMode,
          })}
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
