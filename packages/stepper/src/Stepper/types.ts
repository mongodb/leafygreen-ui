import { HTMLElementProps } from '@leafygreen-ui/lib';

export interface StepperProps extends HTMLElementProps<'ol'> {
  /**
   * The index of the step that should be marked as current. (zero-indexed)
   *
   * *NOTE:* Validations for this prop's value in relation to `completedStepsShown` and `maxDisplayedSteps` are not yet implemented.
   */
  currentStep: number;
  /**
   * Maximum number of steps displayed in the stepper. Includes the ellipses steps.
   *
   * *NOTE:* Validations for this prop's value in relation to `completedStepsShown` and `currentStep` are not yet implemented.
   *
   * @default children.length | 1
   */
  maxDisplayedSteps?: number;
  /**
   * Number of completed steps shown before the upcoming steps are displayed. Includes the ellipses step for prior steps.
   *
   * *NOTE:* Validations for this prop's value in relation to `maxDisplayedSteps` and `currentStep` are not yet implemented.
   */
  completedStepsShown?: number;
  darkMode?: boolean;
  className?: string;
}
