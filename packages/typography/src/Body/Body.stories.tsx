import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import { BaseFontSize } from '@leafygreen-ui/tokens';

import Body from './Body';
import { BodyProps } from './Body.types';

export const Basic = ({ children, ...rest }: BodyProps) => {
  return <Body {...rest}>{children}</Body>;
};

const meta: StoryMetaType<typeof Body> = {
  title: 'Components/Typography/Body',
  component: Body,
  parameters: {
    default: 'Basic',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        baseFontSize: Object.values(BaseFontSize),
        weight: ['regular', 'medium'],
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
