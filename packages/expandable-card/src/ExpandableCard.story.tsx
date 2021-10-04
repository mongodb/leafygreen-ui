import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import ExpandableCard from '.';

storiesOf('ExpandableCard', module)
  .add('Uncontrolled', () => (
    <ExpandableCard
      title="Lorem Ipsum"
      description="Donec id elit non mi porta gravida at eget metus."
      flagText={text('Flag text', 'optional')}
      darkMode={boolean('Dark Mode', false)}
    >
      Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh,
      ut fermentum massa justo sit amet risus. Aenean lacinia bibendum nulla sed
      consectetur. Duis mollis, est non commodo luctus, nisi erat porttitor
      ligula, eget lacinia odio sem nec elit. Aenean eu leo quam. Pellentesque
      ornare sem lacinia quam venenatis vestibulum.
    </ExpandableCard>
  ))
  .add('Controlled', () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <ExpandableCard
        title="Controlled Ipsum"
        description="Donec id elit non mi porta gravida at eget metus."
        isOpen={isOpen}
        handleToggle={open => {
          console.log(`Parent controlling isOpen to: ${open}`);
          setIsOpen(open);
        }}
      >
        Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh,
        ut fermentum massa justo sit amet risus. Aenean lacinia bibendum nulla
        sed consectetur. Duis mollis, est non commodo luctus, nisi erat
        porttitor ligula, eget lacinia odio sem nec elit. Aenean eu leo quam.
        Pellentesque ornare sem lacinia quam venenatis vestibulum.
      </ExpandableCard>
    );
  });
