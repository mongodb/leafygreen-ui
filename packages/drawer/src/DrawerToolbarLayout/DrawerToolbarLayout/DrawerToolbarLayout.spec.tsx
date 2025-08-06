import React, { useEffect, useState } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DrawerLayout } from '../../DrawerLayout/DrawerLayout';
import { DrawerLayoutProps } from '../../DrawerLayout/DrawerLayout.types';
import { useDrawerToolbarContext } from '../../DrawerToolbarLayout/DrawerToolbarContext/DrawerToolbarContext';
import { getTestUtils } from '../../testing';

const onClickMock = jest.fn();
const onCloseMock = jest.fn();

const Component = () => {
  const [state, setState] = useState({ count: 0, name: 'test' });

  const DRAWER_TOOLBAR_DATA: DrawerLayoutProps['toolbarData'] = [
    {
      id: 'Code',
      label: 'Code',
      content: <span>{`Count: ${state.count}`}</span>,
      title: `${state.name} - ${state.count}`,
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

    return (
      <main>
        Main Content{' '}
        <button
          data-testid="update-button"
          onClick={() => setState({ count: 1, name: 'updated' })}
        >
          Update state
        </button>
      </main>
    );
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

  test('allows for dynamic toolbar data', () => {
    const { getByTestId } = render(<Component />);

    const { getDrawer } = getTestUtils();
    const drawer = getDrawer();
    const button = getByTestId('update-button');

    expect(drawer).toHaveTextContent('Count: 0');
    expect(drawer).toHaveTextContent('test - 0');

    userEvent.click(button);

    expect(drawer).toHaveTextContent('Count: 1');
    expect(drawer).toHaveTextContent('updated - 1');
  });
});
