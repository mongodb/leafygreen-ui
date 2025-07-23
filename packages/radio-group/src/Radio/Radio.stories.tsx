import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';

import { Size } from '../types';

import Radio from './Radio';

const meta: StoryMetaType<typeof Radio> = {
  title: 'Components/Inputs/RadioGroup/Radio',
  component: Radio,
  parameters: {
    default: null,
    generate: {
      combineArgs: {
        darkMode: [false, true],
        checked: [false, true],
        size: Object.values(Size),
        disabled: [false, true],
        bold: [false, true],
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
