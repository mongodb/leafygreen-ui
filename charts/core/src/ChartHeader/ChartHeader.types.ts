import React from 'react';

export interface ChartHeaderProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  /**
   * The title of the chart
   */
  title: React.ReactNode;

  /**
   * Icon to be rendered directly to the right of the title.
   */
  titleIcon?: React.ReactNode;

  /**
   * Whether to display divider line on top of header.
   */
  showDivider?: boolean;

  /**
   * Content to be rendered to the right of the label.
   */
  headerContent?: React.ReactNode;
}
