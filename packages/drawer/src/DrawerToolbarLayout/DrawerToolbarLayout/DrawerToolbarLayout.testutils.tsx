/* eslint-disable no-console */
import React, { useMemo } from 'react';
import { faker } from '@faker-js/faker';

import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import { DrawerToolbarLayoutProps } from './DrawerToolbarLayout.types';

const SEED = 0;
faker.seed(SEED);

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

export const DRAWER_TOOLBAR_DATA: DrawerToolbarLayoutProps['toolbarData'] = [
  {
    id: 'Code',
    label: 'Code',
    content: <DrawerContent />,
    title: 'Code Title',
    glyph: 'Code',
  },
  {
    id: 'Dashboard',
    label: 'Dashboard',
    content: <DrawerContent />,
    title: 'Dashboard Title',
    glyph: 'Dashboard',
  },
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
  {
    id: 'Apps',
    label: 'Apps',
    content: <DrawerContent />,
    glyph: 'Apps',
    title: 'Apps Title',
    visible: false,
  },
];

export const DRAWER_TOOLBAR_DATA_NOT_VISIBLE: DrawerToolbarLayoutProps['toolbarData'] =
  [
    {
      id: 'Code',
      label: 'Code',
      content: <DrawerContent />,
      title: 'Code Title',
      glyph: 'Code',
      visible: false,
    },
    {
      id: 'Dashboard',
      label: 'Dashboard',
      content: <DrawerContent />,
      title: 'Dashboard Title',
      glyph: 'Dashboard',
      visible: false,
    },
    {
      id: 'Plus',
      label: "Perform some action, doesn't open a drawer",
      glyph: 'Plus',
      visible: false,
    },
    {
      id: 'Sparkle',
      label: 'Disabled item',
      glyph: 'Sparkle',
      disabled: true,
      visible: false,
    },
    {
      id: 'Apps',
      label: 'Apps',
      content: <DrawerContent />,
      glyph: 'Apps',
      title: 'Apps Title',
      visible: false,
    },
  ];
