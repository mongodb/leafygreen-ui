import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SectionNav } from '../SectionNav';
import { getTestUtils } from '../testing';

import { SectionNavItem } from './SectionNavItem';

describe('packages/section-nav-item', () => {
  test('accepts a ref', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <SectionNav>
        <SectionNavItem href="#section-1" ref={ref} label="Section 1" />
      </SectionNav>,
    );
    expect(ref.current).toBeDefined();
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  describe('active', () => {
    test('is true', () => {
      render(
        <SectionNav>
          <SectionNavItem active href="#section-1" label="Section 1" />
          <SectionNavItem href="#section-2" label="Section 2" />
        </SectionNav>,
      );

      const { getSectionNavItemByLabel } = getTestUtils();
      const activeItem = getSectionNavItemByLabel('Section 1');
      expect(activeItem?.isActive()).toBeTruthy();
    });

    test('is false', () => {
      render(
        <SectionNav>
          <SectionNavItem active href="#section-1" label="Section 1" />
          <SectionNavItem href="#section-2" label="Section 2" />
        </SectionNav>,
      );

      const { getSectionNavItemByLabel } = getTestUtils();
      const activeItem = getSectionNavItemByLabel('Section 2');
      expect(activeItem?.isActive()).toBeFalsy();
    });
  });

  test('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(
      <SectionNav>
        <SectionNavItem onClick={onClick} href="#section-1" label="Section 1" />
        <SectionNavItem href="#section-2" label="Section 2" />
      </SectionNav>,
    );

    const { getSectionNavItemByLabel } = getTestUtils();
    const item = getSectionNavItemByLabel('Section 1');
    userEvent.click(item?.getElement()!);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  /* eslint-disable jest/no-disabled-tests */
  test.skip('types behave as expected', () => {
    <>
      {/* @ts-expect-error - label is required */}
      <SectionNavItem href="#section-1" active={false} />

      {/* @ts-expect-error - href is required */}
      <SectionNavItem active={false} label="Section 1" />

      <SectionNavItem href="#section-1" active={false} label="Section 1" />
    </>;
  });
});
