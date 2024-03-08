import React from 'react';
import { StoryFn } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@leafygreen-ui/lib';

import Checkbox, { CheckboxProps } from '.';

const descriptionText = `This is a description for the checkbox`;

const meta: StoryMetaType<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams, 'checked'],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        checked: [true, false],
        indeterminate: [false, true],
        bold: [true, false],
        disabled: [false, true],
        description: [undefined, descriptionText],
        label: ['I agree to this thing', undefined],
      },
      excludeCombinations: [
        [
          // Skip description when label is undefined
          'description',
          {
            label: undefined,
          },
        ],
        {
          // Skip bold when label is undefined
          bold: true,
          label: undefined,
        },
        {
          checked: true,
          indeterminate: true,
        },
      ],
      args: {
        className: css`
          text-align: initial;
          max-width: 300px;
        `,
      },
    },
  },
  args: {
    animate: true,
    label: 'I agree to this thing.',
    description: descriptionText,
    className: css`
      max-width: 700px;
    `,
  },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    darkMode: storybookArgTypes.darkMode,
    disabled: { control: 'boolean' },
    bold: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    animate: { control: 'boolean', default: true },
    baseFontSize: storybookArgTypes.baseFontSize,
  },
};
export default meta;

type BaseFontSize = 14 | 16;
type StoryCheckboxProps = CheckboxProps & { baseFontSize: BaseFontSize };

export const LiveExample: StoryFn<StoryCheckboxProps> = ({
  baseFontSize,
  ...args
}: StoryCheckboxProps) => (
  <LeafygreenProvider baseFontSize={baseFontSize}>
    <Checkbox {...args} />
  </LeafygreenProvider>
);

LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};
export const Controlled = LiveExample.bind({});
Controlled.parameters = {
  controls: {
    exclude: [...storybookExcludedControlParams],
  },
  chromatic: {
    disableSnapshot: true,
  },
};
Controlled.args = {
  checked: false,
};
Controlled.argTypes = {
  checked: { control: 'boolean' },
};

export const Generated = () => {};
