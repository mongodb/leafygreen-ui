import React, { useEffect } from 'react';
import { render } from '@testing-library/react';

import { Drawer } from '../Drawer/Drawer';
import { useDrawerToolbarContext } from '../DrawerToolbarLayout/DrawerToolbarContext/DrawerToolbarContext';
import { getTestUtils } from '../testing';

import { DrawerLayout, DrawerLayoutProps } from '.';

describe('packages/DrawerLayout', () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.show = jest.fn(function mock(
      this: HTMLDialogElement,
    ) {
      this.open = true;
    });

    HTMLDialogElement.prototype.close = jest.fn(function mock(
      this: HTMLDialogElement,
    ) {
      this.open = false;
    });
  });

  describe('renders', () => {
    test('renders with drawer and children with drawer prop', () => {
      const { getByText } = render(
        <DrawerLayout
          isDrawerOpen
          drawer={<Drawer title="Drawer Title">Drawer Content</Drawer>}
        >
          <div>Main Content</div>
        </DrawerLayout>,
      );

      const { isOpen } = getTestUtils();

      expect(isOpen()).toBeTruthy();
      expect(getByText('Drawer Content')).toBeVisible();
    });

    test('renders with drawer and children without drawer prop', () => {
      const { getByText } = render(
        <DrawerLayout isDrawerOpen>
          <div>Main Content</div>
          <Drawer open title="Drawer Title">
            Drawer Content
          </Drawer>
        </DrawerLayout>,
      );

      const { isOpen } = getTestUtils();

      expect(isOpen()).toBeTruthy();
      expect(getByText('Drawer Content')).toBeVisible();
    });

    test('renders with drawer and children with toolbar data', () => {
      const DRAWER_TOOLBAR_DATA: DrawerLayoutProps['toolbarData'] = [
        {
          id: 'Code',
          label: 'Code',
          content: 'Drawer Content',
          title: 'Code Title',
          glyph: 'Code',
        },
      ];

      const ComponentOpen = () => {
        const MainContent = () => {
          const { openDrawer } = useDrawerToolbarContext();

          useEffect(() => {
            openDrawer('Code');
            // eslint-disable-next-line react-hooks/exhaustive-deps
          }, []);

          return <main>Main Content</main>;
        };

        return (
          <div>
            <DrawerLayout toolbarData={DRAWER_TOOLBAR_DATA}>
              <MainContent />
            </DrawerLayout>
          </div>
        );
      };

      const { getByText } = render(<ComponentOpen />);
      const { isOpen } = getTestUtils();

      expect(isOpen()).toBeTruthy();
      expect(getByText('Drawer Content')).toBeVisible();
    });
  });

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

      <DrawerLayout
        toolbarData={[
          // @ts-expect-error - content should not be passed if title is missing
          {
            id: 'code',
            glyph: 'Code',
            content: '<p>hey</p>',
            label: 'the label',
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
            inlineChildrenInTitle: <div>inline children</div>,
          },
        ]}
        onClose={() => {}}
        displayMode="overlay"
        darkMode
      >
        {'children'}
      </DrawerLayout>
      <DrawerLayout
        toolbarData={[
          {
            id: 'code',
            glyph: 'Code',
            label: 'the label',
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
