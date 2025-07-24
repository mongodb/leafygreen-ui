import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import { SectionNavItem } from './SectionNavItem';
import { SectionNav } from '.';

const children = (
  <>
    <SectionNavItem href="#section-1" label="Section 1">
      <SectionNavItem href="#section-1.1" label="Section 1.1" />
    </SectionNavItem>
    <SectionNavItem href="#section-2" label="Section 2" />
    <SectionNavItem active href="#section-3" label="Section 3">
      <SectionNavItem href="#section-3.1" label="Section 3.1" />
      <SectionNavItem href="#section-3.2" label="Section 3.2" />
    </SectionNavItem>
  </>
);

export default {
  title: 'Composition/Data Display/SectionNav',
  component: SectionNav,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams, 'children'],
    },
  },
  decorators: [
    (Story: StoryFn) => (
      <div style={{ width: '200px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    darkMode: false,
    title: 'On this page',
    children,
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
} satisfies StoryMetaType<typeof SectionNav>;

export const LiveExample: StoryObj<typeof SectionNav> = {
  render: args => <SectionNav {...args}></SectionNav>,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const LightMode: StoryObj<typeof SectionNav> = {
  render: args => <SectionNav {...args}></SectionNav>,
  args: {
    darkMode: false,
  },
};

export const DarkMode: StoryObj<typeof SectionNav> = {
  render: args => <SectionNav {...args}></SectionNav>,
  args: {
    darkMode: true,
  },
};
