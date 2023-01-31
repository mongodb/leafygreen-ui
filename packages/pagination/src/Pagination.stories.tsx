import React, { useState } from 'react';
import { ComponentStory } from '@storybook/react';

import { storybookArgTypes } from '@leafygreen-ui/lib';

import Pagination, { PaginationProps } from '.';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  args: {
    onCurrentPageOptionChange: undefined,
  },
  argTypes: {
    currentPage: { control: 'number' },
    numTotalItems: { control: 'number' },
    itemsPerPage: { control: 'none' },
    ref: { control: 'none' },
    darkMode: storybookArgTypes.darkMode,
  },
};

const Template: ComponentStory<typeof Pagination> = props => (
  <div style={{ width: '700px' }}>
    <Pagination {...props} />
  </div>
);

export const Test: ComponentStory<typeof Pagination> = args => {
  return <Template {...args} />;
};

export const Basic: ComponentStory<typeof Pagination> = args => {
  const [currentPage, setCurrentPage] = useState<number>(1);
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
    <Template
      {...args}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      onItemsPerPageOptionChange={handleItemsPerPageOptionChange}
      onForwardArrowClick={handleForwardArrowClick}
      onBackArrowClick={handleBackArrowClick}
    />
  );
};
Basic.args = {
  numTotalItems: 1021,
  itemsPerPageOptions: [10, 50, 100],
};

export const WithCurrentPageOptions: ComponentStory<
  typeof Pagination
> = args => {
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
    <Template
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
