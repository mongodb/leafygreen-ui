import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import { Link } from '@leafygreen-ui/typography';

import { OrderedListProps } from '../OrderedList.types';

import { OrderedList, OrderedListItem } from '.';

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
    children: (
      <>
        {' '}
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
      </>
    ),
    darkMode: false,
  },
};
export default meta;

export const LiveExample = (args: OrderedListProps) => {
  return <OrderedList {...args}></OrderedList>;
};
LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const Generated = () => <></>;
