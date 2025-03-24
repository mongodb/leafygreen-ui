import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { spacing } from '@leafygreen-ui/tokens';

import { LegendCheckbox } from './LegendCheckbox';
import { LegendCheckboxProps } from './LegendCheckbox.types';

const labelContainerStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[100]}px;
`;

const renderLabel = () => (
  <div className={labelContainerStyles}>
    <Icon glyph="Primary" />
    <span>Checkbox label</span>
  </div>
);

export default {
  title: 'Charts/Legend/LegendCheckbox',
  component: LegendCheckbox,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams, 'checked', 'icon'],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        checked: [false, true],
        indeterminate: [false, true],
      },
      excludeCombinations: [
        {
          checked: true,
          indeterminate: true,
        },
      ],
      args: {
        label: renderLabel(),
      },
    },
  },
  args: {
    label: renderLabel(),
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    label: { control: 'text' },
  },
} satisfies StoryMetaType<typeof LegendCheckbox, Partial<LegendCheckboxProps>>;

export const LiveExample: StoryObj<typeof LegendCheckbox> = {
  args: {
    label: renderLabel(),
  },
  argTypes: {
    checked: { control: 'boolean' },
    color: { control: 'color' },
  },
  render: ({ ...args }) => <LegendCheckbox {...args} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Generated: StoryObj<typeof LegendCheckbox> = {
  render: () => <></>,
};
