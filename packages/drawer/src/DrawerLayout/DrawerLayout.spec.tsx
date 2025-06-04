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
        data={[
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
    </>;
  });
});
