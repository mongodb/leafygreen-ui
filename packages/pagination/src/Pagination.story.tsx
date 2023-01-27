import React from 'react';
import { ComponentStory } from '@storybook/react';

import Pagination from '.';

export default {
  title: 'Components/Pagination',
  component: Pagination,
};

const Template: ComponentStory<typeof Pagination> = props => (
  <Pagination {...props} />
);

export const Basic = Template.bind({});
