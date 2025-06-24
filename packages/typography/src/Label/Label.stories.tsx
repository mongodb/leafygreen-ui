import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import { BaseFontSize } from '@leafygreen-ui/tokens';

import Label from './Label';
import { LabelProps } from './Label.types';

export const Basic = ({ children, ...rest }: LabelProps) => {
  return (
    <Label data-lgid="lg-hello" {...rest}>
      {children}
    </Label>
  );
};

const meta: StoryMetaType<typeof Label> = {
  title: 'Components/Typography/Label',
  component: Label,
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
