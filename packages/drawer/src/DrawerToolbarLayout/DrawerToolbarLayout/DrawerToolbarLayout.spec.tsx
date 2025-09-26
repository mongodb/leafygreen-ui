import React, { useEffect } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DrawerLayout } from '../../DrawerLayout/DrawerLayout';
import { DrawerLayoutProps } from '../../DrawerLayout/DrawerLayout.types';
import { useDrawerToolbarContext } from '../../DrawerToolbarLayout/DrawerToolbarContext/DrawerToolbarContext';
import { getTestUtils } from '../../testing';

const onClickMock = jest.fn();
const onCloseMock = jest.fn();

const DRAWER_TOOLBAR_DATA: DrawerLayoutProps['toolbarData'] = [
  {
    id: 'Code',
    label: 'Code',
    content: 'Drawer Content',
    title: `Drawer Title`,
    glyph: 'Code',
    onClick: onClickMock,
  },
  {
    id: 'Code2',
    label: 'Code2',
    content: 'Drawer Content2',
    title: `Drawer Title2`,
    glyph: 'Code',
  },
];

const Component = ({
  data = DRAWER_TOOLBAR_DATA,
}: {
  data?: DrawerLayoutProps['toolbarData'];
}) => {
  const MainContent = () => {
    const { openDrawer } = useDrawerToolbarContext();

    useEffect(() => {
      openDrawer('Code');
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>🌻</>;
  };

  return (
    <div>
      <DrawerLayout toolbarData={data} onClose={onCloseMock}>
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

  test('Updates the open drawer content when the toolbar data changes', () => {
    const { rerender } = render(<Component />);

    const { getDrawer, isOpen } = getTestUtils();
    const drawer = getDrawer();

    expect(isOpen()).toBe(true);
    expect(drawer).toHaveTextContent('Drawer Content');
    expect(drawer).toHaveTextContent('Drawer Title');

    rerender(
      <Component
        data={[
          {
            id: 'Code',
            label: 'Code',
            content: 'Rerendered Drawer Content',
            title: `Rerendered Drawer Title`,
            glyph: 'Code',
          },
        ]}
      />,
    );

    expect(isOpen()).toBe(true);
    expect(drawer).toHaveTextContent('Rerendered Drawer Content');
    expect(drawer).toHaveTextContent('Rerendered Drawer Title');
  });

  test('renders the correct number of toolbar items', () => {
    render(<Component />);
    const { getToolbarTestUtils } = getTestUtils();
    const { getAllToolbarIconButtons } = getToolbarTestUtils();
    const items = getAllToolbarIconButtons();

    expect(items).toHaveLength(2);
  });

  test('renders the correct number of toolbar items when some items are hidden', () => {
    const { rerender } = render(<Component />);

    const { getToolbarTestUtils } = getTestUtils();
    const { getAllToolbarIconButtons } = getToolbarTestUtils();

    expect(getAllToolbarIconButtons()).toHaveLength(2);

    rerender(
      <Component
        data={[
          {
            id: 'Code',
            label: 'Code',
            content: 'Rerendered Drawer Content',
            title: `Rerendered Drawer Title`,
            glyph: 'Code',
          },
          {
            id: 'Code2',
            label: 'Code2',
            content: 'Drawer Content2',
            title: `Drawer Title2`,
            glyph: 'Code',
            visible: false,
          },
        ]}
      />,
    );

    expect(getAllToolbarIconButtons()).toHaveLength(1);
  });

  test('does not renders the toolbar when all items are hidden', () => {
    const { rerender } = render(<Component />);

    const { getToolbarTestUtils } = getTestUtils();
    const { getAllToolbarIconButtons, queryToolbar } = getToolbarTestUtils();

    expect(queryToolbar()).toBeInTheDocument();
    expect(getAllToolbarIconButtons()).toHaveLength(2);

    rerender(
      <Component
        data={[
          {
            id: 'Code',
            label: 'Code',
            content: 'Rerendered Drawer Content',
            title: `Rerendered Drawer Title`,
            glyph: 'Code',
            visible: false,
          },
          {
            id: 'Code2',
            label: 'Code2',
            content: 'Drawer Content2',
            title: `Drawer Title2`,
            glyph: 'Code',
            visible: false,
          },
        ]}
      />,
    );

    expect(queryToolbar()).not.toBeInTheDocument();
  });

  test('closes the drawer when the active item is hidden', () => {
    const { rerender } = render(<Component />);

    const { isOpen } = getTestUtils();

    expect(isOpen()).toBe(true);

    rerender(
      <Component
        data={[
          {
            id: 'Code',
            label: 'Code',
            content: 'Rerendered Drawer Content',
            title: `Rerendered Drawer Title`,
            glyph: 'Code',
            visible: false,
          },
          {
            id: 'Code2',
            label: 'Code2',
            content: 'Drawer Content2',
            title: `Drawer Title2`,
            glyph: 'Code',
          },
        ]}
      />,
    );

    expect(isOpen()).toBe(false);
  });

  test('closes the drawer when the active item is removed from the toolbar data', () => {
    const { rerender } = render(<Component />);

    const { isOpen } = getTestUtils();

    expect(isOpen()).toBe(true);

    rerender(
      <Component
        data={[
          {
            id: 'Code2',
            label: 'Code2',
            content: 'Drawer Content2',
            title: `Drawer Title2`,
            glyph: 'Code',
          },
        ]}
      />,
    );

    expect(isOpen()).toBe(false);
  });

  test('passes ref correctly to ToolbarIconButton instances', () => {
    const codeButtonRef = React.createRef<HTMLButtonElement>();
    const code2ButtonRef = React.createRef<HTMLButtonElement>();

    const dataWithRefs: DrawerLayoutProps['toolbarData'] = [
      {
        id: 'Code',
        label: 'Code',
        content: 'Drawer Content',
        title: `Drawer Title`,
        glyph: 'Code',
        ref: codeButtonRef,
      },
      {
        id: 'Code2',
        label: 'Code2',
        content: 'Drawer Content2',
        title: `Drawer Title2`,
        glyph: 'Code',
        ref: code2ButtonRef,
      },
    ];

    render(<Component data={dataWithRefs} />);

    // Verify that refs are properly assigned to DOM elements
    expect(codeButtonRef.current).toBeInstanceOf(HTMLButtonElement);
    expect(code2ButtonRef.current).toBeInstanceOf(HTMLButtonElement);

    // Verify the elements have the correct labels
    expect(codeButtonRef.current).toHaveAttribute('aria-label', 'Code');
    expect(code2ButtonRef.current).toHaveAttribute('aria-label', 'Code2');
  });
  
  test('closes the drawer when clicking the same toolbar button while drawer is open', () => {
    render(<Component />);

    const { getToolbarTestUtils, isOpen } = getTestUtils();

    expect(isOpen()).toBe(true);

    const { getToolbarIconButtonByLabel } = getToolbarTestUtils();
    const codeButton = getToolbarIconButtonByLabel('Code')?.getElement();

    userEvent.click(codeButton!);

    expect(isOpen()).toBe(false);
  });

  test('opens the drawer when clicking a different toolbar button while drawer is open', () => {
    render(<Component />);

    const { getToolbarTestUtils, isOpen, getDrawer } = getTestUtils();

    expect(isOpen()).toBe(true);
    expect(getDrawer()).toHaveTextContent('Drawer Title');

    const { getToolbarIconButtonByLabel } = getToolbarTestUtils();
    const code2Button = getToolbarIconButtonByLabel('Code2')?.getElement();

    userEvent.click(code2Button!);

    expect(isOpen()).toBe(true);
    expect(getDrawer()).toHaveTextContent('Drawer Title2');
  });
});
