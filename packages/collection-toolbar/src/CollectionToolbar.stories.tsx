import React from 'react';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { ButtonVariant, CollectionToolbar, Size, Variant } from '.';

const meta: StoryMetaType<typeof CollectionToolbar> = {
  title: 'Components/CollectionToolbar',
  component: CollectionToolbar,
  decorators: [
    StoryFn => (
      <div style={{ margin: '-100px -100px 0', width: 'calc(100% + 200px)' }}>
        <StoryFn />
      </div>
    ),
  ],
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        size: Object.values(Size),
        variant: Object.values(Variant),
      },
    },
    docs: {
      description: {
        component:
          'CollectionToolbar is a component that displays a toolbar for a collection.',
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
};

export default meta;

export const LiveExample: StoryFn<typeof CollectionToolbar> = props => (
  <CollectionToolbar {...props}>
    <CollectionToolbar.Title>Collection Title</CollectionToolbar.Title>
    <CollectionToolbar.SearchInput
      placeholder="Search for a collection"
      aria-label="Search for a collection"
    />
    <CollectionToolbar.Actions showToggleButton>
      <CollectionToolbar.Actions.Button variant={ButtonVariant.Default}>
        Action
      </CollectionToolbar.Actions.Button>
      <CollectionToolbar.Actions.Button variant={ButtonVariant.Primary}>
        Action
      </CollectionToolbar.Actions.Button>
      <CollectionToolbar.Actions.Pagination
        onBackArrowClick={() => {}}
        onForwardArrowClick={() => {}}
        itemsPerPage={10}
        numTotalItems={100}
      />
      <CollectionToolbar.Actions.Menu>
        <CollectionToolbar.Actions.Menu.MenuItem>
          Menu Item
        </CollectionToolbar.Actions.Menu.MenuItem>
        <CollectionToolbar.Actions.Menu.MenuItem>
          Menu Item
        </CollectionToolbar.Actions.Menu.MenuItem>
        <CollectionToolbar.Actions.Menu.MenuItem>
          Menu Item
        </CollectionToolbar.Actions.Menu.MenuItem>
      </CollectionToolbar.Actions.Menu>
    </CollectionToolbar.Actions>
  </CollectionToolbar>
);

export const SearchInput: StoryFn<typeof CollectionToolbar.SearchInput> = ({
  placeholder,
  'aria-labelledby': ariaLabelledby = '',
  ...props
}) => (
  <CollectionToolbar size={Size.Default} variant={Variant.Collapsible}>
    <CollectionToolbar.SearchInput
      placeholder={placeholder}
      aria-labelledby={ariaLabelledby}
      {...props}
    />
  </CollectionToolbar>
);

SearchInput.argTypes = {
  placeholder: {
    control: 'text',
    defaultValue: 'Search for a collection',
  },
  'aria-labelledby': {
    control: 'text',
    defaultValue: 'search-input-label',
  },
};

export const Title: StoryFn<typeof CollectionToolbar> = props => (
  <CollectionToolbar {...props}>
    <CollectionToolbar.Title>Collection Title</CollectionToolbar.Title>
  </CollectionToolbar>
);

export const Actions: StoryFn<typeof CollectionToolbar.Actions> = ({
  showToggleButton,
  ...props
}) => {
  return (
    <CollectionToolbar {...props}>
      <CollectionToolbar.Title>Collection Title</CollectionToolbar.Title>
      <CollectionToolbar.Actions showToggleButton={showToggleButton}>
        <CollectionToolbar.Actions.Button variant={ButtonVariant.Default}>
          Action
        </CollectionToolbar.Actions.Button>
        <CollectionToolbar.Actions.Button variant={ButtonVariant.Primary}>
          Action
        </CollectionToolbar.Actions.Button>
      </CollectionToolbar.Actions>
    </CollectionToolbar>
  );
};

Actions.argTypes = {
  showToggleButton: {
    description:
      'Shows the toggle button. Only shows if the variant is collapsible.',
    control: 'boolean',
    defaultValue: false,
  },
};
