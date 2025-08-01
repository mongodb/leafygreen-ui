import React from 'react';

import { DrawerLayout } from '.';

describe('packages/DrawerLayout', () => {
  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('types behave as expected', () => {
    <>
      {/* ❌ */}
      {/* @ts-expect-error - Missing children */}
      <DrawerLayout />
      {/* @ts-expect-error - Resizable should not be true with displayMode overlay */}
      <DrawerLayout drawer={<>drawer</>} displayMode="overlay" resizable>
        {'children'}
      </DrawerLayout>
      {/* @ts-expect-error - ToolbarData should not be passed with isDrawerOpen */}
      <DrawerLayout
        isDrawerOpen={false}
        displayMode="embedded"
        toolbarData={[]}
      >
        {'children'}
      </DrawerLayout>
      {/* @ts-expect-error - drawer should not be passed with toolbarData */}
      <DrawerLayout
        drawer={<>drawer</>}
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
        {'children'}
      </DrawerLayout>
      {/* ✅ */}
      {/* Without Toolbar */}
      <DrawerLayout drawer={<>drawer</>}>{'children'}</DrawerLayout>
      <DrawerLayout drawer={<>drawer</>} displayMode="embedded">
        {'children'}
      </DrawerLayout>
      <DrawerLayout drawer={<>drawer</>} displayMode="embedded" resizable>
        {'children'}
      </DrawerLayout>
      <DrawerLayout
        drawer={<>drawer</>}
        displayMode="embedded"
        resizable={false}
      >
        {'children'}
      </DrawerLayout>
      <DrawerLayout drawer={<>drawer</>} displayMode="overlay">
        {'children'}
      </DrawerLayout>
      <DrawerLayout
        drawer={<>drawer</>}
        displayMode="overlay"
        resizable={undefined}
      >
        {'children'}
      </DrawerLayout>
      <DrawerLayout
        drawer={<>drawer</>}
        isDrawerOpen={false}
        displayMode="embedded"
      >
        {'children'}
      </DrawerLayout>
      <DrawerLayout
        drawer={<>drawer</>}
        isDrawerOpen={false}
        displayMode="embedded"
        size="large"
      >
        {'children'}
      </DrawerLayout>

      {/* With Toolbar */}
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
        {'children'}
      </DrawerLayout>
    </>;
  });
});
