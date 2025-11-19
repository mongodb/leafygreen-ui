
import React from 'react';
import { StoryFn } from '@storybook/react';

import { DeleteWizard } from '.';

export default {
  title: 'Components/DeleteWizard',
  component: DeleteWizard,
}

const Template: StoryFn<typeof DeleteWizard> = (props) => (
  <DeleteWizard {...props} />
);

export const Basic = Template.bind({});

