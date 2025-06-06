import React from 'react';
import {
  renderAsyncTest,
  type RenderAsyncTestReturnType,
} from '@lg-tools/test-harnesses';
import { render, type RenderResult } from '@testing-library/react';

import ExpandableCard from '../ExpandableCard';

export const DEFAULT_LGID_ROOT = 'lg-expandable_card';

export const defaultProps = {
  title: 'Card Title',
  description: 'Card Description',
  flagText: 'optional',
  children: 'Lorem ipsum dolor sit amet',
} as const;

export const getLgIds = (root: `lg-${string}` = DEFAULT_LGID_ROOT) => {
  return {
    root,
    toggle: `${root}-toggle`,
  } as const;
};

export const renderAsyncExpandableCard = (): RenderAsyncTestReturnType => {
  return renderAsyncTest(
    <ExpandableCard {...defaultProps}>{defaultProps.children}</ExpandableCard>,
    render,
  );
};

export const renderExpandableCard = (props = {}): RenderResult => {
  const renderUtils = render(
    <ExpandableCard {...defaultProps} {...props}>
      {defaultProps.children}
    </ExpandableCard>,
  );

  return {
    ...renderUtils,
  };
};

export const renderMultipleExpandableCards = (): RenderResult => {
  const renderUtils = render(
    <>
      <ExpandableCard {...defaultProps} data-lgid="lg-expandable_card-1">
        {defaultProps.children} 1
      </ExpandableCard>
      <ExpandableCard
        {...defaultProps}
        data-lgid="lg-expandable_card-2"
        title="Card 2 Title"
        defaultOpen={true}
      >
        {defaultProps.children} 2
      </ExpandableCard>
    </>,
  );

  return {
    ...renderUtils,
  };
};
