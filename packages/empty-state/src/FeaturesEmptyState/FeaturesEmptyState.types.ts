import { ReactChild, ReactElement } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export interface FeaturesEmptyStateProps extends DarkModeProps {
  /**
   * Heading text
   */
  title: string;

  /**
   * Array of Feature objects (length should be 2 or 3 elements)
   */
  features: Array<Feature>;

  /**
   * Optional CTA button
   */
  PrimaryButton?: ReactElement;

  /**
   * Optional CTA button. Secondary button should only exist when a primaryButton exists.
   */
  SecondaryButton?: ReactElement;

  /**
   * Optional link to external page for additional information
   */
  InfoLink?: ReactElement;
}

export interface Feature {
  /**
   * Thumbnail image element
   */
  thumbnail?: ReactElement;

  /**
   * Heading text
   */
  title: string;

  /**
   * Secondary text
   */
  description: ReactChild;
}
