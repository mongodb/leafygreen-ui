import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { MessagePromotion, MessagePromotionProps } from '.';

const meta: StoryMetaType<typeof MessagePromotion> = {
  title: 'Composition/Chat/MessagePromotion',
  component: MessagePromotion,
  parameters: {
    default: 'WithPromotionTextAndUrl',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        promotionText: [
          'Challenge your knowledge by earning the Advanced Schema Design skill!',
          'Challenge your knowledge by earning the Advanced Schema Design skill! This is a really really really really really really really really really really really really really really really really really  really really really really really really really really long copy text to test how the component handles long text content.',
        ],
        promotionUrl: ['https://learn.mongodb.com/skills'],
      },
    },
  },
};

export default meta;

const Template: StoryFn<MessagePromotionProps> = props =>
  React.createElement(MessagePromotion, props);

export const LiveExample = {
  render: Template,
  args: {
    promotionText:
      'Challenge your knowledge by earning the Advanced Schema Design skill!',
    promotionUrl:
      'https://learn.mongodb.com/courses/advanced-schema-patterns-and-antipatterns',
    // eslint-disable-next-line no-console
    onPromotionClick: () => console.log('Promotion clicked'),
  },
};

export const Generated = () => {};
