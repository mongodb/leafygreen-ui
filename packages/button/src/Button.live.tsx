import React from 'react';
import { glyphs } from '@leafygreen-ui/icon';
import LiveExample, { KnobType } from '@leafygreen-ui/live-example';
import Button from '.';

const knobsConfig = {
  variant: {
    type: KnobType.Select,
    options: ['primary', 'default', 'info', 'dark', 'danger'],
    default: 'primary',
    label: 'Variant',
  },
  size: {
    type: KnobType.Select,
    options: ['xsmall', 'small', 'normal', 'large'],
    default: 'normal',
    label: 'Size',
  },
  disabled: {
    type: KnobType.Boolean,
    default: false,
    label: 'Disabled',
  },
  href: {
    type: KnobType.Select,
    options: ['/component/box', undefined],
    default: '/component/box',
    label: 'href',
  },
  title: {
    type: KnobType.Text,
    default: 'The button title',
    label: 'Title',
  },
  glyph: {
    type: KnobType.Select,
    options: Object.keys(glyphs),
    default: 'Edit',
    label: 'Glyph',
  },
  children: {
    type: KnobType.Text,
    default: 'Button',
    label: 'Children',
  },
};

const ButtonLiveExample = () => {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <Button {...props} />}
    </LiveExample>
  );
};

export { ButtonLiveExample };
