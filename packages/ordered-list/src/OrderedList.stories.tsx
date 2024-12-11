import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import { Link } from '@leafygreen-ui/typography';

import { ListItem, OrderedList } from '.';

export const Basic = (args: { darkMode?: boolean }) => {
  return (
    <OrderedList {...args}>
      <ListItem
        title="Title"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna."
      />
      <ListItem
        title="Title"
        description={
          <>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna.{' '}
            <Link>Learn more.</Link>
          </>
        }
      />
      <ListItem
        title="Title"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna."
      />
    </OrderedList>
  );
};

const meta: StoryMetaType<typeof OrderedList> = {
  title: 'Components/OrderedList',
  component: OrderedList,
  parameters: {
    default: 'Basic',
    generate: {
      combineArgs: {
        darkMode: [false, true],
      },
    },
  },
  args: {
    darkMode: false,
  },
};
export default meta;

export const Generated = () => <></>;
