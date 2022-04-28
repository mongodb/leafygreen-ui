import React, { useState } from 'react';
import ExpandableCard from '.';

export default {
  title: 'Packages/ExpandableCard',
  component: ExpandableCard,
  args: {
    title: 'Title',
    description: 'Donec id elit non mi porta gravida at eget metus.',
    flagText: 'optional',
    children:
      'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.',
  },
};

const Template = args => <ExpandableCard {...args} />;

export const Uncontrolled = Template.bind({});
Uncontrolled.args = {};

const ControlledTemplate = args => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ExpandableCard
      {...args}
      isOpen={isOpen}
      onClick={e => {
        // eslint-disable-next-line no-console
        console.log(`Parent controlling isOpen:`, e);
        setIsOpen(isOpen => !isOpen);
      }}
    />
  );
};

export const Controlled = ControlledTemplate.bind({});
Controlled.args = {};
