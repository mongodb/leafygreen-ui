import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import H1 from './H1';
import { H1Props } from './H1.types';

export const LiveExample = ({ children, ...rest }: H1Props) => {
  return <H1 {...rest}>{children}</H1>;
};

const meta: StoryMetaType<typeof H1> = {
  title: 'Components/Typography/H1',
  component: H1,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
      },
    },
  },
  args: {
    children: 'Lorem ipsum dolor sit amet',
  },
};
export default meta;

export const Generated = () => <></>;
