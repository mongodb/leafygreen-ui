import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { faker } from '@faker-js/faker';

import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import { DrawerToolbarLayoutProps } from './DrawerToolbarLayout.types';

const SEED = 0;
faker.seed(SEED);

/**
 * Returns the long content
 * @returns The long content
 */
export const LongContent = () => {
  const paragraphs = useMemo(() => {
    faker.seed(SEED);
    return faker.lorem
      .paragraphs(30, '\n')
      .split('\n')
      .map((p, i) => <Body key={i}>{p}</Body>);
  }, []);

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        gap: ${spacing[100]}px;
      `}
    >
      {paragraphs}
    </div>
  );
};

/**
 * Returns the drawer content
 * @returns The drawer content
 */
export const DrawerContent = () => {
  // Generate a unique seed based on timestamp for different content each time
  React.useEffect(() => {
    faker.seed(Date.now());
  }, []);

  // Generate paragraphs without memoization so they're different each render
  const paragraphs = faker.lorem
    .paragraphs(30, '\n')
    .split('\n')
    .map((p, i) => <Body key={i}>{p}</Body>);

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        gap: ${spacing[100]}px;
      `}
    >
      {paragraphs}
    </div>
  );
};

/**
 * Returns the toolbar data based on the provided parameters
 * @param hasToolbarData - Whether the toolbar data should be visible
 * @param hasStaticContent - Whether the content should be static
 * @param hasHiddenToolbarItem - Whether the toolbar item should be hidden
 * @param hasRemovedToolbarItem - Whether the toolbar item should be removed from the
 * @returns The toolbar data
 */
export const getDrawerToolbarData = ({
  hasToolbarData = true,
  hasStaticContent = false,
  hasHiddenToolbarItem = false,
  hasRemovedToolbarItem = false,
}: {
  hasToolbarData?: boolean;
  hasStaticContent?: boolean;
  hasHiddenToolbarItem?: boolean;
  hasRemovedToolbarItem?: boolean;
}) => {
  const DRAWER_TOOLBAR_DATA: DrawerToolbarLayoutProps['toolbarData'] = [
    {
      id: 'Code',
      label: 'Code',
      content: hasStaticContent ? <LongContent /> : <DrawerContent />,
      title: 'Code Title',
      glyph: 'Code',
    },
    {
      id: 'Dashboard',
      label: 'Dashboard',
      content: hasStaticContent ? <LongContent /> : <DrawerContent />,
      title: 'Dashboard Title',
      glyph: 'Dashboard',
    },
    {
      id: 'Apps',
      label: 'Apps',
      content: hasStaticContent ? <LongContent /> : <DrawerContent />,
      glyph: 'Apps',
      title: 'Apps Title',
      visible: hasHiddenToolbarItem ? false : true,
    },
    ...(hasRemovedToolbarItem
      ? []
      : [
          {
            id: 'Trash',
            label: 'Trash',
            content: hasStaticContent ? <LongContent /> : <DrawerContent />,
            title: 'Trash Title',
            glyph: 'Trash' as const,
          },
        ]),
    {
      id: 'Plus',
      label: "Perform some action, doesn't open a drawer",
      glyph: 'Plus',
    },
    {
      id: 'Sparkle',
      label: 'Disabled item',
      glyph: 'Sparkle',
      disabled: true,
    },
  ];

  if (!hasToolbarData) {
    return DRAWER_TOOLBAR_DATA.map(item => ({ ...item, visible: false }));
  }

  return DRAWER_TOOLBAR_DATA;
};

/**
 * Custom hook for managing toolbar data state
 * @param initialData - The initial data to use for the toolbar
 * @returns An object containing the toolbar data, and functions to update the toolbar data
 */
export const useToolbarData = (
  initialData: DrawerToolbarLayoutProps['toolbarData'],
) => {
  const [toolbarData, setToolbarData] = useState(initialData);
  const [hasToolbarData, setHasToolbarData] = useState(true);
  const [hasHiddenToolbarItem, setHasHiddenToolbarItem] = useState(false);
  const [hasRemovedToolbarItem, setHasRemovedToolbarItem] = useState(false);

  const getData = useCallback(() => {
    return getDrawerToolbarData({
      hasToolbarData,
      hasHiddenToolbarItem,
      hasRemovedToolbarItem,
    });
  }, [hasToolbarData, hasHiddenToolbarItem, hasRemovedToolbarItem]);

  useEffect(() => {
    setToolbarData(getData());
  }, [getData, hasToolbarData, hasHiddenToolbarItem]);

  return {
    toolbarData,
    hasToolbarData,
    setHasToolbarData,
    hasHiddenToolbarItem,
    setHasHiddenToolbarItem,
    hasRemovedToolbarItem,
    setHasRemovedToolbarItem,
  };
};
