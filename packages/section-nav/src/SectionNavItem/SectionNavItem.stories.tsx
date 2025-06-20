import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import { SectionNavItem } from './SectionNavItem';
import { SectionNav } from '../SectionNav';

const decoratorWrapper = (Story: StoryFn, context: any) => (
  <div style={{ width: '200px' }}>
    <SectionNav darkMode={context?.args.darkMode}>
      <Story />
    </SectionNav>
  </div>
);

export default {
  title: 'Components/SectionNav/SectionNavItem',
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
    children: 'Section Nav Item',
    active: false,
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
} satisfies StoryMetaType<typeof SectionNavItem>;

export const LiveExample: StoryObj<typeof SectionNavItem> = {
  render: args => <SectionNavItem {...args}></SectionNavItem>,
};

export const Generated = () => {};
