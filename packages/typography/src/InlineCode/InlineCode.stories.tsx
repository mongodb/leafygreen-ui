import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';

import InlineCode from './InlineCode';
import { InlineCodeProps } from './InlineCode.types';

type LGProviderBaseFontSize = 14 | 16;

export const LiveExample = ({
  baseFontSize,
  darkMode,
  children,
  ...rest
}: InlineCodeProps & {
  baseFontSize: LGProviderBaseFontSize;
}) => {
  return (
    <LeafygreenProvider baseFontSize={baseFontSize} darkMode={darkMode}>
      {/* @ts-ignore */}
      <InlineCode {...rest}>{children}</InlineCode>
    </LeafygreenProvider>
  );
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
    },
  },
  args: {
    children: 'Lorem ipsum dolor sit amet',
  },
};
export default meta;

export const Generated = () => <></>;
