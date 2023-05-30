import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';

import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@leafygreen-ui/lib';

import Pagination, { PaginationProps } from '.';

const fn = () => {};

const meta: StoryMetaType<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  decorators: [
    Story => (
      <div style={{ width: '700px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'currentPage',
        'itemsPerPage',
        'onBackArrowClick',
        'onForwardArrowClick',
        'onCurrentPageOptionChange',
        'onItemsPerPageOptionChange',
      ],
    },
    generate: {
      props: {
        darkMode: [false, true],
        numTotalItems: [undefined, 1000],
        currentPage: [undefined, 5],
        shouldDisableBackArrow: [false, true],
        shouldDisableForwardArrow: [false, true],
        onCurrentPageOptionChange: [undefined, fn],
        onItemsPerPageOptionChange: [undefined, fn],
      },
      excludeCombinations: [
        {
          numTotalItems: undefined,
          onCurrentPageOptionChange: fn,
        },
        {
          currentPage: undefined,
          onCurrentPageOptionChange: fn,
        },
      ],
      // eslint-disable-next-line react/display-name
      decorator: Instance => (
        <div style={{ width: '700px' }}>
          <Instance />
        </div>
      ),
    },
  },
  args: {
    onCurrentPageOptionChange: undefined,
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    numTotalItems: { control: 'number' },
  },
};
export default meta;

export const Default: StoryFn<PaginationProps> = props => (
  <Pagination {...props} />
);

export const LiveExample: StoryFn<PaginationProps> = args => {
  const [currentPage, setCurrentPage] = useState<number>(args.currentPage ?? 1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    args.itemsPerPageOptions ? args.itemsPerPageOptions[0] : 10,
  );

  const handleItemsPerPageOptionChange: PaginationProps['onItemsPerPageOptionChange'] =
    (value, _) => {
      setItemsPerPage(Number(value));
    };

  const handleBackArrowClick = () => {
    setCurrentPage(cp => Math.max(cp - 1, 1));
  };

  const handleForwardArrowClick = () => {
    setCurrentPage(cp => cp + 1);
  };

  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      onItemsPerPageOptionChange={handleItemsPerPageOptionChange}
      onForwardArrowClick={handleForwardArrowClick}
      onBackArrowClick={handleBackArrowClick}
    />
  );
};
LiveExample.args = {
  numTotalItems: 1021,
  itemsPerPageOptions: [10, 50, 100],
};

export const WithCurrentPageOptions: StoryFn<PaginationProps> = args => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    args.itemsPerPageOptions ? args.itemsPerPageOptions[0] : 10,
  );

  const handleItemsPerPageOptionChange: PaginationProps['onItemsPerPageOptionChange'] =
    (value, _) => {
      setItemsPerPage(Number(value));
    };

  const handleBackArrowClick = () => {
    setCurrentPage(cp => Math.max(cp - 1, 0));
  };

  const handleForwardArrowClick = () => {
    setCurrentPage(cp => cp + 1);
  };

  const handleCurrentPageChange: PaginationProps['onCurrentPageOptionChange'] =
    (value, _) => {
      setCurrentPage(Number(value));
    };

  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      onCurrentPageOptionChange={handleCurrentPageChange}
      itemsPerPage={itemsPerPage}
      onItemsPerPageOptionChange={handleItemsPerPageOptionChange}
      onForwardArrowClick={handleForwardArrowClick}
      onBackArrowClick={handleBackArrowClick}
    />
  );
};

WithCurrentPageOptions.args = {
  numTotalItems: 1021,
  itemsPerPageOptions: [10, 50, 100],
};

export const Generated = () => {};
