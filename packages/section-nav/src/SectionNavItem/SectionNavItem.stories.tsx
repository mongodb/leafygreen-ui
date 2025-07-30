import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import { SectionNav } from '../SectionNav';

import { SectionNavItem } from './SectionNavItem';

const decoratorWrapper = (Story: StoryFn, context: any) => (
  <div style={{ width: '200px' }}>
    <SectionNav darkMode={context?.args.darkMode}>
      <Story />
    </SectionNav>
  </div>
);

export default {
  title: 'Composition/Data Display/SectionNav/SectionNavItem',
  component: SectionNavItem,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        active: [false, true],
        // @ts-expect-error - data-hover is not a valid prop
        'data-hover': [false, true],
        'data-focus': [false, true],
      },
      decorator: decoratorWrapper,
    },
  },
  decorators: [decoratorWrapper],
  args: {
    darkMode: false,
    label: 'Section Nav Item 1',
    active: false,
    href: '#section-1',
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
} satisfies StoryMetaType<typeof SectionNavItem>;

export const LiveExample: StoryObj<typeof SectionNavItem> = {
  // @ts-expect-error - darkMode is not a valid prop for SectionNavItem
  render: ({ darkMode, ...args }) => (
    <SectionNavItem {...args}></SectionNavItem>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Nested: StoryObj<typeof SectionNavItem> = {
  // @ts-expect-error - darkMode is not a valid prop for SectionNavItem
  render: ({ darkMode, ...args }) => (
    <SectionNavItem label="Section Nav Item 1" href="#section-1">
      <SectionNavItem {...args} />
    </SectionNavItem>
  ),
  args: {
    label: 'Section Nav Item 1.1',
    href: '#section-1.1',
  },
};

export const Generated = () => {};
