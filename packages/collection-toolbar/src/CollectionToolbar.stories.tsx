import React from 'react';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import {
  CollectionToolbar,
  CollectionToolbarActionsButtonVariant,
  Size,
  Variant,
} from '.';

const meta: StoryMetaType<typeof CollectionToolbar> = {
  title: 'Components/CollectionToolbar',
  component: CollectionToolbar,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        size: Object.values(Size),
        variant: Object.values(Variant),
      },
    },
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    size: {
      control: 'select',
      options: Object.values(Size),
    },
    variant: {
      control: 'select',
      options: Object.values(Variant),
    },
  },
  decorators: [
    (Story: StoryFn) => {
      return (
        <div
          style={{
            background: 'lightblue',
            width: '100vw',
            height: '100%',
            margin: '-100px',
          }}
        >
          <Story />
        </div>
      );
    },
  ],
  args: {
    children: 'Collection Toolbar',
  },
};

export default meta;

export const LiveExample: StoryFn<typeof CollectionToolbar> = props => (
  <CollectionToolbar {...props}>
    <CollectionToolbar.Actions>
      <CollectionToolbar.Actions.Button
        variant={CollectionToolbarActionsButtonVariant.Default}
      >
        Default Button
      </CollectionToolbar.Actions.Button>
      <CollectionToolbar.Actions.Button
        variant={CollectionToolbarActionsButtonVariant.Primary}
      >
        Primary Button
      </CollectionToolbar.Actions.Button>
    </CollectionToolbar.Actions>
  </CollectionToolbar>
);
