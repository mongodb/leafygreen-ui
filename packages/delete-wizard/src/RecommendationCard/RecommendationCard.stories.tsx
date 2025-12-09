import React from 'react';
import { StoryObj } from '@storybook/react';

import { Link } from '@leafygreen-ui/typography';

import { RecommendationCard } from './RecommendationCard';

export default {
  title: 'Templates/DeleteWizard/RecommendationCard',
  component: RecommendationCard,
  args: {
    category: 'Things',
    title: 'Do a thing',
    description: 'Before deleting, you need to do a thing.',
    link: <Link href="https://mongodb.design">mongodb.design</Link>,
  },
};

export const LiveExample: StoryObj<typeof RecommendationCard> = {
  render: args => <RecommendationCard {...args} />,
};
