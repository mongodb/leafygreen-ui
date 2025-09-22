import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { MessagePromotion, MessagePromotionProps } from '.';

const meta: StoryMetaType<typeof MessagePromotion> = {
  title: 'Composition/Chat/MessagePromotion',
  component: MessagePromotion,
  args: {
    baseFontSize: 13,
  },
  parameters: {
    default: 'WithPromotionTextAndUrl',
  },
};

export default meta;

const Template: StoryFn<MessagePromotionProps> = (props) => (
  React.createElement(MessagePromotion, props)
);

export const WithPromotionTextAndUrl = {
  render: Template,
  args: {
    promotionText: 'Challenge your knowledge by earning the Advanced Schema Design skill! ',
    promotionUrl: 'https://learn.mongodb.com/courses/advanced-schema-patterns-and-antipatterns',
    // eslint-disable-next-line no-console
    onPromotionClick: () => console.log('Promotion clicked'),
  },
};

export const WithPromotionTextOnly = {
  render: Template,
  args: {
    promotionText: 'Challenge your knowledge by earning the Advanced Schema Design skill! ',
  },
};

export const WithLongPromotionTextAndUrl = {
  render: Template,
  args: {
    promotionText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    promotionUrl: 'https://learn.mongodb.com/skills',
    // eslint-disable-next-line no-console
    onPromotionClick: () => console.log('Promotion clicked'),
  },
};