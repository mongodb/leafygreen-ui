import { ReactChild, ReactElement } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export type FeaturesEmptyStateProps = DarkModeProps & {
  /**
   * Heading text
   */
  title: string;

  /**
   * Optional CTA button
   */
  primaryButton: ReactElement;

  /**
   * Optional secondary button
   */
  secondaryButton?: ReactElement;

  /**
   * Array of Feature objects (length should be 2 or 3 elements)
   */
  features: Array<Feature>;

  /**
   * Optional link to external page for additional information
   */
  externalLink?: ReactElement;
};

export interface Feature {
  /**
   * Image element for feature. This prop is designed to be used with MongoDB marketing-approved graphics.
   */
  graphic: ReactElement;

  /**
   * Heading text
   */
  title: string;

  /**
   * Secondary text
   */
  description: ReactChild;
}
