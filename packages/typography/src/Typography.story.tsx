import React from 'react';

import { css, cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import {
  storybookArgTypes,
  type StoryMetaType,
  type StoryType,
} from '@leafygreen-ui/lib';
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

// eslint-disable-next-line react/prop-types
const TypographyDemoComponent = ({
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

        <Body>Body</Body>
        <Body>
          <strong>Body (Semibold)</strong>
        </Body>
        <Body>
          <em>Body (Italic)</em>
        </Body>
        <Body>
          <strong>
            <em>Body (Semibold Italic)</em>
          </strong>
        </Body>

        <div className={cx(displayFlex)}>
          <InlineCode>&quot;Inline Code&quot;</InlineCode>
          <InlineCode href="https://mongodb.github.io/leafygreen-ui/?path=/story/*">
            &quot;Inline Code Link&quot;
          </InlineCode>
        </div>

        <div>
          <Link href="http://localhost:9001" arrowAppearance="hover">
            Local (Arrow on Hover)
          </Link>
          <br />
          <Link href="http://localhost:9001" arrowAppearance="none">
            Local (No Arrow)
          </Link>
          <br />
          <Link href="?path=/story/button--icon-only" arrowAppearance="persist">
            Internal (Persist Arrow)
          </Link>
          <br />
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

        <Error>Hello I am an Error!</Error>

        <div className={cx(displayBlock)}>
          <Label htmlFor="id">This is a label</Label>
          <Description>This is the description for said label</Description>
        </div>
      </div>
    </LeafygreenProvider>
  );
};

const meta: StoryMetaType<typeof TypographyDemoComponent> = {
  title: 'Components/Typography',
  component: TypographyDemoComponent,
  parameters: {
    default: 'AllTypography',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        baseFontSize: [14, 16],
      },
    },
  },
};
export default meta;

export const AllTypography: StoryType<typeof TypographyDemoComponent> =
  TypographyDemoComponent.bind({});
AllTypography.argTypes = {
  baseFontSize: {
    ...storybookArgTypes.baseFontSize,
    description:
      'Storybook prop only. This font size is passed into the LeafygreenProvider.',
  },
  darkMode: storybookArgTypes.darkMode,
};
AllTypography.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
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
StaticWidthTextStory.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const Generated = () => <></>;
