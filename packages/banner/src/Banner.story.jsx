import React from 'react';
import Icon, { glyphs } from '@leafygreen-ui/icon';
import Banner, { Variant } from '.';

export default {
  title: 'Packages/Banner',
  component: Banner,
  args: {
    text: 'To avoid disrupting majority writes, new members are now added to replica sets as priority=0, votes=0 until they reach secondary state, after which Cloud Manager automatically updates the configuration to match the priority and votes value specified in the deployment.',
  },
  argTypes: {
    image: {
      options: Object.keys(glyphs),
      control: { type: 'select' },
    }
  },
  parameters: { 
    controls: { 
      exclude: ['children', 'onClose', 'ref'] 
    }
  }
};

const Template = ({ text, image, ...args }) => (
  <Banner image={image ? <Icon glyph={image} /> : undefined} {...args}>{text}</Banner>
);

export const Success = Template.bind({})
Success.args = {
  variant: Variant.Success,
};

export const Warning = Template.bind({})
Warning.args = {
  variant: Variant.Warning,
};

export const Danger = Template.bind({})
Danger.args = {
  variant: Variant.Danger,
};

export const Info = Template.bind({})
Info.args = {
  variant: Variant.Info,
};

export const WithCustomImage = Template.bind({})
WithCustomImage.args = { 
  variant: Variant.Info,
  image: 'Copy',
};