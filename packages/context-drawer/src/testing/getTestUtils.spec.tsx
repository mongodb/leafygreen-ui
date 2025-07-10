import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ContextDrawerButton } from '../ContextDrawerButton';

import { getTestUtils } from './getTestUtils';
import { renderContextDrawer, renderMultipleContextDrawers } from './utils';

describe('packages/context-drawer/getTestUtils', () => {
  describe('getContextDrawer', () => {
    test('it returns the drawer element when it is in the DOM', () => {
      renderContextDrawer();
      const { getContextDrawer } = getTestUtils();
      expect(getContextDrawer()).toBeInTheDocument();
    });

    test('it throws an error when the drawer is not in the DOM', () => {
      render(<div />);
      const { getContextDrawer } = getTestUtils();
      expect(() => getContextDrawer()).toThrow();
    });
  });

  describe('queryContextDrawer', () => {
    test('it returns the drawer element when it is in the DOM', () => {
      renderContextDrawer();
      const { queryContextDrawer } = getTestUtils();
      expect(queryContextDrawer()).toBeInTheDocument();
    });

    test('it returns null when the drawer is not in the DOM', () => {
      render(<div />);
      const { queryContextDrawer } = getTestUtils();
      expect(queryContextDrawer()).not.toBeInTheDocument();
    });
  });

  describe('findContextDrawer', () => {
    test('it resolves to the drawer element when it is in the DOM', async () => {
      renderContextDrawer();
      const { findContextDrawer } = getTestUtils();
      expect(await findContextDrawer()).toBeInTheDocument();
    });

    test('it rejects when the drawer is not in the DOM', async () => {
      render(<div />);
      const { findContextDrawer } = getTestUtils();
      await expect(findContextDrawer()).rejects.toThrow();
    });
  });

  describe('getToggleButtonUtils', () => {
    describe('getButton', () => {
      test('returns the toggle button element', () => {
        renderContextDrawer();
        const { getToggleButtonUtils } = getTestUtils();
        const buttonUtils = getToggleButtonUtils();
        expect(buttonUtils.getButton()).toBeInTheDocument();
      });

      test('throws an error if the toggle button is not in the DOM', () => {
        render(<div />);
        const { getToggleButtonUtils } = getTestUtils();
        expect(() => getToggleButtonUtils().getButton()).toThrow();
      });
    });

    describe('isDisabled', () => {
      test('returns false when the toggle button is enabled', () => {
        renderContextDrawer();
        const { getToggleButtonUtils } = getTestUtils();
        expect(getToggleButtonUtils().isDisabled()).toBeFalsy();
      });

      test('returns true when the toggle button is disabled', () => {
        renderContextDrawer({
          trigger: <ContextDrawerButton disabled>Trigger</ContextDrawerButton>,
        });
        const { getToggleButtonUtils } = getTestUtils();
        expect(getToggleButtonUtils().isDisabled()).toBeTruthy();
      });
    });
  });

  describe('isOpen', () => {
    test('returns false when the drawer is closed', () => {
      renderContextDrawer({ isOpen: false });
      const { isOpen } = getTestUtils();
      expect(isOpen()).toBeFalsy();
    });

    test('returns true when the drawer is open', () => {
      renderContextDrawer({ isOpen: true });
      const { getToggleButtonUtils, isOpen } = getTestUtils();
      userEvent.click(getToggleButtonUtils().getButton());
      expect(isOpen()).toBeTruthy();
    });
  });

  describe('with multiple context drawers', () => {
    test('queries the correct context drawer', () => {
      renderMultipleContextDrawers();
      const testUtils1 = getTestUtils('lg-context_drawer-1');
      const testUtils2 = getTestUtils('lg-context_drawer-2');
      const contextDrawer1 = testUtils1.getContextDrawer();
      const contextDrawer2 = testUtils2.getContextDrawer();

      expect(contextDrawer1).toBeInTheDocument();
      expect(contextDrawer2).toBeInTheDocument();
      expect(contextDrawer1).not.toEqual(contextDrawer2);
    });

    test('isOpen returns the correct value for each context drawer', () => {
      renderMultipleContextDrawers();
      const testUtils1 = getTestUtils('lg-context_drawer-1');
      const testUtils2 = getTestUtils('lg-context_drawer-2');

      expect(testUtils1.isOpen()).toBeFalsy();
      expect(testUtils2.isOpen()).toBeFalsy();

      userEvent.click(testUtils1.getToggleButtonUtils().getButton());
      expect(testUtils1.isOpen()).toBeTruthy();
      expect(testUtils2.isOpen()).toBeFalsy();

      userEvent.click(testUtils2.getToggleButtonUtils().getButton());
      expect(testUtils1.isOpen()).toBeTruthy();
      expect(testUtils2.isOpen()).toBeTruthy();
    });
  });
});
