
import React from 'react';
import { ComponentStory } from '@storybook/react';

import {TsTest} from '.';

export default {
  title: 'Components/TsTest',
  component: TsTest,
}

const Template: ComponentStory<typeof TsTest> = (props) => (
  <TsTest {...props} />
);

export const Basic = Template.bind({});

