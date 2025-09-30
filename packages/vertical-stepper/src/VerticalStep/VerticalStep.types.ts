import { ComponentPropsWithRef } from 'react';

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
   * Optional buttons that will render below the text
   */
  actions?: React.ReactNode;
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
