import React, { SyntheticEvent, useState } from 'react';
import { StoryFn } from '@storybook/react';

import {
  storybookArgTypes,
  storybookExcludedControlParams as defaultExclude,
  StoryMetaType,
} from '@leafygreen-ui/lib';

import ExpandableCard, { type ExpandableCardProps } from '.';

const meta: StoryMetaType<typeof ExpandableCard> = {
  title: 'Components/ExpandableCard',
  component: ExpandableCard,
  parameters: {
    default: 'Basic',
    controls: {
      exclude: [...defaultExclude, 'isOpen', 'defaultOpen'],
    },
  },
  args: {
    title: 'Title',
    description: 'Donec id elit non mi porta gravida at eget metus.',
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

export const Basic: StoryFn<ExpandableCardProps> = args => (
  <ExpandableCard {...args} />
);

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
