import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import Badge from './Badge';

storiesOf('Badge', module)
  .add('Default', () => (
    <section className="storybook-container">
      <Badge
        variant={select(
          'Variant',
          [
            'default',
            'danger',
            'warning',
            'darkBlue',
            'lightBlue',
            'primary',
            'outline',
            'dark',
          ],
          'darkBlue',
        )}
      >
        Sandbox
      </Badge>
    </section>
  ))
  .add('withHref', () => (
    <section className="storybook-container">
      <Badge
        variant={select(
          'Variant',
          [
            'default',
            'danger',
            'warning',
            'darkBlue',
            'lightBlue',
            'primary',
            'outline',
          ],
          'default',
        )}
        href="http://mongodb.design/#/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Watch me become an a-tag
      </Badge>
    </section>
  ));
