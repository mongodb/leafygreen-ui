import React from 'react';
import Icon, { glyphs } from '@leafygreen-ui/icon';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';
import Button, { Variant, Size } from '@leafygreen-ui/button';

const knobsConfig: KnobsConfigInterface<{
  disabled: boolean;
  variant: Variant;
  size: Size;
  glyph: string;
  children: React.ReactNode;
  href: string;
  title: string;
}> = {
  variant: {
    type: 'select',
    options: Object.values(Variant),
    default: Variant.Primary,
    label: 'Variant',
  },
  size: {
    type: 'select',
    options: Object.values(Size),
    default: Size.Normal,
    label: 'Size',
  },
  disabled: {
    type: 'boolean',
    default: false,
    label: 'Disabled',
  },
  href: {
    type: 'select',
    options: ['/component/box', undefined],
    default: '/component/box',
    label: 'href',
  },
  title: {
    type: 'text',
    default: 'The button title',
    label: 'Title',
  },
  glyph: {
    type: 'select',
    options: Object.keys(glyphs),
    default: 'Edit',
    label: 'Glyph',
  },
  children: {
    type: 'text',
    default: 'Button',
    label: 'Children',
  },
};

const ButtonLiveExample = () => {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({ glyph, ...props }) => (
        <Button {...props} glyph={<Icon glyph={glyph} />} />
      )}
    </LiveExample>
  );
};

export default ButtonLiveExample;
