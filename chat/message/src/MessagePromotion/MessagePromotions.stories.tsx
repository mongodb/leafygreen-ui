import React from 'react';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

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
          'Challenge your knowledge and earn the Schema Design badge!',
          'Challenge your knowledge by earning the Advanced Schema Design skill! This is a really really really really really really really really really long copy text to test how the component handles multiline text content.',
        ],
        promotionUrl: ['https://learn.mongodb.com/skills'],
        className: [
          css`
            box-sizing: content-box;
            gap: 20px;
            & div {
              background-color: ${palette.blue.dark2};
              border-color: white;
              color: ${palette.blue.light2};
            }
          `,
          undefined,
        ],
      },
    },
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
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
    onPromotionLinkClick: () => console.log('Promotion clicked'),
  },
};

export const Generated = () => {};
