import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';

import InlineCode from './InlineCode';
import { InlineCodeProps } from './InlineCode.types';

export const LiveExample = ({ children, ...rest }: InlineCodeProps) => {
  // @ts-ignore
  return <InlineCode {...rest}>{children}</InlineCode>;
};

const meta: StoryMetaType<typeof InlineCode> = {
  title: 'Components/Typography/InlineCode',
  component: InlineCode,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        baseFontSize: [13, 16],
        href: ['https://www.mongodb.design/', undefined],
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
