/* eslint-disable no-console */
import React, { MouseEvent, useRef } from 'react';

import { Size } from '@leafygreen-ui/button';
import Icon, { glyphs } from '@leafygreen-ui/icon';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMeta,
} from '@leafygreen-ui/lib';
import { MenuItem } from '@leafygreen-ui/menu';

import { Align, Justify, SplitButton, SplitButtonProps, Variant } from '.';

export default StoryMeta({
  title: 'Components/SplitButton',
  component: SplitButton,
  args: {
    label: 'label',
    variant: Variant.Default,
    align: Align.Bottom,
    justify: Justify.End,
    menuItems: [
      // eslint-disable-next-line no-console
      <MenuItem key="0" onClick={(event: MouseEvent) => console.log(event)}>
        Menu Item
      </MenuItem>,
      <MenuItem key="1" description="I am a description" disabled>
        Disabled Menu Item
      </MenuItem>,
      <MenuItem key="2" description="I am also a description">
        Menu Item With Description
      </MenuItem>,
      <MenuItem key="3">I am not a link!</MenuItem>,
    ],
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    disabled: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    leftGlyph: {
      options: Object.keys(glyphs),
      control: { type: 'select' },
    },
    size: {
      control: 'select',
      options: Object.values(Size),
    },
    variant: {
      control: 'select',
      options: Object.values(Variant),
    },
    align: {
      control: 'select',
      options: Object.values(Align),
    },
    justify: {
      control: 'select',
      options: Object.values(Justify),
    },
  },
  parameters: {
    default: 'Basic',
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'as',
        'children',
        'menuItems',
        'href',
        'type',
        'maxHeight',
        'open',
        'onTriggerClick',
        'triggerAriaLabel',
        'onChange',
      ],
    },
  },
});

const Template = (props: SplitButtonProps) => {
  const { leftGlyph, ...rest } = props;
  const splitButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <SplitButton
      {...rest}
      ref={splitButtonRef}
      // @ts-expect-error
      leftGlyph={leftGlyph ? <Icon glyph={leftGlyph} /> : undefined}
      onClick={event => console.log('onClick', event)}
      onChange={event => console.log('onChange', event)}
    />
  );
};

export const Basic = Template.bind({});
