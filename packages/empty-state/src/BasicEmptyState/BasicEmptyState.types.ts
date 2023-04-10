import { ReactChild, ReactElement } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

interface EmptyStateWithCTAProps {
  /**
   * Optional CTA button
   */
  primaryButton: ReactElement;

  /**
   * Optional button. Secondary button should only exist when a primaryButton exists.
   */
  secondaryButton?: ReactElement;
}

interface EmptyStateWithoutCTAProps {
  /**
   * Optional CTA button
   */
  primaryButton?: undefined;
  /**
   * Optional button. Secondary button should only exist when a primaryButton exists.
   */
  secondaryButton?: undefined;
}

type BasicEmptyStateBaseProps = DarkModeProps & {
  /**
   * Graphic shown left of text content. The component is designed to be used with MongoDB marketing-approved graphics.
   */
  graphic?: ReactElement;

  /**
   * Heading text
   */
  title: string;

  /**
   * Secondary text
   */
  description: ReactChild;

  /**
   * Optional link to external page for additional information
   */
  externalLink?: ReactElement;
};

export type BasicEmptyStateProps =
  | (BasicEmptyStateBaseProps & EmptyStateWithoutCTAProps)
  | (BasicEmptyStateBaseProps & EmptyStateWithCTAProps);
