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
  color: ${uiColors.gray.light3};
  background-color: ${uiColors.gray.dark3};
`;

storiesOf('Typography', module).add('Default', () => {
  const darkMode = boolean('darkMode', false);

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
          className={cx(displayBlock, { [darkModeBodyStyles]: darkMode })}
        >
          Body text: Lorem ipsum dolor sit amet consectetur{' '}
          <InlineCode darkMode={darkMode}>Inline Code</InlineCode> adipisicing
          elit. Quia rerum porro non esse quo exercitationem placeat minima
          dolores animi{' '}
          <InlineCode darkMode={darkMode} href="https://mongodb.design">
            Linked Inline Code
          </InlineCode>{' '}
          a corporis, aut optio dolore doloremque consequuntur aliquam est
          voluptatum vitae! <em>Something in italics</em> nullam id dolor
          vehicula ut id elit. <strong>Something bold</strong> donec sed odio
          dui.{' '}
          <strong>
            <em>Something bold and italic</em>
          </strong>{' '}
          risus varius blandit sit amet non magna.
        </Body>

        <div className={displayBlock}>
          <InlineKeyCode>CTRL</InlineKeyCode>
          <code> + </code>
          <InlineKeyCode>C</InlineKeyCode>
        </div>
        <Disclaimer className={displayBlock}>Disclaimer</Disclaimer>
        <Overline className={displayBlock}>Overline</Overline>
        <Link
          className={displayBlock}
          href={select(
            'select Link href',
            [
              'http://localhost:9001',
              '?path=/story/button--icon-only',
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
          className={cx(
            displayBlock,
            css`
              background-color: ${darkMode
                ? uiColors.gray.dark3
                : uiColors.white};
            `,
          )}
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
