import React, { useEffect } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DrawerLayout } from '../DrawerLayout/DrawerLayout';
import { DrawerLayoutProps } from '../DrawerLayout/DrawerLayout.types';
import { useDrawerToolbarContext } from '../DrawerToolbarLayout/DrawerToolbarContext/DrawerToolbarContext';
import { getTestUtils } from '../testing';

const onClickMock = jest.fn();
const onCloseMock = jest.fn();

const Component = () => {
  const DRAWER_TOOLBAR_DATA: DrawerLayoutProps['toolbarData'] = [
    {
      id: 'Code',
      label: 'Code',
      content: 'Drawer Content',
      title: 'Code Title',
      glyph: 'Code',
      onClick: onClickMock,
    },
  ];

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
      <DrawerLayout toolbarData={DRAWER_TOOLBAR_DATA} onClose={onCloseMock}>
        <MainContent />
      </DrawerLayout>
    </div>
  );
};

describe('packages/DrawerToolbarLayout', () => {
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

  test('calls onClick when a toolbar item is clicked', () => {
    render(<Component />);

    const { getToolbarTestUtils } = getTestUtils();
    const { getToolbarIconButtonByLabel } = getToolbarTestUtils();
    const codeButton = getToolbarIconButtonByLabel('Code')?.getElement();
    userEvent.click(codeButton!);

    expect(onClickMock).toHaveBeenCalled();
  });

  test('calls onClick the close button is clicked', () => {
    render(<Component />);

    const { getCloseButtonUtils } = getTestUtils();
    const { getButton } = getCloseButtonUtils();
    const closeButton = getButton();
    userEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
