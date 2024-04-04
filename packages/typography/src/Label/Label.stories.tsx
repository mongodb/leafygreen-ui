import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import Label from './Label';
import { LabelProps } from './Label.types';

export const Basic = ({ children, ...rest }: LabelProps) => {
  return <Label {...rest}>{children}</Label>;
};

const meta: StoryMetaType<typeof Label> = {
  title: 'Components/Typography/Label',
  component: Label,
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
