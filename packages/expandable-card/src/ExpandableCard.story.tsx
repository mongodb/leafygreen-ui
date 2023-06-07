import React, { SyntheticEvent, useState } from 'react';
import { StoryFn } from '@storybook/react';

import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@leafygreen-ui/lib';

import ExpandableCard, { type ExpandableCardProps } from '.';

const loremIpsum = 'Donec id elit non mi porta gravida at eget metus.';

const meta: StoryMetaType<typeof ExpandableCard> = {
  title: 'Components/ExpandableCard',
  component: ExpandableCard,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams, 'isOpen', 'defaultOpen'],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        description: [undefined, loremIpsum],
        flagText: [undefined, 'optional'],
        isOpen: [false, true],
      },
    },
  },
  args: {
    title: 'Title',
    description: loremIpsum,
    flagText: 'optional',
    children:
      'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.',
  },
  argTypes: {
    description: { control: 'text' },
    flagText: { control: 'text' },
    children: storybookArgTypes.children,
    darkMode: storybookArgTypes.darkMode,
    defaultOpen: { control: 'boolean' },
    isOpen: { control: 'boolean' },
    id: { control: 'text' },
    contentClassName: { control: 'text' },
  },
};

export default meta;

export const LiveExample: StoryFn<ExpandableCardProps> = args => (
  <ExpandableCard {...args} />
);
LiveExample.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Controlled: StoryFn<ExpandableCardProps> = args => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (
    e: SyntheticEvent<
      HTMLDivElement | HTMLButtonElement,
      MouseEvent | KeyboardEvent
    >,
  ) => {
    // eslint-disable-next-line no-console
    console.log(`Parent controlling isOpen:`, e);
    setIsOpen(isOpen => !isOpen);
  };

  return (
    <div>
      <button onClick={handleClick}>handleClick</button>
      <ExpandableCard {...args} isOpen={isOpen} onClick={handleClick} />
    </div>
  );
};
Controlled.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Generated = () => {};
