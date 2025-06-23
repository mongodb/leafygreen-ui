import React from 'react';
import { render } from '@testing-library/react';

import { getTestUtils } from './getTestUtils';
import { renderSectionNav, renderSectionNavItems } from './render.testUtils';

import { SectionNav } from '../SectionNav';

describe('packages/toolbar/getTestUtils', () => {
  describe('single Toolbar', () => {
    describe('getSectionNav', () => {
      test('throws error if not found', () => {
        renderSectionNav({ 'data-lgid': 'lg-different-id' });

        try {
          const { getSectionNav } = getTestUtils();
          const _ = getSectionNav();
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            'message',
            expect.stringMatching(
              /Unable to find an element by: \[data-lgid="lg-section-nav"\]/,
            ),
          );
        }
      });

      test('returns toolbar if found', () => {
        renderSectionNav({});
        const { getSectionNav } = getTestUtils();
        expect(getSectionNav()).toBeInTheDocument();
      });
    });

    describe('findSectionNav', () => {
      test('throws error if not found', async () => {
        renderSectionNav({ 'data-lgid': 'lg-different-id' });
        try {
          const { findSectionNav } = getTestUtils();
          const _ = await findSectionNav();
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            'message',
            expect.stringMatching(
              /Unable to find an element by: \[data-lgid="lg-section-nav"\]/,
            ),
          );
        }
      });

      test('returns toolbar if found', async () => {
        renderSectionNav({});
        const { findSectionNav } = getTestUtils();
        expect(await findSectionNav()).toBeInTheDocument();
      });
    });

    describe('querySectionNav', () => {
      test('returns null if not found', () => {
        renderSectionNav({ 'data-lgid': 'lg-different-id' });
        const { querySectionNav } = getTestUtils();
        expect(querySectionNav()).not.toBeInTheDocument();
      });

      test('returns toolbar if found', () => {
        renderSectionNav({});
        const { querySectionNav } = getTestUtils();
        expect(querySectionNav()).toBeInTheDocument();
      });
    });

    describe('getAllToolbarIconButtons', () => {
      test('returns all toolbar icon buttons', () => {
        renderSectionNav({});
        const { getAllSectionNavItems } = getTestUtils();
        const items = getAllSectionNavItems();
        expect(items.length).toBe(6);
      });
    });

    describe('getToolbarIconButtonByLabel', () => {
      test('throws error if text is not found', () => {
        renderSectionNav({});
        try {
          const { getSectionNavItemByText } = getTestUtils();
          const _ = getSectionNavItemByText('Hello');
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            'message',
            expect.stringMatching(
              /SectionNavItem with the text content "Hello" could not be found/,
            ),
          );
        }
      });

      describe('getElement', () => {
        test('returns the element', () => {
          renderSectionNav({});
          const { getSectionNavItemByText } = getTestUtils();

          expect(
            getSectionNavItemByText('Section 1')?.getElement(),
          ).toBeInTheDocument();
        });
      });

      describe('isActive', () => {
        test('returns false', () => {
          renderSectionNav({});
          const { getSectionNavItemByText } = getTestUtils();
          expect(getSectionNavItemByText('Section 2')?.isActive()).toBeFalsy();
        });
        test('returns true', () => {
          renderSectionNav({});
          const { getSectionNavItemByText } = getTestUtils();
          expect(getSectionNavItemByText('Section 3')?.isActive()).toBeTruthy();
        });
      });

      describe('getLevel', () => {
        test('returns the default level', () => {
          renderSectionNav({});
          const { getSectionNavItemByText } = getTestUtils();

          expect(getSectionNavItemByText('Section 1')?.getLevel()).toEqual(1);
        });

        test('returns the defined level', () => {
          renderSectionNav({});
          const { getSectionNavItemByText } = getTestUtils();

          expect(getSectionNavItemByText('Section 2')?.getLevel()).toEqual(2);
        });
      });
    });

    describe('getActiveToolbarIconButton', () => {
      test('returns the active ToolbarIconButton', () => {
        renderSectionNav({});
        const { getActiveSectionNavItem } = getTestUtils();

        expect(getActiveSectionNavItem()).toHaveAttribute(
          'data-active',
          'true',
        );
      });

      test('returns undefined', () => {
        render(
          <SectionNav>{renderSectionNavItems({ isActive: false })}</SectionNav>,
        );
        const { getActiveSectionNavItem } = getTestUtils();

        expect(getActiveSectionNavItem()).toBeUndefined();
      });
    });
  });
});
