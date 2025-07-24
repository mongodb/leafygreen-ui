import React from 'react';

import { DrawerLayout } from '.';

describe('packages/chip', () => {
  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('types behave as expected', () => {
    <>
      {/* @ts-expect-error - Missing children */}
      <DrawerLayout />
      <DrawerLayout drawer={<>drawer</>}>{'children'}</DrawerLayout>
      <DrawerLayout drawer={<>drawer</>} displayMode="embedded">
        {'children'}
      </DrawerLayout>
      <DrawerLayout drawer={<>drawer</>} displayMode="embedded" resizable>
        {'children'}
      </DrawerLayout>
      <DrawerLayout drawer={<>drawer</>} displayMode="overlay">
        {'children'}
      </DrawerLayout>
      {/* @ts-expect-error - Resizable should not be passed with displayMode overlay */}
      <DrawerLayout drawer={<>drawer</>} displayMode="overlay" resizable>
        {'children'}
      </DrawerLayout>{' '}
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
      <DrawerLayout
        drawer={<>drawer</>}
        isDrawerOpen={false}
        displayMode="embedded"
      >
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
      <DrawerLayout
        // @ts-expect-error - dawer should not be passed with toolbarData
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
    </>;
  });
});
