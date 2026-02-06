import React from 'react';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import { Icon } from '@leafygreen-ui/icon';

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
      storyNames: ['Default', 'Compact', 'Collapsible'],
      combineArgs: {
        darkMode: [false, true],
        size: Object.values(Size),
      },
      decorator: (_, context) => {
        const args = context?.args ?? {};

        if (args.variant === Variant.Compact) {
          return <CompactTemplate {...args} />;
        }

        return <Template {...args} />;
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

const Template: StoryFn<typeof CollectionToolbar> = props => (
  <CollectionToolbar {...props}>
    <CollectionToolbar.Title>Collection Title</CollectionToolbar.Title>
    <CollectionToolbar.SearchInput
      placeholder="Search for a collection"
      aria-label="Search for a collection"
    />
    <CollectionToolbar.Filters>
      <CollectionToolbar.Filters.SegmentedControl
        value="option-1"
        aria-label="Segmented Control"
      >
        <CollectionToolbar.Filters.SegmentedControlOption
          key="option-1"
          value="option-1"
        >
          Option 1
        </CollectionToolbar.Filters.SegmentedControlOption>
        <CollectionToolbar.Filters.SegmentedControlOption
          key="option-2"
          value="option-2"
          glyph={<Icon glyph="GlobeAmericas" />}
        >
          Option 2
        </CollectionToolbar.Filters.SegmentedControlOption>
      </CollectionToolbar.Filters.SegmentedControl>

      <CollectionToolbar.Filters.TextInput
        value="Text Input"
        aria-label="Text Input"
      />
      <CollectionToolbar.Filters.NumberInput
        value={'10'}
        aria-label="Number Input"
      />
      <CollectionToolbar.Filters.DatePicker
        value={new Date()}
        aria-label="Date Picker"
      />
      <CollectionToolbar.Filters.Select
        aria-label="Select"
        className={css`
          width: 100%;
          max-width: 160px !important;
        `}
      >
        <CollectionToolbar.Filters.SelectOption value="option-1">
          Select Option 1
        </CollectionToolbar.Filters.SelectOption>
        <CollectionToolbar.Filters.SelectOption value="option-2">
          Select Option 2
        </CollectionToolbar.Filters.SelectOption>
      </CollectionToolbar.Filters.Select>
    </CollectionToolbar.Filters>
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
        <CollectionToolbar.Actions.MenuItem>
          Menu Item
        </CollectionToolbar.Actions.MenuItem>
        <CollectionToolbar.Actions.MenuItem>
          Menu Item
        </CollectionToolbar.Actions.MenuItem>
        <CollectionToolbar.Actions.MenuItem>
          Menu Item
        </CollectionToolbar.Actions.MenuItem>
      </CollectionToolbar.Actions.Menu>
    </CollectionToolbar.Actions>
    <CollectionToolbar.Filters />
  </CollectionToolbar>
);

const CompactTemplate: StoryFn<typeof CollectionToolbar> = props => (
  <CollectionToolbar {...props}>
    <CollectionToolbar.Title>Collection Title</CollectionToolbar.Title>
    <CollectionToolbar.SearchInput
      placeholder="Search for a collection"
      aria-label="Search for a collection"
    />
    <CollectionToolbar.Filters>
      <CollectionToolbar.Filters.TextInput
        value="Text Input"
        aria-label="Text Input"
      />
      <CollectionToolbar.Filters.NumberInput
        value={'10'}
        aria-label="Number Input"
      />
      <CollectionToolbar.Filters.Select
        aria-label="Select"
        className={css`
          width: 100%;
          max-width: 160px !important;
        `}
      >
        <CollectionToolbar.Filters.SelectOption value="option-1">
          Select Option 1
        </CollectionToolbar.Filters.SelectOption>
        <CollectionToolbar.Filters.SelectOption value="option-2">
          Select Option 2
        </CollectionToolbar.Filters.SelectOption>
      </CollectionToolbar.Filters.Select>
    </CollectionToolbar.Filters>
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
        <CollectionToolbar.Actions.MenuItem>
          Menu Item
        </CollectionToolbar.Actions.MenuItem>
        <CollectionToolbar.Actions.MenuItem>
          Menu Item
        </CollectionToolbar.Actions.MenuItem>
        <CollectionToolbar.Actions.MenuItem>
          Menu Item
        </CollectionToolbar.Actions.MenuItem>
      </CollectionToolbar.Actions.Menu>
    </CollectionToolbar.Actions>
    <CollectionToolbar.Filters />
  </CollectionToolbar>
);

export const LiveExample: StoryObj<typeof CollectionToolbar> = {
  render: Template,
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
  },
};

export const Default: StoryObj<typeof CollectionToolbar> = {
  render: Template,
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
  },
};

export const Compact: StoryObj<typeof CollectionToolbar> = {
  render: CompactTemplate,
  args: {
    variant: Variant.Compact,
  },
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
  },
};

export const Collapsible: StoryObj<typeof CollectionToolbar> = {
  render: Template,
  args: {
    variant: Variant.Collapsible,
  },
  parameters: {
    title: 'Variant: Collapsible',
    chromatic: {
      disableSnapshot: false,
    },
  },
};

export const SearchInput: StoryFn<typeof CollectionToolbar.SearchInput> = ({
  placeholder,
  'aria-label': ariaLabel = '',
  'aria-labelledby': ariaLabelledby = '',
  ...props
}) => (
  <CollectionToolbar size={Size.Default} variant={Variant.Collapsible}>
    <CollectionToolbar.SearchInput
      placeholder={placeholder}
      aria-label={ariaLabel}
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

Title.args = {
  variant: Variant.Collapsible,
};

export const Actions: StoryObj<typeof CollectionToolbar.Actions> = {
  render: ({ showToggleButton, ...props }) => (
    <CollectionToolbar {...props}>
      <CollectionToolbar.Title>Collection Title</CollectionToolbar.Title>
      <CollectionToolbar.Actions showToggleButton={showToggleButton}>
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
          <CollectionToolbar.Actions.MenuItem>
            Menu Item
          </CollectionToolbar.Actions.MenuItem>
          <CollectionToolbar.Actions.MenuItem>
            Menu Item
          </CollectionToolbar.Actions.MenuItem>
        </CollectionToolbar.Actions.Menu>
      </CollectionToolbar.Actions>
    </CollectionToolbar>
  ),
  argTypes: {
    showToggleButton: {
      description:
        'Shows the toggle button. Only shows if the variant is collapsible.',
      control: 'boolean',
      defaultValue: false,
    },
  },
  parameters: {
    generate: {
      combineArgs: {
        darkMode: [false, true],
        size: Object.values(Size),
        variant: Object.values(Variant),
        showToggleButton: [true, false],
      },
    },
  },
};

export const Filters: StoryObj<typeof CollectionToolbar.Filters> = {
  render: props => (
    <CollectionToolbar {...props}>
      <CollectionToolbar.Filters>
        <CollectionToolbar.Filters.SegmentedControl
          value="option-1"
          label="Segmented Control"
        >
          <CollectionToolbar.Filters.SegmentedControlOption
            key="segmented-control-option-1"
            value="option-1"
          >
            Segmented Control Option 1
          </CollectionToolbar.Filters.SegmentedControlOption>
          <CollectionToolbar.Filters.SegmentedControlOption
            key="segmented-control-option-2"
            value="option-2"
            glyph={<Icon glyph="GlobeAmericas" />}
          >
            Segmented Control Option 2
          </CollectionToolbar.Filters.SegmentedControlOption>
        </CollectionToolbar.Filters.SegmentedControl>

        <CollectionToolbar.Filters.TextInput
          value="Text Input"
          label="Text Input"
          description="Text Input description"
        />
        <CollectionToolbar.Filters.NumberInput
          value={'10'}
          aria-label="Number Input"
        />
        <CollectionToolbar.Filters.Combobox
          value="Combobox"
          aria-label="Combobox"
        >
          <CollectionToolbar.Filters.ComboboxOption
            value="Combobox Option 1"
            isFocused={false}
            isSelected={false}
            setSelected={() => {}}
            index={0}
            displayName="Combobox Option 1"
          >
            Combobox Option 1
          </CollectionToolbar.Filters.ComboboxOption>
          <CollectionToolbar.Filters.ComboboxOption
            value="Combobox Option 2"
            isFocused={false}
            isSelected={false}
            setSelected={() => {}}
            index={0}
            displayName="Combobox Option 2"
          >
            Combobox Option 2
          </CollectionToolbar.Filters.ComboboxOption>
        </CollectionToolbar.Filters.Combobox>
        <CollectionToolbar.Filters.DatePicker
          value={new Date()}
          aria-label="Date Picker"
        />
        <CollectionToolbar.Filters.Select
          value="Select"
          aria-label="Select"
          className={css`
            width: 100%;
            max-width: 160px !important;
          `}
        >
          <CollectionToolbar.Filters.SelectOption value="Select Option 1">
            Select Option 1
          </CollectionToolbar.Filters.SelectOption>
          <CollectionToolbar.Filters.SelectOption value="Select Option 2">
            Select Option 2
          </CollectionToolbar.Filters.SelectOption>
        </CollectionToolbar.Filters.Select>
      </CollectionToolbar.Filters>
    </CollectionToolbar>
  ),
  parameters: {
    generate: {
      combineArgs: {
        darkMode: [false, true],
        size: Object.values(Size),
        variant: Object.values(Variant),
      },
    },
  },
};
