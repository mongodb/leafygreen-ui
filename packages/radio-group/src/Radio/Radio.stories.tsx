import React from 'react';

import { StoryMetaType } from '@leafygreen-ui/lib';

import { Size } from '../types';

import Radio from './Radio';

const meta: StoryMetaType<typeof Radio> = {
  title: 'Components/RadioGroup/Radio',
  component: Radio,
  parameters: {
    default: null,
    generate: {
      combineArgs: {
        darkMode: [false, true],
        checked: [false, true],
        size: Object.values(Size),
        disabled: [false, true],
      },
      args: {
        children: 'Radio',
        value: 'radio',
      },
    },
  },
};

export default meta;

export const Generated = () => <></>;
