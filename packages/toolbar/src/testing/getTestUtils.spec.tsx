import React from 'react';
import { render } from '@testing-library/react';

import { Toolbar } from '../Toolbar';

import { getTestUtils } from './getTestUtils';
import { renderToolbar, renderToolbarIconsButtons } from './render.testutils';

const renderMultipleToolbars = () => {
  return render(
    <>
      <Toolbar data-lgid="lg-toolbar-1">
        {renderToolbarIconsButtons({})}
      </Toolbar>
      <Toolbar data-lgid="lg-toolbar-2">
        {renderToolbarIconsButtons({ hasExtraButtons: true })}
      </Toolbar>
    </>,
  );
};

describe('packages/toolbar/getTestUtils', () => {
  describe('single Toolbar', () => {
    describe('getToolbar', () => {
      test('throws error if not found', () => {
        renderToolbar({ 'data-lgid': 'lg-different-id' });

        try {
          const { getToolbar } = getTestUtils();
          const _ = getToolbar();
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            'message',
            expect.stringMatching(
              /Unable to find an element by: \[data-lgid="lg-toolbar"\]/,
            ),
          );
        }
      });

      test('returns toolbar if found', () => {
        renderToolbar({});
        const { getToolbar } = getTestUtils();
        expect(getToolbar()).toBeInTheDocument();
      });
    });

    describe('findToolbar', () => {
      test('throws error if not found', async () => {
        renderToolbar({ 'data-lgid': 'lg-different-id' });
        try {
          const { findToolbar } = getTestUtils();
          const _ = await findToolbar();
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            'message',
            expect.stringMatching(
              /Unable to find an element by: \[data-lgid="lg-toolbar"\]/,
            ),
          );
        }
      });

      test('returns toolbar if found', async () => {
        renderToolbar({});
        const { findToolbar } = getTestUtils();
        expect(await findToolbar()).toBeInTheDocument();
      });
    });

    describe('queryToolbar', () => {
      test('returns null if not found', () => {
        renderToolbar({ 'data-lgid': 'lg-different-id' });
        const { queryToolbar } = getTestUtils();
        expect(queryToolbar()).not.toBeInTheDocument();
      });

      test('returns toolbar if found', () => {
        renderToolbar({});
        const { queryToolbar } = getTestUtils();
        expect(queryToolbar()).toBeInTheDocument();
      });
    });

    describe('getAllToolbarIconButtons', () => {
      test('returns all toolbar icon buttons', () => {
        renderToolbar({});
        const { getAllToolbarIconButtons } = getTestUtils();
        const buttons = getAllToolbarIconButtons();
        expect(buttons.length).toBe(5);
      });
    });

    describe('getToolbarIconButtonByLabel', () => {
      describe('getElement', () => {
        test('returns the element', () => {
          renderToolbar({});
          const { getToolbarIconButtonByLabel } = getTestUtils();

          expect(
            getToolbarIconButtonByLabel('Megaphone')?.getElement(),
          ).toBeInTheDocument();
        });

        test('returns undefined', () => {
          renderToolbar({});
          const { getToolbarIconButtonByLabel } = getTestUtils();

          expect(
            getToolbarIconButtonByLabel('Hello')?.getElement(),
          ).toBeUndefined();
        });
      });

      describe('isActive', () => {
        test('returns true', () => {
          renderToolbar({});
          const { getToolbarIconButtonByLabel } = getTestUtils();

          expect(
            getToolbarIconButtonByLabel('Megaphone')?.isActive(),
          ).toBeTruthy();
        });

        test('returns false', () => {
          renderToolbar({});
          const { getToolbarIconButtonByLabel } = getTestUtils();

          expect(getToolbarIconButtonByLabel('Key')?.isActive()).toBeFalsy();
        });

        test('returns undefined', () => {
          renderToolbar({});
          const { getToolbarIconButtonByLabel } = getTestUtils();

          expect(
            getToolbarIconButtonByLabel('Keyy')?.isActive(),
          ).toBeUndefined();
        });
      });

      describe('isDisabled', () => {
        test('returns true', () => {
          renderToolbar({});
          const { getToolbarIconButtonByLabel } = getTestUtils();

          expect(
            getToolbarIconButtonByLabel('Plus')?.isDisabled(),
          ).toBeTruthy();
        });

        test('returns false', () => {
          renderToolbar({});
          const { getToolbarIconButtonByLabel } = getTestUtils();

          expect(getToolbarIconButtonByLabel('Key')?.isDisabled()).toBeFalsy();
        });

        test('returns undefined', () => {
          renderToolbar({});
          const { getToolbarIconButtonByLabel } = getTestUtils();

          expect(getToolbarIconButtonByLabel('Keyy')?.isDisabled()).toBeFalsy();
        });
      });
    });

    describe('getActiveToolbarIconButton', () => {
      test('returns the active ToolbarIconButton', () => {
        renderToolbar({});
        const { getActiveToolbarIconButton } = getTestUtils();

        expect(getActiveToolbarIconButton()).toHaveAttribute(
          'data-active',
          'true',
        );
      });

      test('returns undefined', () => {
        render(
          <Toolbar>{renderToolbarIconsButtons({ isActive: false })}</Toolbar>,
        );
        const { getActiveToolbarIconButton } = getTestUtils();

        expect(getActiveToolbarIconButton()).toBeUndefined();
      });
    });
  });

  describe('multiple Toolbars', () => {
    test('returns the correct number of ToolbarIconButtons', () => {
      renderMultipleToolbars();

      const { getAllToolbarIconButtons: getAllToolbarIconButtons1 } =
        getTestUtils('lg-toolbar-1');
      const { getAllToolbarIconButtons: getAllToolbarIconButtons2 } =
        getTestUtils('lg-toolbar-2');
      const buttons1 = getAllToolbarIconButtons1();
      const buttons2 = getAllToolbarIconButtons2();
      expect(buttons1.length).toBe(5);
      expect(buttons2.length).toBe(7);
    });
  });
});
