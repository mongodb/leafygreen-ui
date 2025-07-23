import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import { BaseFontSize } from '@leafygreen-ui/tokens';

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
        baseFontSize: Object.values(BaseFontSize),
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
