import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import Banner, { Variant } from '.';

storiesOf('Banner', module).add('Default', () => (
  <Banner
    variant={select('variant', Object.values(Variant), 'info')}
    dismissable={boolean('dismissable', false)}
  >
    {text(
      'Children',
      'To avoid disrupting majority writes, new members are now added to replica sets as priority=0, votes=0 until they reach secondary state, after which Cloud Manager automatically updates the configuration to match the priority    and votes value specified in the deployment.',
    )}
  </Banner>
));
