import React from 'react';
import Icon, { glyphs } from '@leafygreen-ui/icon';
import Banner, { Variant } from '.';
import { ComponentStory, Meta } from '@storybook/react';
import { storybookArgTypes } from '@leafygreen-ui/lib/';;

export default {
  title: 'Components/Banner',
  component: Banner,
  args: {
    children:
      'To avoid disrupting majority writes, new members are now added to replica sets as priority=0, votes=0 until they reach secondary state, after which Cloud Manager automatically updates the configuration to match the priority and votes value specified in the deployment.',
  },
  argTypes: {
    image: {
      options: Object.keys(glyphs),
      control: { type: 'select' },
    },
    dismissible: {
      control: 'boolean',
    },
    onClose: {
      control: 'none',
    },
    children: storybookArgTypes.children,
    ref: storybookArgTypes.ref,
  },
} as Meta<typeof Banner>;

// eslint-disable-next-line react/prop-types
const Template: ComponentStory<typeof Banner> = ({ image, ...args }) => (
  <Banner
    // @ts-expect-error
    image={image ? <Icon glyph={image} /> : undefined}
    {...args}
  />
);

export const Success = Template.bind({});
Success.args = {
  variant: Variant.Success,
};

export const Warning = Template.bind({});
Warning.args = {
  variant: Variant.Warning,
};

export const Danger = Template.bind({});
Danger.args = {
  variant: Variant.Danger,
};

export const Info = Template.bind({});
Info.args = {
  variant: Variant.Info,
};

export const WithCustomImage = Template.bind({});
WithCustomImage.args = {
  variant: Variant.Info,
  // @ts-expect-error
  image: 'Copy',
};
