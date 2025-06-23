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
        <SectionNavItem href="#section-1" ref={ref}>
          Section 1
        </SectionNavItem>
      </SectionNav>,
    );
    expect(ref.current).toBeDefined();
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  describe('active', () => {
    test('is true active prop is true', () => {
      render(
        <SectionNav>
          <SectionNavItem active href="#section-1">
            Section 1
          </SectionNavItem>
          <SectionNavItem href="#section-2">Section 2</SectionNavItem>
        </SectionNav>,
      );

      const { getSectionNavItemByText } = getTestUtils();
      const activeItem = getSectionNavItemByText('Section 1');
      expect(activeItem?.isActive()).toBeTruthy();
    });

    test('is false active prop is true', () => {
      render(
        <SectionNav>
          <SectionNavItem active href="#section-1">
            Section 1
          </SectionNavItem>
          <SectionNavItem href="#section-2">Section 2</SectionNavItem>
        </SectionNav>,
      );

      const { getSectionNavItemByText } = getTestUtils();
      const activeItem = getSectionNavItemByText('Section 2');
      expect(activeItem?.isActive()).toBeFalsy();
    });
  });

  describe('level', () => {
    test('is 1 by default', () => {
      render(
        <SectionNav>
          <SectionNavItem href="#section-1">Section 1</SectionNavItem>
          <SectionNavItem href="#section-2">Section 2</SectionNavItem>
        </SectionNav>,
      );

      const { getSectionNavItemByText } = getTestUtils();
      const item = getSectionNavItemByText('Section 1');
      expect(item?.getLevel()).toBe(1);
    });

    test('is 2', () => {
      render(
        <SectionNav>
          <SectionNavItem level={2} href="#section-1">
            Section 1
          </SectionNavItem>
          <SectionNavItem href="#section-2">Section 2</SectionNavItem>
        </SectionNav>,
      );

      const { getSectionNavItemByText } = getTestUtils();
      const item = getSectionNavItemByText('Section 1');
      expect(item?.getLevel()).toBe(2);
    });
  });

  test('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(
      <SectionNav>
        <SectionNavItem onClick={onClick} level={2} href="#section-1">
          Section 1
        </SectionNavItem>
        <SectionNavItem href="#section-2">Section 2</SectionNavItem>
      </SectionNav>,
    );

    const { getSectionNavItemByText } = getTestUtils();
    const item = getSectionNavItemByText('Section 1');
    userEvent.click(item?.getElement()!);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  /* eslint-disable jest/no-disabled-tests */
  test.skip('types behave as expected', () => {
    <>
      <SectionNavItem href="#section-1" active={false} level={2}>
        Section 1
      </SectionNavItem>
    </>;
  });
});
