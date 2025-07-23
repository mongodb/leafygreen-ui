import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';

import { Size } from '..';

import { RadioBox } from '.';

const meta: StoryMetaType<typeof RadioBox> = {
  title: 'Components/Inputs/RadioBoxGroup/RadioBox',
  component: RadioBox,
  parameters: {
    default: null,
    controls: {
      exclude: [...storybookExcludedControlParams, 'children', 'name', 'value'],
    },
    generate: {
      combineArgs: {
        checked: [false, true],
        darkMode: [false, true],
        disabled: [false, true],
        default: [false, true],
        size: Object.values(Size),
      },
    },
  },
  args: {
    children: 'Children',
  },
  argTypes: {
    name: { control: 'text' },
    value: { control: 'text' },
    darkMode: storybookArgTypes.darkMode,
  },
};
export default meta;

export const Generated = () => {};
