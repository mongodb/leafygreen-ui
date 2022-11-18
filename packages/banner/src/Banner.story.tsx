import React from 'react';
import Icon, { glyphs } from '@leafygreen-ui/icon';
import { Variant } from './types';
import Banner from './Banner';
import { ComponentStory, Meta } from '@storybook/react';
import { storybookArgTypes } from '@leafygreen-ui/lib';
import { Link } from '@leafygreen-ui/typography';

export default {
  title: 'Components/Banner',
  component: Banner,
  parameters: {
    controls: {
      exclude: ['ref', 'className', 'onClose'],
    },
  },
  args: {
    children:
      'To avoid disrupting majority writes, new members are now added to replica sets as priority=0, votes=0 until they reach secondary state, after which Cloud Manager automatically updates the configuration to match the priority and votes value specified in the deployment.',
    darkMode: false,
    dismissible: false,
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
    darkMode: storybookArgTypes.darkMode,
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

export const WithLink: ComponentStory<typeof Banner> = ({
  // eslint-disable-next-line react/prop-types
  image,
  // eslint-disable-next-line react/prop-types
  children,
  ...args
}) => {
  return (
    <Banner
      // @ts-expect-error
      image={image ? <Icon glyph={image} /> : undefined}
      {...args}
    >
      {children}
      &nbsp;
      <Link href="http://localhost:9001">Link style</Link>
      &nbsp;
      <a href="http://localhost:9001">Regular link</a>
    </Banner>
  );
};

export const WithCustomImage = Template.bind({});
WithCustomImage.args = {
  variant: Variant.Info,
  /// @ts-ignore
  image: 'Copy',
};
