import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import CopyIcon from '@leafygreen-ui/icon/dist/Copy';
import Banner, { Variant } from '.';

const margin = css`
  margin-left: 100px;
  margin-right: 100px;
`;

storiesOf('Packages/Banner', module)
  .add('Default', () => (
    <div className={margin}>
      <Banner
        variant={select('variant', Object.values(Variant), 'info')}
        dismissible={boolean('dismissible', false)}
      >
        {text(
          'Children',
          'To avoid disrupting majority writes, new members are now added to replica sets as priority=0, votes=0 until they reach secondary state, after which Cloud Manager automatically updates the configuration to match the priority    and votes value specified in the deployment.',
        )}
      </Banner>
    </div>
  ))
  .add('With Custom Image', () => (
    <div>
      <div className={margin}>
        <Banner
          variant={select('variant', Object.values(Variant), 'info')}
          dismissible={boolean('dismissible', false)}
          image={<CopyIcon />}
        >
          {text(
            'Children',
            'To avoid disrupting majority writes, new members are now added to replica sets as priority=0, votes=0 until they reach secondary state, after which Cloud Manager automatically updates the configuration to match the priority    and votes value specified in the deployment.',
          )}
        </Banner>
      </div>
    </div>
  ));
