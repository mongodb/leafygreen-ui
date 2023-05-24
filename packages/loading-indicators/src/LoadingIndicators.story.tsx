import React from 'react';
import { ComponentStory } from '@storybook/react';

import { Spinner } from '.';

export default {
  title: 'Components/LoadingIndicators',
};

const Template: ComponentStory<typeof Spinner> = props => (
  <Spinner {...props} />
);

export const Default = Template.bind({});
