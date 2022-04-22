import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import ExpandableCard from '.';

storiesOf('Packages/ExpandableCard', module)
  .add('Uncontrolled', () => (
    <ExpandableCard
      title={text('Title', 'Lorem Ipsum')}
      description={text(
        'Description',
        'Donec id elit non mi porta gravida at eget metus.',
      )}
      flagText={text('Flag text', 'optional')}
      darkMode={boolean('Dark Mode', false)}
    >
      Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh,
      ut fermentum massa justo sit amet risus.
    </ExpandableCard>
  ))
  .add('Controlled', () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <ExpandableCard
        title={text('Title', 'Controlled Ipsum')}
        description={text(
          'Description',
          'Donec id elit non mi porta gravida at eget metus.',
        )}
        isOpen={isOpen}
        onClick={e => {
          // eslint-disable-next-line no-console
          console.log(`Parent controlling isOpen:`, e);
          setIsOpen(!isOpen);
        }}
      >
        Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh,
        ut fermentum massa justo sit amet risus.
      </ExpandableCard>
    );
  });
