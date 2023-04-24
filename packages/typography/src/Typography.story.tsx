import React from 'react';

import { css, cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import InlineDefinition from '@leafygreen-ui/inline-definition';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import { storybookArgTypes } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

import {
  Body,
  Description,
  Disclaimer,
  Error,
  H1,
  H2,
  H3,
  InlineCode,
  InlineKeyCode,
  Label,
  Link,
  Overline,
  StaticWidthText,
  Subtitle,
} from '.';

const wrapperStyles = css`
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
`;

const displayBlock = css`
  display: block;
`;

const displayFlex = css`
  display: flex;
  gap: 8px;
`;

export default {
  title: 'Components/Typography',
  parameters: {
    controls: {
      exclude: ['className'],
    },
  },
};

// eslint-disable-next-line react/prop-types
export const AllTypography = ({
  baseFontSize,
  darkMode,
}: {
  baseFontSize: 14 | 16;
  darkMode: boolean;
}) => {
  return (
    <LeafygreenProvider baseFontSize={baseFontSize} darkMode={darkMode}>
      <div className={cx(wrapperStyles)}>
        <H1>Heading 1</H1>
        <H2>Heading 2</H2>
        <H3>Heading 3</H3>
        <Subtitle>Subtitle</Subtitle>

        <div className={cx(displayFlex)}>
          <Body>Body</Body>
          <Body>
            <strong>Body (Semibold)</strong>
          </Body>
        </div>
        <div className={cx(displayFlex)}>
          <Body>
            <em>Body (Italic)</em>
          </Body>
          <Body>
            <strong>
              <em>Body (Semibold Italic)</em>
            </strong>
          </Body>
        </div>

        <div className={cx(displayFlex)}>
          <InlineCode>&quot;Inline Code&quot;</InlineCode>
          <InlineCode href="https://mongodb.github.io/leafygreen-ui/?path=/story/*">
            &quot;Inline Code Link&quot;
          </InlineCode>
        </div>

        <div className={cx(displayFlex)}>
          <Link href="http://localhost:9001" arrowAppearance="hover">
            Local (Arrow on Hover)
          </Link>
          <Link href="http://localhost:9001" arrowAppearance="none">
            Local (No Arrow)
          </Link>
          <Link href="?path=/story/button--icon-only" arrowAppearance="persist">
            Internal (Persist Arrow)
          </Link>
          <Link href="https://mongodb.github.io/leafygreen-ui/?path=/story/*">
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
          className={css`
            color: ${darkMode ? palette.gray.light2 : palette.black};
          `}
        >
          <InlineDefinition definition="Tooltip Definition">
            Inline definition
          </InlineDefinition>
        </div>

        <Error>Hello I am an Error!</Error>

        <div className={cx(displayBlock)}>
          <Label htmlFor="id">This is a label</Label>
          <Description>This is the description for said label</Description>
        </div>
      </div>
    </LeafygreenProvider>
  );
};
AllTypography.argTypes = {
  baseFontSize: {
    ...storybookArgTypes.baseFontSize,
    description:
      'Storybook prop only. This font size is passed into the LeafygreenProvider.',
  },
  darkMode: storybookArgTypes.darkMode,
};

export const StaticWidthTextStory = () => {
  const hoverBold = css`
    font-weight: 400;
    cursor: pointer;
    outline: 1px solid ${palette.red.light2};
    outline-offset: -1px;

    &:hover {
      font-weight: 700;
    }
  `;

  const tabStyle = css`
    outline: 1px solid ${palette.blue.light1};
    padding: 10px;
    width: max-content;
    max-width: 200px;
  `;

  const buttonStyle = css`
    outline: 1px solid gray;
    padding: 10px;
    width: max-content;
    max-width: 148px;
    display: flex;
    align-items: center;
  `;

  return (
    <div
      className={css`
        position: absolute;
        top: 0;
        left: 0;
        margin: 20px;
      `}
    >
      <div
        className={css`
          display: flex;
        `}
      >
        <div className={tabStyle}>
          <StaticWidthText className={hoverBold}>Some Tabs</StaticWidthText>
        </div>
        <div className={tabStyle}>
          <StaticWidthText
            className={cx(
              hoverBold,
              css`
                flex: 1;
              `,
            )}
          >
            Some long text that will be truncated eventually because its long
          </StaticWidthText>
        </div>
        <div className={tabStyle}>
          <StaticWidthText className={hoverBold}>
            Some more text
          </StaticWidthText>
        </div>
      </div>
      <br />
      <div className={cx(hoverBold, buttonStyle)}>
        <StaticWidthText>Some button</StaticWidthText>
        <Icon glyph="CaretDown" />
      </div>
      <br />
      <div className={cx(hoverBold, buttonStyle)}>
        <StaticWidthText
          className={cx(
            css`
              flex: 1;
            `,
          )}
        >
          Some long text button that should be truncated
        </StaticWidthText>
        <Icon glyph="CaretDown" />
      </div>
    </div>
  );
};
