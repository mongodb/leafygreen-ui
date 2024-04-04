import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import Description from './Description';
import { DescriptionProps } from './Description.types';

export const LiveExample = ({ children, ...rest }: DescriptionProps) => {
  return <Description {...rest}>{children}</Description>;
};

const meta: StoryMetaType<typeof Description> = {
  title: 'Components/Typography/Description',
  component: Description,
  parameters: {
    default: 'LiveExample',
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
  },
};
export default meta;

export const Generated = () => <></>;
