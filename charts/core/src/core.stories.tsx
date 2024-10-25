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

const Template: StoryFn<typeof Chart> = props => {
  const data = makeLineData(10);
  return (
    <Chart {...props}>
      {data.map(({ name, data }) => (
        <Line name={name} data={data} key={name} />
      ))}
    </Chart>
  );
};

export const LiveExample: StoryFn<typeof Chart> = Template.bind({});
LiveExample.args = {};
