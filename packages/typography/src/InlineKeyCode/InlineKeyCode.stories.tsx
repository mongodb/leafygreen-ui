import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';

import InlineKeyCode from './InlineKeyCode';
import { InlineKeyCodeProps } from './InlineKeyCode.types';

export const LiveExample = ({ children, ...rest }: InlineKeyCodeProps) => {
  return (
    <>
      <InlineKeyCode {...rest}>{children}</InlineKeyCode>
      <br></br>
      <InlineKeyCode {...rest}>CTRL</InlineKeyCode>
      <code> + </code>
      <InlineKeyCode {...rest}>C</InlineKeyCode>
    </>
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
      decorator: (Instance, context) => {
        return (
          <LeafygreenProvider
            darkMode={context?.args.darkMode}
            baseFontSize={context?.args.baseFontSize}
          >
            <Instance />
          </LeafygreenProvider>
        );
      },
    },
  },
  args: {
    children: 'Lorem ipsum dolor sit amet',
  },
};
export default meta;

export const Generated = () => <></>;
