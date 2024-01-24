import React from 'react';
import { StoryFn } from '@storybook/react';

import { Descendants } from '.';

const DescendantsDemo = () => {
  return <></>;
};

export default {
  title: 'Components/Descendants',
  component: DescendantsDemo,
};

const Template: StoryFn<typeof Descendants> = (props: any) => (
  <DescendantsDemo {...props} />
);

export const Basic = Template.bind({});
