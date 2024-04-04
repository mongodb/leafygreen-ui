import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import Description from './Description';
import { DescriptionProps } from './Description.types';

export const Basic = ({ children, ...rest }: DescriptionProps) => {
  return <Description {...rest}>{children}</Description>;
};

const meta: StoryMetaType<typeof Description> = {
  title: 'Components/Typography/Description',
  component: Description,
  parameters: {
    default: 'Basic',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        baseFontSize: [13, 16],
        disabled: [false, true],
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
