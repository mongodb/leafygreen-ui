import React from 'react';
import { StoryFn } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import {
  defaultStorybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@leafygreen-ui/lib';

import Checkbox, { CheckboxProps } from '.';

const loremIpsum = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy children ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`;

const meta: StoryMetaType<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    default: 'Uncontrolled',
    controls: {
      exclude: [...storybookExcludedControlParams, 'checked'],
    },
    generate: {
      props: {
        darkMode: [false, true],
        indeterminate: [false, true],
        disabled: [false, true],
        description: [undefined, loremIpsum],
        label: ['I agree to this thing', undefined],
        bold: [true, false],
        checked: [true, false],
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
    },
  },
  args: {
    animate: true,
    label: 'I agree to this thing.',
    description: loremIpsum,
    className: css`
      max-width: 700px;
    `,
  },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    darkMode: defaultStorybookArgTypes.darkMode,
    disabled: { control: 'boolean' },
    bold: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    animate: { control: 'boolean', default: true },
    baseFontSize: defaultStorybookArgTypes.baseFontSize,
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

export const Controlled = LiveExample.bind({});
Controlled.parameters = {
  controls: {
    exclude: [...storybookExcludedControlParams],
  },
};
Controlled.args = {
  checked: false,
};
Controlled.argTypes = {
  checked: { control: 'boolean' },
};

export const Generated = () => {};
