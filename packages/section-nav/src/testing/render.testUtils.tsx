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
    <SectionNavItem href="#section-1" label="Section 1">
      <SectionNavItem href="#section-1.1" label="Section 1.1" />
    </SectionNavItem>
    <SectionNavItem href="#section-2" label="Section 2 and some extra" />
    <SectionNavItem active={isActive} href="#section-3" label="Section 3">
      <SectionNavItem href="#section-3.1" label="Section 3.1" />
      <SectionNavItem href="#section-3.2" label="Section 3.2">
        <SectionNavItem href="#section-3.2.1" label="Section 3.2.1" />
      </SectionNavItem>
    </SectionNavItem>
    {hasExtraItems && (
      <>
        <SectionNavItem href="#section-4" label="Section 4">
          <SectionNavItem href="#section-4.1" label="Section 4.1" />
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
