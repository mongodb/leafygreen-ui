import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import { BaseFontSize, FontWeight } from '@leafygreen-ui/tokens';

import Body from './Body';
import { BodyProps } from './Body.types';

export const Basic = ({ children, ...rest }: BodyProps) => {
  return <Body {...rest}>{children}</Body>;
};

const meta: StoryMetaType<typeof Body> = {
  title: 'Components/Typography/Body',
  component: Body,
  parameters: {
    default: 'Basic',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        baseFontSize: Object.values(BaseFontSize),
        weight: Object.values(FontWeight).filter(
          value => value !== FontWeight.Bold,
        ),
      },
    },
  },
  args: {
    children: 'Lorem ipsum dolor sit amet',
    darkMode: false,
    weight: FontWeight.Regular,
  },
  argTypes: {
    weight: {
      options: Object.values(FontWeight).filter(
        value => value !== FontWeight.Bold,
      ),
      control: {
        type: 'select',
      },
    },
  },
};
export default meta;

export const Generated = () => <></>;
