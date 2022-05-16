import React from 'react';
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
  Link,
  Chart,
} from '.';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
<<<<<<< HEAD
import { cx, css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import InlineDefinition from '@leafygreen-ui/inline-definition';

const wrapperStyles = css`
  height: 100vh;
  padding: 0 25vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
`;

const displayBlock = css`
  display: block;
`;

const displayFlex = css`
  display: flex;
  gap: 8px;
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
=======
import { css } from '@leafygreen-ui/emotion';

export default {
  title: 'Packages/Typography',
  component: <></>,
  argTypes: {
    baseFontSize: {
      options: [14, 16],
      control: { type: 'radio' },
    },
    darkMode: {
      control: { type: 'boolean' },
    },
  },
};
>>>>>>> d67a5c86b762c92b2a08d9b3d0d8bbb75939011d

// eslint-disable-next-line react/prop-types
export const AllTypography = ({
  baseFontSize,
  darkMode,
}: {
  baseFontSize: 14 | 16;
  darkMode: boolean;
}) => {
  return (
<<<<<<< HEAD
    <LeafygreenProvider baseFontSize={select('baseFontSize', [14, 16], 14)}>
      <div
        className={cx(wrapperStyles, {
          [css`
            background-color: ${palette.gray.dark3};
          `]: darkMode,
        })}
      >
        <H1 darkMode={darkMode} className={displayBlock}>
          Heading 1
        </H1>
        <H2 darkMode={darkMode} className={displayBlock}>
          Heading 2
        </H2>
        <H3 darkMode={darkMode} className={displayBlock}>
          Heading 3
        </H3>
        <Subtitle darkMode={darkMode} className={displayBlock}>
          Subtitle
        </Subtitle>

        <Body darkMode={darkMode} className={cx(displayBlock)}>
          <div>Body</div>
          <div>
            <strong>Body (Semibold)</strong>
          </div>
          <div>
            <em>Body (Italic)</em>
          </div>
          <div>
            <strong>
              <em>Body (Semibold Italic)</em>
            </strong>
          </div>
        </Body>

        <Body darkMode={darkMode} className={cx(displayFlex)}>
          <InlineCode darkMode={darkMode}>&quot;Inline Code&quot;</InlineCode>
          <InlineCode darkMode={darkMode} href={href}>
            &quot;Inline Code Link&quot;
          </InlineCode>
        </Body>

        <div className={cx(displayFlex)}>
          <Link
            darkMode={darkMode}
            href={href}
            arrowAppearance={linkArrowAppearance}
          >
            Link
          </Link>
          <Link
            darkMode={darkMode}
            href="?path=/story/button--icon-only"
            arrowAppearance="persist"
          >
            Internal
=======
    <LeafygreenProvider baseFontSize={baseFontSize}>
      <div
        className={css`
          > * {
            margin-bottom: 16px;
          }
        `}
      >
        <H1>Heading 1</H1>
        <H2>Heading 2</H2>
        <H3>Heading 3</H3>
        <Subtitle>Subtitle</Subtitle>
        <div
          className={css`
            display: flex;
            > * {
              flex: 1;
              margin-right: 32px;
            }
          `}
        >
          <Body weight="regular">
            <div>Body (regular)</div>
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
          <Body weight="medium">
            <div>Body (medium)</div>
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
        </div>
        <div
          className={css`
            display: block;
          `}
        >
          <Link href="http://localhost:9001" arrowAppearance="hover">
            Local (Arrow on Hover)
          </Link>
          <Link href="http://localhost:9001" arrowAppearance="none">
            Local (No Arrow)
          </Link>
          <Link href="?path=/story/button--icon-only" arrowAppearance="persist">
            Internal (Persist Arrow)
>>>>>>> d67a5c86b762c92b2a08d9b3d0d8bbb75939011d
          </Link>
          <Link
            darkMode={darkMode}
            href="https://mongodb.github.io/leafygreen-ui/?path=/story/*"
            arrowAppearance="persist"
          >
            External
          </Link>
        </div>
<<<<<<< HEAD

        <Body darkMode={darkMode} className={displayBlock}>
          <InlineKeyCode darkMode={darkMode}>CTRL</InlineKeyCode>
=======
        <div>
          <InlineCode darkMode={darkMode}>Inline Code</InlineCode>
          <InlineCode
            darkMode={darkMode}
            href="https://mongodb.github.io/leafygreen-ui/?path=/story/*"
          >
            Inline Code Link
          </InlineCode>
        </div>
        <div>
          <InlineKeyCode>CTRL</InlineKeyCode>
>>>>>>> d67a5c86b762c92b2a08d9b3d0d8bbb75939011d
          <code> + </code>
          <InlineKeyCode darkMode={darkMode}>C</InlineKeyCode>
        </Body>

        <Overline darkMode={darkMode} className={displayBlock}>
          Overline
        </Overline>
        <Disclaimer darkMode={darkMode} className={displayBlock}>
          Disclaimer
        </Disclaimer>
        <Chart darkMode={darkMode} className={displayBlock}>
          Charts
        </Chart>

<<<<<<< HEAD
        <Body darkMode={darkMode}>
          <InlineDefinition darkMode={darkMode} definition="Tooltip Definition">
            Inline definition
          </InlineDefinition>{' '}
        </Body>

        <div className={cx(displayBlock)}>
=======
        <Overline>Overline</Overline>
        <Disclaimer>Disclaimer</Disclaimer>

        <div>
>>>>>>> d67a5c86b762c92b2a08d9b3d0d8bbb75939011d
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
};
