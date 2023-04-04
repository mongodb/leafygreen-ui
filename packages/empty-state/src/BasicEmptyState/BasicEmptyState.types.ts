import { ReactChild, ReactElement } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export interface BasicEmptyStateProps extends DarkModeProps {
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
  ExternalLink?: ReactElement;
}
