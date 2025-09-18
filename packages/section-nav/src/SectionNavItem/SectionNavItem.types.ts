import React from 'react';

export interface SectionNavItemProps
  extends Omit<React.ComponentProps<'a'>, 'href'> {
  /**
   *  Whether the item is active.
   */
  active?: boolean;

  /**
   * The heading label.
   */
  label: React.ReactNode;

  /**
   * The id of the heading. This should be an id on the current page.
   */
  href: string;
}
