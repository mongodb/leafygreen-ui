import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';

import InlineKeyCode from './InlineKeyCode';
import { InlineKeyCodeProps } from './InlineKeyCode.types';

type LGProviderBaseFontSize = 14 | 16;

export const LiveExample = ({
  baseFontSize,
  darkMode,
  children,
  ...rest
}: InlineKeyCodeProps & {
  baseFontSize: LGProviderBaseFontSize;
}) => {
  return (
    <LeafygreenProvider baseFontSize={baseFontSize} darkMode={darkMode}>
      <InlineKeyCode {...rest}>{children}</InlineKeyCode>
      <br></br>
      <InlineKeyCode {...rest}>CTRL</InlineKeyCode>
      <code> + </code>
      <InlineKeyCode {...rest}>C</InlineKeyCode>
    </LeafygreenProvider>
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
