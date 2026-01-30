import React from 'react';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { ResourceListItem } from '../ResourceListItem';

import { ResourceList, ResourceListProps } from '.';

const meta: StoryMetaType<typeof ResourceList> = {
  title: 'Composition/Chat/MessageFeed/ResourceList',
  component: ResourceList,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
      },
    },
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
  args: {
    children: [
      <ResourceListItem
        key="resource-list-item-1"
        glyph="QuestionMarkWithCircle"
      >
        Ask me technical questions
      </ResourceListItem>,
      <ResourceListItem key="resource-list-item-2" glyph="Bulb">
        Learn best practices
      </ResourceListItem>,
      <ResourceListItem key="resource-list-item-3" glyph="InfoWithCircle">
        Note: I won’t have access to any of your data unless you provide it
      </ResourceListItem>,
    ],
  },
};

export default meta;

const Template: StoryFn<ResourceListProps> = props => (
  <ResourceList {...props} />
);

export const LiveExample = {
  render: Template,
  args: {},
};

export const Generated = () => {};
