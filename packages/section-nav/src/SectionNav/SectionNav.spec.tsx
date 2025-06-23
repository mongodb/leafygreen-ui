import React, { createRef } from 'react';
import { axe } from 'jest-axe';

import { SectionNavItem } from '../SectionNavItem';
import { getTestUtils, renderSectionNav } from '../testing';

import { SectionNav } from './SectionNav';

describe('packages/section-nav', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderSectionNav({});
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  test('renders the title', async () => {
    renderSectionNav({ title: 'On this page' });
    const { getTitle } = getTestUtils();
    expect(getTitle()?.textContent).toBe('On this page');
  });

  test('renders the correct number of items', () => {
    renderSectionNav({});
    const { getAllSectionNavItems } = getTestUtils();
    const items = getAllSectionNavItems();
    expect(items.length).toBe(6);
  });

  test('accepts a ref', () => {
    const ref = createRef<HTMLElement>();
    renderSectionNav({ ref });
    expect(ref.current).toBeDefined();
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  /* eslint-disable jest/no-disabled-tests */
  test.skip('types behave as expected', () => {
    <>
      {/* @ts-expect-error - children are required */}
      <SectionNav />;{/* @ts-expect-error - children are required */}
      <SectionNav title={'On this page'} />;
      <SectionNav title={'On this page'}>
        <SectionNavItem href="#section-1">Section 1</SectionNavItem>
        <SectionNavItem href="#section-2">Section 2</SectionNavItem>
      </SectionNav>
    </>;
  });
});
