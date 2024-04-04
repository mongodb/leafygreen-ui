import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import Label from './Label';
import { LabelProps } from './Label.types';

export const LiveExample = ({ children, ...rest }: LabelProps) => {
  return <Label {...rest}>{children}</Label>;
};

const meta: StoryMetaType<typeof Label> = {
  title: 'Components/Typography/Label',
  component: Label,
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
