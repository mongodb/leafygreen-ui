import { ComponentStory } from '@storybook/react';
import React, { SyntheticEvent, useState } from 'react';
import ExpandableCard from '.';
import defaultArgTypes from '../../../stories/defaultArgTypes';

export default {
  title: 'Components/ExpandableCard',
  component: ExpandableCard,
  parameters: {
    controls: {
      exclude: [
        'className',
        'contentClassName',
        'id',
        'onClick',
        'isOpen',
        'defaultOpen',
      ],
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
    children: defaultArgTypes.children,
    darkMode: defaultArgTypes.darkMode,
  },
};

const Template: ComponentStory<typeof ExpandableCard> = args => (
  <ExpandableCard {...args} />
);

export const Uncontrolled = Template.bind({});
Uncontrolled.args = {};

export const Controlled: ComponentStory<typeof ExpandableCard> = args => {
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
