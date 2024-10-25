import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { makeLineData } from './utils';
import { Chart } from './Chart';
import { Line } from './Line';

export default {
  title: 'Charts/Core',
  component: Chart,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    data: {
      control: {
        type: 'object',
      },
    },
  },
  decorator: (Instance, context) => {
    return <Instance darkMode={context?.args.darkMode} />;
  },
};

const Template: StoryFn = props => {
  return (
    <Chart {...props}>
      {props.data.map(({ name, data }) => (
        <Line name={name} data={data} key={name} />
      ))}
    </Chart>
  );
};

export const LiveExample: StoryFn = Template.bind({});
LiveExample.args = {
  data: makeLineData(10),
};
