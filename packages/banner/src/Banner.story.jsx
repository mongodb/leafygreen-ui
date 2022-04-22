import React from 'react';
import Icon, { glyphs } from '@leafygreen-ui/icon';
import Banner from '.';

export default {
  title: 'Packages/Banner',
  component: Banner,
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

export const Basic = Template.bind({})
Basic.parameters = { controls: { exclude: ['children', 'onClose', 'ref'] }}
Basic.args = { 
  text: 'To avoid disrupting majority writes, new members are now added to replica sets as priority=0, votes=0 until they reach secondary state, after which Cloud Manager automatically updates the configuration to match the priority and votes value specified in the deployment.' 
};

export const WithCustomImage = Template.bind({})
WithCustomImage.parameters = { controls: { exclude: ['children', 'onClose', 'ref'] }}
WithCustomImage.args = { 
  image: 'Copy',
  text: 'To avoid disrupting majority writes, new members are now added to replica sets as priority=0, votes=0 until they reach secondary state, after which Cloud Manager automatically updates the configuration to match the priority and votes value specified in the deployment.',
};