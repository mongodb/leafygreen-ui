import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import H2 from './H2';
import { H2Props } from './H2.types';

export const Basic = ({ children, ...rest }: H2Props) => {
  return <H2 {...rest}>{children}</H2>;
};

const meta: StoryMetaType<typeof H2> = {
  title: 'Components/Typography/H2',
  component: H2,
  parameters: {
    default: 'Basic',
    generate: {
      combineArgs: {
        darkMode: [false, true],
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
