import React from 'react';

import { DrawerLayout } from '.';

describe('packages/chip', () => {
  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('types behave as expected', () => {
    <>
      {/* @ts-expect-error - Missing children */}
      <DrawerLayout />

      <DrawerLayout>{}</DrawerLayout>

      <DrawerLayout displayMode="embedded">{}</DrawerLayout>

      <DrawerLayout displayMode="overlay">{}</DrawerLayout>

      <DrawerLayout
        toolbarData={[
          {
            id: 'code',
            glyph: 'Code',
            content: '<p>hey</p>',
            label: 'the label',
            title: 'the title',
          },
        ]}
        onClose={() => {}}
        displayMode="overlay"
        darkMode
      >
        {}
      </DrawerLayout>

      <DrawerLayout isDrawerOpen={false} displayMode="embedded">
        {}{' '}
      </DrawerLayout>

      {/* @ts-expect-error - ToolbarData should not be passed with isDrawerOpen */}
      <DrawerLayout
        isDrawerOpen={false}
        displayMode="embedded"
        toolbarData={[]}
      >
        {}{' '}
      </DrawerLayout>
    </>;
  });
});
