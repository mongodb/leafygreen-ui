import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import Icon, { glyphs } from '@leafygreen-ui/icon';
import { storybookArgTypes, StoryMeta } from '@leafygreen-ui/lib';
import { Link } from '@leafygreen-ui/typography';

import Banner from './Banner/Banner';
import { BannerProps, Variant } from './Banner/types';

export default StoryMeta({
  title: 'Components/Banner',
  component: Banner,
  parameters: {
    default: 'WithLink',
    controls: {
      exclude: ['ref', 'className', 'onClose', 'image'],
    },
  },
  args: {
    children:
      'To avoid disrupting majority writes, new members are now added to replica sets as priority=0, votes=0 until they reach secondary state, after which Cloud Manager automatically updates the configuration to match the priority and votes value specified in the deployment.',
    darkMode: false,
    dismissible: false,
  },
  argTypes: {
    dismissible: {
      control: 'boolean',
    },
    variant: {
      options: Object.values(Variant),
      control: { type: 'select' },
      defaultValue: Variant.Info,
    },
    children: storybookArgTypes.children,
    darkMode: storybookArgTypes.darkMode,
  },
});

// eslint-disable-next-line react/prop-types
export const Basic: ComponentStory<typeof Banner> = ({ ...args }) => (
  <Banner {...args} />
);

export const WithIcon: ComponentStory<any> = ({
  glyph,
  ...args
}: BannerProps & { glyph: keyof typeof glyphs }) => (
  <Banner image={glyph ? <Icon glyph={glyph} /> : undefined} {...args} />
);
WithIcon.argTypes = {
  glyph: {
    options: Object.keys(glyphs),
    control: { type: 'select' },
    defaultValue: 'ActivityFeed',
  },
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
      <Link href="http://localhost:9001">Link component</Link>
      &nbsp;
      <a href="http://localhost:9001">Anchor tag</a>
    </Banner>
  );
};

export const WithCustomImage: ComponentStory<typeof Banner> = ({ ...args }) => (
  /// @ts-ignore
  <Banner image="copy" {...args} />
);
WithCustomImage.args = {
  variant: Variant.Info,
};
