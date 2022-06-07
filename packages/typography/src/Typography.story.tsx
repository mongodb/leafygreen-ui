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
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import { css } from '@leafygreen-ui/emotion';
import defaultArgTypes from '../../../stories/defaultArgTypes';

export default {
  title: 'Packages/Typography',
  argTypes: {
    baseFontSize: {
      options: [14, 16],
      control: { type: 'radio' },
    },
    darkMode: defaultArgTypes.darkMode,
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
          </Link>
          <Link
            href="https://mongodb.github.io/leafygreen-ui/?path=/story/*"
            arrowAppearance="persist"
          >
            External
          </Link>
        </div>
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
          <code> + </code>
          <InlineKeyCode>C</InlineKeyCode>
        </div>

        <Overline>Overline</Overline>
        <Disclaimer>Disclaimer</Disclaimer>

        <div>
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
