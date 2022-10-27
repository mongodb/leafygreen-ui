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
} from '.';
import { StaticWidthText } from './utility/StaticWidthText';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import { cx, css } from '@leafygreen-ui/emotion';
import InlineDefinition from '@leafygreen-ui/inline-definition';
import { storybookArgTypes } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

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
  argTypes: {
    baseFontSize: {
      options: [14, 16],
      control: { type: 'radio' },
      description:
        'Storybook prop only. This font size is passed into the LeafygreenProvider.',
    },
    darkMode: storybookArgTypes.darkMode,
    className: {
      table: {
        disable: true,
      },
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
    <LeafygreenProvider baseFontSize={baseFontSize}>
      <div className={cx(wrapperStyles)}>
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

        <Body className={cx(displayFlex)}>
          <InlineCode darkMode={darkMode}>&quot;Inline Code&quot;</InlineCode>
          <InlineCode
            darkMode={darkMode}
            href="https://mongodb.github.io/leafygreen-ui/?path=/story/*"
          >
            &quot;Inline Code Link&quot;
          </InlineCode>
        </Body>

        <div className={cx(displayFlex)}>
          <Link
            href="http://localhost:9001"
            arrowAppearance="hover"
            darkMode={darkMode}
          >
            Local (Arrow on Hover)
          </Link>
          <Link
            href="http://localhost:9001"
            arrowAppearance="none"
            darkMode={darkMode}
          >
            Local (No Arrow)
          </Link>
          <Link
            href="?path=/story/button--icon-only"
            arrowAppearance="persist"
            darkMode={darkMode}
          >
            Internal (Persist Arrow)
          </Link>
          <Link
            href="https://mongodb.github.io/leafygreen-ui/?path=/story/*"
            arrowAppearance="persist"
            darkMode={darkMode}
          >
            External
          </Link>
        </div>

        <Body darkMode={darkMode} className={displayBlock}>
          <InlineKeyCode darkMode={darkMode}>CTRL</InlineKeyCode>
          <code> + </code>
          <InlineKeyCode darkMode={darkMode}>C</InlineKeyCode>
        </Body>

        <Overline darkMode={darkMode} className={displayBlock}>
          Overline
        </Overline>
        <Disclaimer darkMode={darkMode} className={displayBlock}>
          Disclaimer
        </Disclaimer>

        <Body darkMode={darkMode}>
          <InlineDefinition darkMode={darkMode} definition="Tooltip Definition">
            Inline definition
          </InlineDefinition>{' '}
        </Body>

        <div className={cx(displayBlock)}>
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

export const StaticWidthTextStory = () => {
  const textWrapper = css`
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;

  const hoverBold = css`
    font-weight: 400;
    cursor: pointer;
    outline: 1px solid ${palette.red.light2};
    outline-offset: -1px;

    &:hover {
      font-weight: 700;
    }
  `;

  return (
    <>
      <div
        className={css`
          outline: 1px solid gray;
          padding: 10px;
          display: flex;
          gap: 2px;
        `}
      >
        <div className={textWrapper}>
          <StaticWidthText className={hoverBold}>Some Tabs</StaticWidthText>
        </div>
        <div className={textWrapper}>
          <StaticWidthText
            className={cx(
              hoverBold,
              css`
                max-width: 100%;
              `,
            )}
          >
            Some long text that will be truncated eventually because its long
          </StaticWidthText>
        </div>
        <div className={textWrapper}>
          <StaticWidthText className={hoverBold}>
            Some more text
          </StaticWidthText>
        </div>
      </div>

      <div
        className={css`
          outline: 1px solid gray;
          padding: 10px;
          width: 150px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        `}
      >
        <StaticWidthText
          className={cx(
            hoverBold,
            css`
              max-width: 100%;
            `,
          )}
        >
          Some long text that will be truncated eventually because its long
        </StaticWidthText>
      </div>
    </>
  );
};
