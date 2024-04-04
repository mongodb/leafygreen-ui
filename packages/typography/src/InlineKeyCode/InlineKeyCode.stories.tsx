import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import { css } from '@leafygreen-ui/emotion';

import InlineKeyCode from './InlineKeyCode';
import { InlineKeyCodeProps } from './InlineKeyCode.types';

export const LiveExample = ({ children, ...rest }: InlineKeyCodeProps) => {
  return (
    <div
      className={css`
        display: block;
      `}
    >
      <InlineKeyCode {...rest}>{children}</InlineKeyCode>
      <br></br>
      <InlineKeyCode {...rest}>CTRL</InlineKeyCode>
      <code> + </code>
      <InlineKeyCode {...rest}>C</InlineKeyCode>
    </div>
  );
};

const meta: StoryMetaType<typeof InlineKeyCode> = {
  title: 'Components/Typography/InlineKeyCode',
  component: InlineKeyCode,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        baseFontSize: [13, 16],
      },
    },
  },
  args: {
    children: 'Lorem ipsum dolor sit amet',
  },
};
export default meta;

export const Generated = () => <></>;
