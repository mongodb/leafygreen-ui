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

export const getDrawerToolbarData = ({
  isToolbarHidden = false,
  hasStaticContent = false,
}: {
  isToolbarHidden?: boolean;
  hasStaticContent?: boolean;
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
      content: hasStaticContent ? <LongContent /> : <DrawerContent />,
      glyph: 'Apps',
      title: 'Apps Title',
      visible: false,
    },
  ];

  if (isToolbarHidden) {
    return DRAWER_TOOLBAR_DATA.map(item => ({ ...item, visible: false }));
  }

  return DRAWER_TOOLBAR_DATA;
};
