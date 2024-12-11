import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { Link } from '@leafygreen-ui/typography';

import { OrderedList, OrderedListItem } from '.';

export const LiveExample = (args: { darkMode?: boolean }) => {
  return (
    <OrderedList {...args}>
      <OrderedListItem
        title="Title"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna."
      />
      <OrderedListItem
        title="Title"
        description={
          <>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna.{' '}
            <Link>Learn more.</Link>
          </>
        }
      />
      <OrderedListItem
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
    default: 'LiveExample',
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
