import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import Overline from './Overline';
import { OverlineProps } from './Overline.types';

export const LiveExample = ({ children, ...rest }: OverlineProps) => {
  return <Overline {...rest}>{children}</Overline>;
};

const meta: StoryMetaType<typeof Overline> = {
  title: 'Components/Typography/Overline',
  component: Overline,
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
