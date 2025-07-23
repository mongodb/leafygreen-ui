import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import Disclaimer from './Disclaimer';
import { DisclaimerProps } from './Disclaimer.types';

export const Basic = ({ children, ...rest }: DisclaimerProps) => {
  return <Disclaimer {...rest}>{children}</Disclaimer>;
};

const meta: StoryMetaType<typeof Disclaimer> = {
  title: 'Components/Typography/Disclaimer',
  component: Disclaimer,
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
    darkMode: false,
  },
};
export default meta;

export const Generated = () => <></>;
