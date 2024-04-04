import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import Overline from './Overline';
import { OverlineProps } from './Overline.types';

export const Basic = ({ children, ...rest }: OverlineProps) => {
  return <Overline {...rest}>{children}</Overline>;
};

const meta: StoryMetaType<typeof Overline> = {
  title: 'Components/Typography/Overline',
  component: Overline,
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
