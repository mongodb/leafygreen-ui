/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
import React from 'react';
import { StoryFn } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import Icon, { glyphs } from '@leafygreen-ui/icon';
import { storybookArgTypes, StoryMetaType } from '@leafygreen-ui/lib';
import { Link } from '@leafygreen-ui/typography';

import Banner, { BannerProps, Variant } from '.';

const meta: StoryMetaType<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
  decorators: [
    StoryFn => (
      <div
        className={css`
          max-width: 256px;
        `}
      >
        <StoryFn />
      </div>
    ),
  ],
  parameters: {
    default: 'WithLink',
    controls: {
      exclude: ['image'],
    },
    generate: {
      variant: Object.values(Variant),
      image: [
        undefined,
        <Icon glyph={'Visibility'} />,
        <img src="favicon.ico" />,
      ],
      dismissible: [false, true],
      darkMode: [false, true],
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
  },
};
export default meta;

// eslint-disable-next-line react/prop-types
export const Basic: StoryFn<typeof Banner> = ({ ...args }) => (
  <Banner {...args} />
);

export const WithIcon: StoryFn<any> = ({
  glyph,
  ...args
}: BannerProps & { glyph: keyof typeof glyphs }) => (
  <Banner image={glyph ? <Icon glyph={glyph} /> : undefined} {...args} />
);
WithIcon.argTypes = {
  glyph: {
    options: Object.keys(glyphs),
    control: { type: 'select' },
  },
};
WithIcon.args = {
  glyph: 'ActivityFeed',
};

export const WithLink: StoryFn<typeof Banner> = ({
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

export const WithCustomImage: StoryFn<typeof Banner> = ({ ...args }) => (
  <Banner image={<img src="favicon.ico" alt="logo" />} {...args} />
);
WithCustomImage.args = {
  variant: Variant.Info,
};
WithCustomImage.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Generated = () => {};
