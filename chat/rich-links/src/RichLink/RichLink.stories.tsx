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
  url: 'javascript:;',
  text: 'Introduction to MongoDB',
  badgeGlyph: 'Database',
  badgeLabel: 'Database',
  badgeVariant: 'green',
};

export const LongText = Template.bind({});
LongText.args = {
  url: 'javascript:;',
  text: 'Introduction to MongoDB - a full course that covers everything you need to know about MongoDB',
};

export const DocsVariant = Template.bind({});
DocsVariant.args = {
  url: 'https://www.mongodb.com/docs/atlas/create-connect-deployments/',
  text: 'Create and Connect to Database Deployments',
  variant: 'Docs',
};

export const VideoVariant = Template.bind({});
VideoVariant.args = {
  url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  text: 'Never Gonna Give You Up - Rick Astley (Official Music Video)',
  variant: 'Video',
  imageUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
};

export const WebsiteVariant = Template.bind({});
WebsiteVariant.args = {
  url: 'https://www.mongodb.com/products/platform/atlas-vector-search',
  text: 'MongoDB Atlas Vector Search',
  variant: 'Website',
};

export const CodeVariant = Template.bind({});
CodeVariant.args = {
  url: 'https://github.com/mongodb-developer/nodejs-quickstart',
  text: 'Quick Start: Node.js and MongoDB',
  variant: 'Code',
};

export const BlogVariant = Template.bind({});
BlogVariant.args = {
  url: 'https://www.mongodb.com/developer/products/atlas/harnessing-natural-language-mongodb-queries-google-gemini/',
  text: 'Harnessing Natural Language for MongoDB Queries with Google Gemini',
  variant: 'Blog',
};

export const LearnVariant = Template.bind({});
LearnVariant.args = {
  url: 'https://learn.mongodb.com/learn/course/intro-to-atlas-device-sync/learning-byte/learn',
  text: 'Intro to Atlas Device Sync',
  variant: 'Learn',
};
