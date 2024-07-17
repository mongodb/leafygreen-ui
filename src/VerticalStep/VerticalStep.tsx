import React from 'react';
import PropTypes from 'prop-types';

import { useDescendant } from '@leafygreen-ui/descendants';

import {
  useVerticalStepperContext,
  VerticalStepperDescendantsContext,
} from '../context';

import { InternalVerticalStep } from './InternalVerticalStep';
import { State, VerticalStepProps } from './VerticalStep.types';

export const VerticalStep = React.forwardRef<HTMLLIElement, VerticalStepProps>(
  ({ ...rest }: VerticalStepProps, forwardRef) => {
    const { index, ref } = useDescendant(
      VerticalStepperDescendantsContext,
      forwardRef,
    );

    const { currentStep, hasVerticalStepperParent } =
      useVerticalStepperContext();

    const getState = (index: number) => {
      if (index === currentStep) return State.Current;
      if (index < currentStep) return State.Completed;
      return State.Future;
    };

    if (!hasVerticalStepperParent) {
      throw Error(
        '`VerticalStep` must be a child of a `VerticalStepper` instance',
      );
    }

    return (
      <InternalVerticalStep
        state={getState(index)}
        ref={ref}
        index={index}
        {...rest}
      />
    );
  },
);

VerticalStep.displayName = 'VerticalStep';

VerticalStep.prototype = {
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  media: PropTypes.element,
  actions: PropTypes.node,
};
