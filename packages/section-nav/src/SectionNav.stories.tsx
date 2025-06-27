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
      <SectionNavItem href="#section-2" label="Section 2" />
    </SectionNavItem>
    <SectionNavItem
      active
      href="#section-3"
      label="Section 3 should wrap to the next line"
    />
    <SectionNavItem href="#section-4" label="Section 4">
      <SectionNavItem href="#section-5" label="Section 5" />
      <SectionNavItem href="#section-6" label="Section 6">
        <SectionNavItem href="#section-7" label="Section 7" />
      </SectionNavItem>
    </SectionNavItem>
  </>
);

export default {
  title: 'Components/SectionNav',
  component: SectionNav,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams],
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
