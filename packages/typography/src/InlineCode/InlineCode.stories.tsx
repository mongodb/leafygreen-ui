import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import { BaseFontSize } from '@leafygreen-ui/tokens';

import InlineCode from './InlineCode';
import { InlineCodeProps } from './InlineCode.types';

export const Basic = ({ children, ...rest }: InlineCodeProps) => {
  // @ts-ignore
  return <InlineCode {...rest}>{children}</InlineCode>;
};

const meta: StoryMetaType<typeof InlineCode> = {
  title: 'Components/Typography/InlineCode',
  component: InlineCode,
  parameters: {
    default: 'Basic',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        baseFontSize: Object.values(BaseFontSize),
        href: ['https://www.mongodb.design/', undefined],
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
