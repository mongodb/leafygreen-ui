import React from 'react';
import { faker } from '@faker-js/faker';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { defaultLoadingDescription } from './constants';
import { ReviewCard } from './ReviewCard';
import { ReviewState } from './ReviewCard.types';
import { ReviewCardTitleWithCountEmphasis } from './utils';

faker.seed(0);

export default {
  title: 'Templates/DeleteWizard/ReviewCard',
  component: ReviewCard,
  parameters: {
    default: 'LiveExample',
  },
  argTypes: {
    title: {
      control: 'text',
    },
    loadingTitle: {
      control: 'text',
    },
    state: {
      control: 'select',
      options: Object.values(ReviewState),
    },
  },
  args: {
    state: ReviewState.Review,
    title: (
      <ReviewCardTitleWithCountEmphasis
        verb="Terminate"
        count={6}
        resource="clusters"
      />
    ),
    description: 'Completing this action will terminate all clusters',
    errorTitle: 'Error loading clusters',
    errorDescription: 'Could not fetch clusters. Please try again later',
    loadingTitle: 'Loading cluster data',
    loadingDescription: defaultLoadingDescription,
    completedTitle: 'No clusters detected',
    completedDescription: 'Required action complete',
    children: faker.lorem.paragraphs(4),
  },
} satisfies StoryMetaType<typeof ReviewCard>;

export const LiveExample: StoryObj<typeof ReviewCard> = {
  render: ({ children, ...args }) => (
    <ReviewCard {...args}>
      <div
        className={css`
          padding: 16px 24px;
        `}
      >
        {children}
      </div>
    </ReviewCard>
  ),
};

export const Review: StoryObj<typeof ReviewCard> = {
  parameters: {
    controls: {
      exclude: [
        'state',
        'errorTitle',
        'errorDescription',
        'loadingTitle',
        'loadingDescription',
        'completedTitle',
        'completedDescription',
      ],
    },
  },
  args: {
    state: ReviewState.Review,
  },
  render: LiveExample.render,
};

export const ReviewDarkMode: StoryObj<typeof ReviewCard> = {
  parameters: {
    controls: {
      exclude: [
        'state',
        'errorTitle',
        'errorDescription',
        'loadingTitle',
        'loadingDescription',
        'completedTitle',
        'completedDescription',
      ],
    },
  },
  args: {
    darkMode: true,
    state: ReviewState.Review,
  },
  render: args => (
    <LeafyGreenProvider darkMode>
      <ReviewCard {...args}></ReviewCard>
    </LeafyGreenProvider>
  ),
};

export const Loading: StoryObj<typeof ReviewCard> = {
  parameters: {
    controls: {
      exclude: [
        'state',
        'title',
        'description',
        'errorTitle',
        'errorDescription',
        'completedTitle',
        'completedDescription',
      ],
    },
  },
  args: {
    state: ReviewState.Loading,
  },
  render: LiveExample.render,
};

export const Complete: StoryObj<typeof ReviewCard> = {
  parameters: {
    controls: {
      exclude: [
        'state',
        'title',
        'description',
        'errorTitle',
        'errorDescription',
        'loadingTitle',
        'loadingDescription',
      ],
    },
  },
  args: {
    state: ReviewState.Complete,
  },
  render: LiveExample.render,
};

export const Error: StoryObj<typeof ReviewCard> = {
  parameters: {
    controls: {
      exclude: [
        'state',
        'title',
        'description',
        'completedTitle',
        'completedDescription',
        'loadingTitle',
        'loadingDescription',
      ],
    },
  },
  args: {
    state: ReviewState.Error,
  },
  render: LiveExample.render,
};
