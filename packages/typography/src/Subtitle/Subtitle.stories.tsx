import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import Subtitle from './Subtitle';
import { SubtitleProps } from './Subtitle.types';

export const Basic = ({ children, ...rest }: SubtitleProps) => {
  return <Subtitle {...rest}>{children}</Subtitle>;
};

const meta: StoryMetaType<typeof Subtitle> = {
  title: 'Components/Typography/Subtitle',
  component: Subtitle,
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
