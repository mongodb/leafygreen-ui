import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import { css } from '@leafygreen-ui/emotion';
import { BaseFontSize } from '@leafygreen-ui/tokens';

import InlineKeyCode from './InlineKeyCode';
import { InlineKeyCodeProps } from './InlineKeyCode.types';

export const Basic = ({ children, ...rest }: InlineKeyCodeProps) => {
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
    default: 'Basic',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        baseFontSize: Object.values(BaseFontSize),
      },
    },
  },
  args: {
    children: 'Lorem ipsum dolor sit amet',
    darkMode: false,
  },
};
export default meta;

export const Generated = () => <></>;
