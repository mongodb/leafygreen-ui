import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { LineChart } from './LineChart';
import { makeData } from './utils';

export default {
  title: 'Charts/LineChart',
  component: LineChart,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
  decorator: (Instance, context) => {
    return (
      <LeafyGreenProvider darkMode={context?.args.darkMode}>
        <Instance darkMode={context?.args.darkMode} />
      </LeafyGreenProvider>
    );
  },
};

const Template: StoryFn<typeof LineChart> = props => <LineChart {...props} />;

export const LiveExample: StoryFn<typeof LineChart> = Template.bind({});
LiveExample.args = {
  data: makeData(10),
};
