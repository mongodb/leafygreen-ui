/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import Icon, { glyphs } from '@leafygreen-ui/icon';
import { Link } from '@leafygreen-ui/typography';

import Banner, { BannerProps, Variant } from '.';

const meta: StoryMetaType<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        image: [
          undefined,
          <Icon glyph={'Visibility'} />,
          <img src="favicon.ico" />,
        ],
        variant: Object.values(Variant),
        dismissible: [false, true],
      },
    },
    controls: {
      exclude: [...storybookExcludedControlParams, 'image'],
    },
  },
  args: {
    children: (
      <>
        To avoid disrupting majority writes, new members are now added to
        replica sets as priority=0, votes=0 until they reach secondary state,
        after which Cloud Manager automatically updates the configuration to
        match the priority and votes value specified in the deployment. &nbsp;
        <a href="https://mongodb.com">Anchor tag</a>&nbsp;
        <Link>Link Component</Link>
      </>
    ),
    darkMode: false,
    dismissible: false,
  },
  argTypes: {
    children: storybookArgTypes.children,
    darkMode: storybookArgTypes.darkMode,
    dismissible: {
      control: 'boolean',
    },
    variant: {
      options: Object.values(Variant),
      control: { type: 'select' },
      defaultValue: Variant.Info,
    },
    glyph: {
      options: [undefined, ...Object.keys(glyphs)],
      control: { type: 'select' },
    },
  },
};
export default meta;

type StoryProps = BannerProps & { glyph: keyof typeof glyphs };

export const LiveExample: StoryFn<StoryProps> = ({ glyph, ...args }) => (
  <Banner image={glyph ? <Icon glyph={glyph} /> : undefined} {...args} />
);
LiveExample.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Generated = () => {};
