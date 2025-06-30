import React from 'react';
import { StoryFn } from '@storybook/react';

import { RichLink } from '.';

export default {
  title: 'Chat/RichLink',
  component: RichLink,
};

const Template: StoryFn<typeof RichLink> = props => (
  <div style={{ width: '250px', display: 'flex' }}>
    <RichLink {...props} />
  </div>
);

export const Basic = Template.bind({});
Basic.args = {
  href: 'javascript:;',
  children: 'Introduction to MongoDB',
  badgeGlyph: 'Database',
  badgeLabel: 'Database',
  badgeColor: 'green',
};

export const LongText = Template.bind({});
LongText.args = {
  href: 'javascript:;',
  children:
    'Introduction to MongoDB - a full course that covers everything you need to know about MongoDB',
};

export const ArticleVariant = Template.bind({});
ArticleVariant.args = {
  href: 'https://www.mongodb.com/developer/products/atlas/haystack-ai-mongodb-atlas-vector-demo/',
  children: 'Building RAG Pipelines With Haystack and MongoDB Atlas',
  variant: 'Article',
};

export const DocsVariant = Template.bind({});
DocsVariant.args = {
  href: 'https://www.mongodb.com/docs/atlas/create-connect-deployments/',
  children: 'Create and Connect to Database Deployments',
  variant: 'Docs',
};

export const VideoVariant = Template.bind({});
VideoVariant.args = {
  href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  children: 'Never Gonna Give You Up - Rick Astley (Official Music Video)',
  variant: 'Video',
  imageUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
};

export const WebsiteVariant = Template.bind({});
WebsiteVariant.args = {
  href: 'https://www.mongodb.com/products/platform/atlas-vector-search',
  children: 'MongoDB Atlas Vector Search',
  variant: 'Website',
};

export const CodeVariant = Template.bind({});
CodeVariant.args = {
  href: 'https://github.com/mongodb-developer/nodejs-quickstart',
  children: 'Quick Start: Node.js and MongoDB',
  variant: 'Code',
};

export const BlogVariant = Template.bind({});
BlogVariant.args = {
  href: 'https://www.mongodb.com/developer/products/atlas/harnessing-natural-language-mongodb-queries-google-gemini/',
  children:
    'Harnessing Natural Language for MongoDB Queries with Google Gemini',
  variant: 'Blog',
};

export const LearnVariant = Template.bind({});
LearnVariant.args = {
  href: 'https://learn.mongodb.com/learn/course/intro-to-atlas-device-sync/learning-byte/learn',
  children: 'Intro to Atlas Device Sync',
  variant: 'Learn',
};

export const UnknownVariant = Template.bind({});
UnknownVariant.args = {
  href: 'https://example.com',
  children: 'Example Link (variant unknown)',
  variant: 'NotARealVariant',
};

export const ExplicitlyUndefinedVariant = Template.bind({});
ExplicitlyUndefinedVariant.args = {
  href: 'https://example.com',
  children: 'Example Link (variant undefined)',
  variant: undefined,
};
