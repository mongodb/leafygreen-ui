import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { SectionNav } from '.';
import { SectionNavItem } from './SectionNavItem';

const meta: StoryMetaType<typeof SectionNav> = {
  title: 'Components/SectionNav',
  component: SectionNav,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
      },
    },
  },
  args: {
    darkMode: false,
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
};

export default meta;

const Template: StoryFn<typeof SectionNav> = props => (
  <SectionNav {...props}>
    <SectionNavItem href="#section-1">Section 1</SectionNavItem>
    <SectionNavItem active depth={2} href="#section-2">
      Section 2
    </SectionNavItem>
    <SectionNavItem active href="#section-3">
      Section 3
    </SectionNavItem>
    <SectionNavItem href="#section-4">Section 4</SectionNavItem>
    <SectionNavItem depth={2} href="#section-5">
      Section 5
    </SectionNavItem>
    <SectionNavItem depth={2} href="#section-6">
      Section 6
    </SectionNavItem>
  </SectionNav>
);

export const LiveExample = Template.bind({});
