import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import { css, cx } from '@leafygreen-ui/emotion';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';

import Body from './Body';

const wrapperStyles = css`
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
`;

export const LiveExample = ({
  baseFontSize,
  darkMode,
}: {
  baseFontSize: 14 | 16;
  darkMode: boolean;
}) => {
  return (
    <LeafygreenProvider baseFontSize={baseFontSize} darkMode={darkMode}>
      <div className={cx(wrapperStyles)}>
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
      </div>
    </LeafygreenProvider>
  );
};

const meta: StoryMetaType<typeof Body> = {
  title: 'Components/Typography/Body',
  component: Body,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        baseFontSize: [13, 16],
        weight: ['regular', 'medium'],
      },
    },
  },
  args: {
    children: 'Lorem ipsum dolor sit amet',
  },
};
export default meta;

export const Generated = () => <></>;
