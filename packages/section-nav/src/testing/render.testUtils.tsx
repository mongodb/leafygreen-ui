import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { SectionNav, SectionNavProps } from '../SectionNav';
import { SectionNavItem } from '../SectionNavItem';

export const renderSectionNavItems = ({
  isActive = true,
  hasExtraItems = false,
}: {
  isActive?: boolean;
  hasExtraItems?: boolean;
}) => (
  <>
    <SectionNavItem href="#section-1">Section 1</SectionNavItem>
    <SectionNavItem level={2} href="#section-2">
      Section 2
    </SectionNavItem>
    <SectionNavItem active={isActive} href="#section-3">
      Section 3
    </SectionNavItem>
    <SectionNavItem href="#section-4">Section 4</SectionNavItem>
    <SectionNavItem level={2} href="#section-5">
      Section 5
    </SectionNavItem>
    <SectionNavItem level={2} href="#section-6">
      Section 6
    </SectionNavItem>
    {hasExtraItems && (
      <>
        <SectionNavItem href="#section-7">Section 7</SectionNavItem>
        <SectionNavItem level={2} href="#section-8">
          Section 8
        </SectionNavItem>
      </>
    )}
  </>
);

export const renderSectionNav = ({
  ...props
}: Omit<SectionNavProps, 'children'>): RenderResult => {
  return render(
    <SectionNav {...props}>{renderSectionNavItems({})}</SectionNav>,
  );
};
