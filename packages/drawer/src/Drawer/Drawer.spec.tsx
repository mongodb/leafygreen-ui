import React, { RefObject, useState } from 'react';
import { getByTestId, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { DrawerLayout } from '../DrawerLayout';
import { DrawerStackProvider } from '../DrawerStackContext';
import { getTestUtils } from '../testing';

import { DisplayMode, Drawer, DrawerProps } from '.';

const drawerTest = {
  content: 'Drawer content',
  title: 'Drawer title',
} as const;

const DrawerWithButton = ({
  displayMode = DisplayMode.Embedded,
  isOpenProp = false,
  initialFocus = 'auto',
}: {
  displayMode?: DisplayMode;
  isOpenProp?: boolean;
  initialFocus?: DrawerProps['initialFocus'];
} = {}) => {
  const [isOpen, setIsOpen] = useState(isOpenProp);
  const handleOpen = () => setIsOpen(true);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  return (
    <DrawerLayout
      isDrawerOpen={isOpen}
      onClose={() => setIsOpen(false)}
      displayMode={displayMode}
      initialFocus={initialFocus}
    >
      <button data-testid="open-drawer-button" onClick={handleOpen}>
        Open Drawer
      </button>
      <Drawer title={drawerTest.title}>
        <button data-testid="primary-button">Primary</button>
        <button
          data-testid="secondary-button"
          ref={buttonRef}
          id="secondary-button"
        >
          Secondary
        </button>
      </Drawer>
    </DrawerLayout>
  );
};

function renderDrawer(props: Partial<DrawerProps> = {}) {
  const utils = render(
    <DrawerStackProvider>
      <Drawer title={drawerTest.title} {...props}>
        {drawerTest.content}
      </Drawer>
    </DrawerStackProvider>,
  );
  const { getDrawer, ...testUtils } = getTestUtils();
  const drawer = getDrawer();
  return { ...utils, drawer, ...testUtils };
}

describe('packages/drawer', () => {
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

  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderDrawer({ open: true });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    describe('initialFocus prop', () => {
      describe('auto', () => {
        test('focus is on the first focusable element when the drawer is initially opened', async () => {
          const { isOpen, getCloseButtonUtils } = renderDrawer({
            open: true,
            displayMode: DisplayMode.Embedded,
            onClose: jest.fn(),
          });

          expect(isOpen()).toBe(true);
          const closeButton = getCloseButtonUtils().getButton();
          expect(closeButton).toHaveFocus();
        });

        test('focus returns to the body when the drawer is closed', async () => {
          render(
            <DrawerWithButton
              isOpenProp={true}
              displayMode={DisplayMode.Embedded}
            />,
          );
          const { isOpen, getCloseButtonUtils } = getTestUtils();

          await waitFor(() => {
            expect(isOpen()).toBe(true);
            const closeButton = getCloseButtonUtils().getButton();
            expect(closeButton).toHaveFocus();
          });

          userEvent.keyboard('{enter}');
          await waitFor(() => {
            expect(isOpen()).toBe(false);
            expect(document.body).toHaveFocus();
          });
        });

        test('focus is on the first focusable element when the drawer is opened by pressing the open button', async () => {
          const { getByTestId } = render(<DrawerWithButton />);
          const { isOpen, getCloseButtonUtils } = getTestUtils();

          expect(isOpen()).toBe(false);
          const openDrawerButton = getByTestId('open-drawer-button');
          openDrawerButton.focus();
          userEvent.keyboard('{enter}');

          await waitFor(() => {
            expect(isOpen()).toBe(true);
            const closeButton = getCloseButtonUtils().getButton();
            expect(closeButton).toHaveFocus();
          });
        });

        test('when the drawer is opened by pressing the the open button, focus returns to the open button when the drawer is closed', async () => {
          const { getByTestId } = render(<DrawerWithButton />);
          const { isOpen, getCloseButtonUtils } = getTestUtils();

          expect(isOpen()).toBe(false);
          const openDrawerButton = getByTestId('open-drawer-button');
          openDrawerButton.focus();
          userEvent.keyboard('{enter}');

          await waitFor(() => {
            expect(isOpen()).toBe(true);
            const closeButton = getCloseButtonUtils().getButton();
            expect(closeButton).toHaveFocus();
          });

          userEvent.keyboard('{enter}');

          await waitFor(() => {
            expect(isOpen()).toBe(false);
            expect(openDrawerButton).toHaveFocus();
          });
        });
      });

      describe('string selector', () => {
        describe.each([DisplayMode.Embedded, DisplayMode.Overlay])(
          'displayMode: %s',
          displayMode => {
            test('focus is on the initial focus string selector when the drawer is initially opened', async () => {
              const { getByTestId } = render(
                <DrawerWithButton
                  initialFocus="#secondary-button"
                  isOpenProp={true}
                  displayMode={displayMode}
                />,
              );

              const secondaryButton = getByTestId('secondary-button');
              expect(secondaryButton).toHaveFocus();
            });

            test('focus is on the initial focus string selector when the drawer is opened by pressing the open button', async () => {
              const { getByTestId } = render(
                <DrawerWithButton
                  initialFocus="#secondary-button"
                  displayMode={displayMode}
                />,
              );
              const { isOpen } = getTestUtils();

              const openDrawerButton = getByTestId('open-drawer-button');
              openDrawerButton.focus();
              userEvent.keyboard('{enter}');

              await waitFor(() => {
                expect(isOpen()).toBe(true);
              });

              const secondaryButton = getByTestId('secondary-button');
              expect(secondaryButton).toHaveFocus();
            });
          },
        );

        test('when the drawer is initially opened, focus returns to the body when the drawer is closed', async () => {
          render(
            <DrawerWithButton
              initialFocus="#secondary-button"
              displayMode={DisplayMode.Embedded}
              isOpenProp={true}
            />,
          );
          const { isOpen, getCloseButtonUtils } = getTestUtils();

          const closeButton = getCloseButtonUtils().getButton();
          closeButton.focus();
          userEvent.keyboard('{enter}');

          await waitFor(() => {
            expect(isOpen()).toBe(false);
            expect(document.body).toHaveFocus();
          });
        });

        test('when the drawer is opened by pressing the open button, focus returns to the open button when the drawer is closed', async () => {
          const { getByTestId } = render(
            <DrawerWithButton
              initialFocus="#secondary-button"
              displayMode={DisplayMode.Embedded}
            />,
          );
          const { isOpen, getCloseButtonUtils } = getTestUtils();

          const openDrawerButton = getByTestId('open-drawer-button');
          openDrawerButton.focus();
          userEvent.keyboard('{enter}');

          await waitFor(() => {
            expect(isOpen()).toBe(true);
          });

          const secondaryButton = getByTestId('secondary-button');
          expect(secondaryButton).toHaveFocus();

          const closeButton = getCloseButtonUtils().getButton();
          closeButton.focus();
          userEvent.keyboard('{enter}');

          await waitFor(() => {
            expect(isOpen()).toBe(false);
            expect(openDrawerButton).toHaveFocus();
          });
        });
      });

      describe('ref', () => {
        const TestComponent = ({
          isOpenProp = false,
          displayMode = DisplayMode.Embedded,
        }: {
          isOpenProp?: boolean;
          displayMode?: DisplayMode;
        }) => {
          const [isOpen, setIsOpen] = useState(isOpenProp);
          const handleOpen = () => setIsOpen(true);
          const buttonRef = React.useRef<HTMLButtonElement>(null);

          return (
            <DrawerLayout
              isDrawerOpen={isOpen}
              onClose={() => setIsOpen(false)}
              displayMode={displayMode}
              initialFocus={buttonRef}
            >
              <button data-testid="open-drawer-button" onClick={handleOpen}>
                Open Drawer
              </button>
              <Drawer title={drawerTest.title}>
                <button data-testid="primary-button">Primary</button>
                <button data-testid="secondary-button" ref={buttonRef}>
                  Secondary
                </button>
              </Drawer>
            </DrawerLayout>
          );
        };

        describe.each([DisplayMode.Embedded, DisplayMode.Overlay])(
          'displayMode: %s',
          displayMode => {
            test('focus is on the initial focus ref when the drawer is initially opened', async () => {
              const { getByTestId } = render(
                <TestComponent isOpenProp={true} displayMode={displayMode} />,
              );

              const secondaryButton = getByTestId('secondary-button');
              expect(secondaryButton).toHaveFocus();
            });

            test('focus is on the initial focus ref when the drawer is opened by pressing open button', async () => {
              const { getByTestId } = render(
                <TestComponent displayMode={displayMode} />,
              );
              const { isOpen } = getTestUtils();

              const openDrawerButton = getByTestId('open-drawer-button');
              openDrawerButton.focus();
              userEvent.keyboard('{enter}');

              await waitFor(() => {
                expect(isOpen()).toBe(true);
              });

              const secondaryButton = getByTestId('secondary-button');
              expect(secondaryButton).toHaveFocus();
            });
          },
        );

        test('when the drawer is initially opened, focus returns to the body when the drawer is closed', async () => {
          render(<TestComponent isOpenProp={true} />);
          const { isOpen, getCloseButtonUtils } = getTestUtils();

          const closeButton = getCloseButtonUtils().getButton();
          closeButton.focus();
          userEvent.keyboard('{enter}');

          await waitFor(() => {
            expect(isOpen()).toBe(false);
            expect(document.body).toHaveFocus();
          });
        });

        test('when the drawer is opened by pressing open button, focus returns to the open button when the drawer is closed', async () => {
          const { getByTestId } = render(<TestComponent />);
          const { isOpen, getCloseButtonUtils } = getTestUtils();

          const openDrawerButton = getByTestId('open-drawer-button');
          openDrawerButton.focus();
          userEvent.keyboard('{enter}');

          await waitFor(() => {
            expect(isOpen()).toBe(true);
          });

          const secondaryButton = getByTestId('secondary-button');
          expect(secondaryButton).toHaveFocus();

          const closeButton = getCloseButtonUtils().getButton();
          closeButton.focus();
          userEvent.keyboard('{enter}');

          await waitFor(() => {
            expect(isOpen()).toBe(false);
            expect(openDrawerButton).toHaveFocus();
          });
        });
      });

      // Only testing embedded mode because overlay does this by default since it uses the native HTML dialog element
      describe('autoFocus attribute', () => {
        const TestComponent = ({
          isOpenProp = false,
        }: {
          isOpenProp?: boolean;
        }) => {
          const [isOpen, setIsOpen] = useState(isOpenProp);
          const handleOpen = () => setIsOpen(true);
          return (
            <DrawerLayout
              isDrawerOpen={isOpen}
              onClose={() => setIsOpen(false)}
              displayMode={DisplayMode.Embedded}
            >
              <button data-testid="open-drawer-button" onClick={handleOpen}>
                Open Drawer
              </button>
              <Drawer title={drawerTest.title}>
                <button data-testid="primary-button">Primary</button>
                <button
                  data-testid="secondary-button"
                  id="secondary-button"
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus={true}
                  // react does not add the autofocus attribute to the button element, so it needs to be added manually for embedded mode
                  {...{ autofocus: '' }}
                >
                  Secondary
                </button>
              </Drawer>
            </DrawerLayout>
          );
        };

        test('focus is on the element with the autoFocus attribute when the drawer is initially opened', async () => {
          const { getByTestId } = render(<TestComponent isOpenProp={true} />);

          const secondaryButton = getByTestId('secondary-button');
          expect(secondaryButton).toHaveFocus();
        });

        test.skip('when the drawer is initially opened, focus returns to the body when the drawer is closed', async () => {
          render(<TestComponent isOpenProp={true} />);
          const { isOpen, getCloseButtonUtils } = getTestUtils();

          const closeButton = getCloseButtonUtils().getButton();
          closeButton.focus();
          userEvent.keyboard('{enter}');

          await waitFor(() => {
            expect(isOpen()).toBe(false);
            expect(document.body).toHaveFocus();
          });
        });

        test('focus is on the element with the autoFocus attribute when the drawer is opened by pressing the open button', async () => {
          const { getByTestId } = render(<TestComponent />);
          const { isOpen } = getTestUtils();

          const openDrawerButton = getByTestId('open-drawer-button');
          openDrawerButton.focus();
          userEvent.keyboard('{enter}');

          await waitFor(() => {
            expect(isOpen()).toBe(true);
          });

          const secondaryButton = getByTestId('secondary-button');
          expect(secondaryButton).toHaveFocus();
        });

        test('when the drawer is opened by pressing the open button, focus returns to the open button when the drawer is closed', async () => {
          const { getByTestId } = render(<TestComponent />);
          const { isOpen, getCloseButtonUtils } = getTestUtils();

          const openDrawerButton = getByTestId('open-drawer-button');
          openDrawerButton.focus();
          userEvent.keyboard('{enter}');

          await waitFor(() => {
            expect(isOpen()).toBe(true);
          });

          const secondaryButton = getByTestId('secondary-button');
          expect(secondaryButton).toHaveFocus();

          const closeButton = getCloseButtonUtils().getButton();
          closeButton.focus();
          userEvent.keyboard('{enter}');

          await waitFor(() => {
            expect(isOpen()).toBe(false);
            expect(openDrawerButton).toHaveFocus();
          });
        });
      });
    });
  });

  describe('displayMode prop', () => {
    test('renders as dialog when "displayMode" is "overlay"', () => {
      const { drawer } = renderDrawer({
        open: true,
        displayMode: DisplayMode.Overlay,
      });
      expect(drawer.tagName).toBe('DIALOG');
    });

    test('renders as div when "displayMode" is "embedded"', () => {
      const { drawer } = renderDrawer({
        open: true,
        displayMode: DisplayMode.Embedded,
      });
      expect(drawer.tagName).toBe('DIV');
    });
  });

  describe('when the "open" prop is true', () => {
    test('renders content as expected', async () => {
      const { getByText, isOpen } = renderDrawer({ open: true });
      expect(isOpen()).toBeTruthy();
      expect(getByText(drawerTest.content)).toBeVisible();
      expect(getByText(drawerTest.title)).toBeVisible();
    });

    test('uses "id" prop when set', () => {
      const { drawer } = renderDrawer({ open: true, id: 'test-id' });
      expect(drawer).toHaveAttribute('id', 'test-id');
    });

    describe('onClose', () => {
      test('close button is rendered when onClose is provided', () => {
        const { getCloseButtonUtils } = renderDrawer({
          open: true,
          onClose: jest.fn(),
        });
        const { getButton: getCloseButton } = getCloseButtonUtils();

        expect(getCloseButton()).toBeInTheDocument();
      });

      test('close button is not rendered when onClose is not provided', () => {
        const { getCloseButtonUtils } = renderDrawer({ open: true });
        const { queryButton: queryCloseButton } = getCloseButtonUtils();

        expect(queryCloseButton()).toBeNull();
      });

      test('calls onClose when close button is clicked', () => {
        const mockOnClose = jest.fn();
        const { getCloseButtonUtils } = renderDrawer({
          open: true,
          onClose: mockOnClose,
        });
        const { getButton: getCloseButton } = getCloseButtonUtils();
        const closeButton = getCloseButton();

        expect(closeButton).toBeInTheDocument();

        userEvent.click(closeButton);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      });
    });
  });

  test('when the "open" prop is false, does not render content', () => {
    const { isOpen } = renderDrawer();
    expect(isOpen()).toBeFalsy();
  });
});
