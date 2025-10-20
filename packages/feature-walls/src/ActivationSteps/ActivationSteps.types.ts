import {
  VerticalStepperProps,
  VerticalStepProps,
} from '@leafygreen-ui/vertical-stepper';

import { SectionProps } from '../Section';

export interface ActivationStep extends VerticalStepProps {}

export type ActivationStepsProps = Omit<SectionProps, 'renderInCard'> &
  Pick<VerticalStepperProps, 'currentStep'> & {
    /**
     * Optional text that renders at the bottom of the section when all steps are completed
     * @default "You've completed all steps!"
     */
    completedMessage?: string;

    /**
     * Required array of activationStep objects
     */
    steps: Array<ActivationStep>;
  };
