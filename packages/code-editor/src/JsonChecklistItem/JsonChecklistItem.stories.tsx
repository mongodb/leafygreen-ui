import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
  StoryType,
} from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import { JsonChecklistItem } from './JsonChecklistItem';
import { Status } from './JsonChecklistItem.types';

export default {
  title: 'Components/CodeEditor/JsonChecklistItem',
  component: JsonChecklistItem,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams],
    },
    generate: {
      combineArgs: {
        badges: [undefined, { children: 'Data Type' }],
        darkMode: [false, true],
        description: [
          undefined,
          'This is a description for the checklist item.',
        ],
        status: [Status.Missing, Status.Present],
      },
    },
  },
  args: {
    description: 'This is a description for the checklist item.',
    label: 'Label',
    status: Status.Missing,
  },
  argTypes: {
    badgeText: {
      name: 'badges.children',
      description:
        '**STORYBOOK ONLY**: This control is used to conditionally render a single badge. Add and remove text to control badge rendering.\n\nNote: in code, this is controlled by badges prop being provided or undefined. It can be a single object of badge props or an array of objects.',
      control: {
        type: 'text',
      },
    },
    darkMode: storybookArgTypes.darkMode,
    description: {
      control: 'text',
      description: 'Additional description for the item.',
    },
    label: { control: 'text', description: 'Label for the item' },
    status: {
      options: Object.values(Status),
      control: { type: 'radio' },
      description:
        "Determines rendering of the status UI: \n- `'missing'` will render 'Add' button to add missing item \n- `'present'` will render checkmark icon with 'Added!' text",
    },
  },
} satisfies StoryMetaType<typeof JsonChecklistItem>;

const LiveExampleComponent: StoryType<
  typeof JsonChecklistItem,
  {
    badgeText?: string;
  }
> = ({ badges: badgesProp, badgeText, onAddClick, ...rest }) => {
  const badges =
    badgesProp || (badgeText ? { children: badgeText } : undefined);

  const handleAddClick = () => {
    // eslint-disable-next-line no-console
    console.log('Add button clicked');
    onAddClick?.();
  };

  return (
    <JsonChecklistItem {...rest} badges={badges} onAddClick={handleAddClick} />
  );
};

export const LiveExample: StoryObj<typeof LiveExampleComponent> = {
  render: ({ ...args }) => <LiveExampleComponent {...args} />,
  args: {
    badgeText: 'Data Type',
    label: 'Label',
    status: Status.Missing,
    description: 'This is a description for the checklist item.',
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Generated: StoryObj<typeof JsonChecklistItem> = {
  render: () => <></>,
};
