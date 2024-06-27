import { ComponentPropsWithRef } from 'react';

import { ButtonProps } from '@leafygreen-ui/button';

type CustomConfirmButtonProps = Omit<ButtonProps, 'variant'>;

export interface VerticalStepProps extends ComponentPropsWithRef<'li'> {
  /**
   * The title of the step
   */
  title: string;

  /**
   * The description of the step. This will render below the title
   */
  description: React.ReactNode;

  /**
   * The image to the right of the text
   */
  media?: React.ReactNode;

  /**
   * The right-most button under the description. An object that accepts all `Button` props but excludes `variant`. If there is a secondary button, the `variant` is `primary`. If there isn’t a secondary button, the `variant` is `default`.
   */
  primaryButtonProps?: CustomConfirmButtonProps;

  /**
   * The button to the left of the primary button. An object that accepts all `Button` props but excludes `variant`. The `variant` is always `default`.
   */
  secondaryButtonProps?: CustomConfirmButtonProps;
}

export const State = {
  Current: 'current',
  Completed: 'completed',
  Future: 'future',
} as const;

export type State = (typeof State)[keyof typeof State];

export interface InternalVerticalStepProps extends VerticalStepProps {
  /**
   * The internal state of the step
   */
  state: State;

  /**
   * The index of the step
   */
  index: number;
}
