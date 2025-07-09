import React from 'react';
import { render } from '@testing-library/react';

import { SectionNav } from '../SectionNav';

import { getTestUtils } from './getTestUtils';
import { renderSectionNav, renderSectionNavItems } from './render.testUtils';

describe('packages/section-nav/getTestUtils', () => {
  describe('single SectionNav', () => {
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
              /Unable to find an element by: \[data-lgid="lg-section_nav"\]/,
            ),
          );
        }
      });

      test('returns SectionNav if found', () => {
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
              /Unable to find an element by: \[data-lgid="lg-section_nav"\]/,
            ),
          );
        }
      });

      test('returns SectionNav if found', async () => {
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

      test('returns SectionNav if found', () => {
        renderSectionNav({});
        const { querySectionNav } = getTestUtils();
        expect(querySectionNav()).toBeInTheDocument();
      });
    });

    describe('getTitle', () => {
      test('returns the title element', () => {
        renderSectionNav({ title: 'On this page' });
        const { getSectionTitle } = getTestUtils();
        expect(getSectionTitle()?.textContent).toBe('On this page');
      });

      test('returns null', () => {
        renderSectionNav({});
        const { getSectionTitle } = getTestUtils();
        expect(getSectionTitle()).toBeNull();
      });
    });

    describe('getAllSectionNavItems', () => {
      test('returns all SectionNavItems', () => {
        renderSectionNav({});
        const { getAllSectionNavItems } = getTestUtils();
        const items = getAllSectionNavItems();
        expect(items.length).toBe(7);
      });
    });

    describe('getSectionNavItemByLabel', () => {
      test('throws error if text is not found', () => {
        renderSectionNav({});
        try {
          const { getSectionNavItemByLabel } = getTestUtils();
          const _ = getSectionNavItemByLabel('Hello');
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
          const { getSectionNavItemByLabel } = getTestUtils();

          expect(
            getSectionNavItemByLabel('Section 1')?.getElement(),
          ).toBeInTheDocument();
        });
      });

      describe('isActive', () => {
        test('returns false', () => {
          renderSectionNav({});
          const { getSectionNavItemByLabel } = getTestUtils();
          expect(getSectionNavItemByLabel('Section 2')?.isActive()).toBeFalsy();
        });
        test('returns true', () => {
          renderSectionNav({});
          const { getSectionNavItemByLabel } = getTestUtils();
          expect(
            getSectionNavItemByLabel('Section 3')?.isActive(),
          ).toBeTruthy();
        });
      });
    });

    describe('getActiveSectionNavItem', () => {
      test('returns the active SectionNavItem', () => {
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
