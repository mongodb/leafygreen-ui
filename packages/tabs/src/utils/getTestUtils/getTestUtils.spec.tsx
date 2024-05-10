import React from 'react';
import { render } from '@testing-library/react';

import { Tab, Tabs } from '../../';

import { getTestUtils } from './getTestUtils';
import { TestUtilsReturnType } from './getTestUtils.types';

const defaultProps = {
  'aria-label': 'Tabs label',
} as const;

const children = [
  <Tab key="content-1" name="First" default>
    Content 1
  </Tab>,
  <Tab key="content-2" name="Second">
    Content 2
  </Tab>,
  <Tab key="content-3" name={<div>Third</div>} disabled={true}>
    {' '}
    Content 3
  </Tab>,
];

function renderTabs(props = {}) {
  const renderUtils = render(
    <Tabs {...defaultProps} {...props}>
      {children}
    </Tabs>,
  );

  return {
    ...renderUtils,
  };
}

function renderMultipleTabs() {
  const renderUtils = render(
    <>
      <Tabs {...defaultProps} data-lgid="lg-tabs-1">
        {children}
      </Tabs>
      <Tabs {...defaultProps} data-lgid="lg-tabs-2">
        {children.slice(0, 2)}
      </Tabs>
    </>,
  );

  return {
    ...renderUtils,
  };
}

describe('packages/tabs/getTestUtils', () => {
  test('throws error if tabs is not found', () => {
    try {
      renderTabs({ 'data-lgid': 'different-id' });
      const _utils = getTestUtils();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty(
        'message',
        expect.stringMatching(
          /Unable to find an element by: \[data-lgid="lg-tabs"\]/,
        ),
      );
    }
  });

  describe('single tabs', () => {
    describe('getAllTabsInTabList', () => {
      test('returns all tabs', () => {
        renderTabs();
        const { getAllTabsInTabList } = getTestUtils();
        const allTabs = getAllTabsInTabList();

        expect(allTabs).toHaveLength(3);
      });
    });

    describe('getTabUtilsByName', () => {
      let getTabUtilsByName: TestUtilsReturnType['getTabUtilsByName'];

      beforeEach(() => {
        renderTabs();
        getTabUtilsByName = getTestUtils().getTabUtilsByName;
      });

      test('returns null if tab with matching name is not found', () => {
        expect(getTabUtilsByName('Fourth')).not.toBeInTheDocument();
      });

      describe('if tab with matching name is found', () => {
        describe('getTab', () => {
          test('is in the document', () => {
            expect(getTabUtilsByName('First')?.getTab()).toBeInTheDocument();
          });
        });

        describe('isSelected', () => {
          test('returns true if tab is selected', () => {
            expect(getTabUtilsByName('First')?.isSelected()).toBeTruthy();
          });

          test('returns false if tab is not selected', () => {
            expect(getTabUtilsByName('Second')?.isSelected()).toBeFalsy();
          });
        });

        describe('isDisabled', () => {
          test('returns true if tab is disabled', () => {
            expect(getTabUtilsByName('Third')?.isDisabled()).toBeTruthy();
          });

          test('returns false if tab is not disabled', () => {
            expect(getTabUtilsByName('Second')?.isDisabled()).toBeFalsy();
          });
        });
      });
    });

    describe('getSelectedPanel', () => {
      test('is in the document', () => {
        renderTabs();
        const { getSelectedPanel } = getTestUtils();

        expect(getSelectedPanel()).toBeInTheDocument();
        expect(getSelectedPanel()).toHaveTextContent('Content 1');
      });
    });
  });

  describe('multiple tabs', () => {
    test('both have correct selected value', () => {
      renderMultipleTabs();
      const testUtils1 = getTestUtils('lg-tabs-1');
      const testUtils2 = getTestUtils('lg-tabs-2');

      expect(testUtils1.getTabUtilsByName('First')?.isSelected).toBeTruthy();
      expect(testUtils2.getTabUtilsByName('First')?.isSelected).toBeTruthy();
    });

    describe('first tabs component', () => {
      test('has correct number of options', async () => {
        renderMultipleTabs();
        const { getAllTabsInTabList } = getTestUtils('lg-tabs-1');

        expect(getAllTabsInTabList()).toHaveLength(3);
      });
    });

    describe('second tabs component', () => {
      test('has correct number of options', async () => {
        renderMultipleTabs();
        const { getAllTabsInTabList } = getTestUtils('lg-tabs-2');

        expect(getAllTabsInTabList()).toHaveLength(2);
      });
    });
  });
});
