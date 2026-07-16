import React, { useState } from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  type StoryMetaType,
  type StoryType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import PageSize from './Pagination/PageSize';
import {
  NavigationProps,
  type PageSizeProps,
  Pagination,
  PaginationNavigation,
  PaginationPageSize,
  type PaginationProps,
  PaginationSummary,
  type SummaryProps,
} from '.';

const fn = () => {};

const meta: StoryMetaType<typeof Pagination> = {
  title: 'Composition/Data Display/Pagination',
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
      storyNames: ['FixedItemsPerPage', 'VariableItemsPerPage'],
      combineArgs: {
        darkMode: [false, true],
        // 0 covers the empty state ("0 - 0 of 0 items" / "0 of 0"); 5 covers
        // the case when numTotalItems < itemsPerPage.
        numTotalItems: [undefined, 0, 5, 150],
        // `undefined` is omitted: currentPage defaults to 1, so it would be
        // visually identical to currentPage: 1.
        currentPage: [1, 5, 10],
        shouldDisableBackArrow: [false, true],
        shouldDisableForwardArrow: [false, true],
        onCurrentPageOptionChange: [undefined, fn],
      },
      excludeCombinations: [
        {
          numTotalItems: undefined,
          onCurrentPageOptionChange: fn,
        },
        // The empty state renders "0 of 0" regardless of currentPage, so
        // snapshot it once (at currentPage: 1) rather than across every page.
        {
          numTotalItems: 0,
          currentPage: [5, 10],
        },
        // A single page of results (numTotalItems < itemsPerPage) has no
        // page 5 or 10, so those currentPage values are invalid here.
        {
          numTotalItems: 5,
          currentPage: [5, 10],
        },
      ],

      decorator: Instance => (
        <div style={{ width: '500px' }}>
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

export const LiveExample: StoryType<typeof Pagination> = args => {
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
LiveExample.parameters = {
  chromatic: { disableSnapshot: true },
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
WithCurrentPageOptions.parameters = {
  chromatic: { disableSnapshot: true },
};
WithCurrentPageOptions.args = {
  numTotalItems: 1021,
  itemsPerPageOptions: [10, 50, 100],
};

export const FixedItemsPerPage: StoryType<typeof Pagination> = () => <></>;
FixedItemsPerPage.parameters = {
  generate: {
    args: {
      onItemsPerPageOptionChange: undefined,
    },
  },
};

export const VariableItemsPerPage: StoryType<typeof Pagination> = () => <></>;
VariableItemsPerPage.parameters = {
  generate: {
    args: {
      onItemsPerPageOptionChange: fn,
    },
  },
};

export const PaginationItemsPerPageLiveExample: StoryFn<
  PageSizeProps
> = args => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    args.itemsPerPageOptions ? args.itemsPerPageOptions[0] : 10,
  );

  const handleItemsPerPageOptionChange: PageSizeProps['onItemsPerPageOptionChange'] =
    (value, _) => {
      setItemsPerPage(Number(value));
    };

  return (
    <PageSize
      {...args}
      itemsPerPage={itemsPerPage}
      onItemsPerPageOptionChange={handleItemsPerPageOptionChange}
    />
  );
};
PaginationItemsPerPageLiveExample.args = {
  itemsPerPageOptions: [10, 25, 50],
  itemsPerPage: 10,
  onItemsPerPageOptionChange: fn,
};

export const PaginationSummaryLiveExample: StoryFn<SummaryProps> = args => {
  return <PaginationSummary {...args} />;
};
PaginationSummaryLiveExample.args = {
  itemsPerPage: 10,
  currentPage: 1,
  numTotalItems: 100,
};

export const PaginationNavigationLiveExample: StoryFn<
  NavigationProps
> = args => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleCurrentPageOptionChange: NavigationProps['onCurrentPageOptionChange'] =
    (value, _) => {
      setCurrentPage(Number(value));
    };

  const handleBackArrowClick = () => {
    setCurrentPage(cp => Math.max(cp - 1, 1));
  };

  const handleForwardArrowClick = () => {
    setCurrentPage(cp => cp + 1);
  };

  return (
    <PaginationNavigation
      {...args}
      currentPage={currentPage}
      onCurrentPageOptionChange={handleCurrentPageOptionChange}
      onBackArrowClick={handleBackArrowClick}
      onForwardArrowClick={handleForwardArrowClick}
    />
  );
};

PaginationNavigationLiveExample.args = {
  currentPage: 1,
  numTotalItems: 100,
  itemsPerPage: 10,
  onCurrentPageOptionChange: fn,
};

PaginationNavigationLiveExample.parameters = {
  chromatic: { disableSnapshot: true },
};

export const PaginationPageSizeLiveExample: StoryFn<PageSizeProps> = args => {
  return <PaginationPageSize {...args} />;
};

PaginationPageSizeLiveExample.args = {
  itemsPerPageOptions: [10, 25, 50],
  itemsPerPage: 10,
  onItemsPerPageOptionChange: fn,
};

PaginationPageSizeLiveExample.parameters = {
  chromatic: { disableSnapshot: true },
};
