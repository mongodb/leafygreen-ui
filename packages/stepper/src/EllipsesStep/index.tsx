import Tooltip, { Align, Justify } from '@leafygreen-ui/tooltip';
import React from 'react';
import Step from '../InternalStep';
import { useStepperContext } from '../StepperContext';
import { EllipsesStepProps } from './types';
import { stepStyles, tooltipStyles } from './styles';

const EllipsesStep = ({
  state,
  children,
  tooltipContent,
  startingStepIndex,
  ...rest
}: React.PropsWithChildren<EllipsesStepProps>) => {
  const { darkMode } = useStepperContext();

  return (
    <Tooltip
      align={Align.Top}
      justify={Justify.Middle}
      darkMode={darkMode}
      trigger={
        // The <li> needs to be defined here and not in <Stepper> because the Tooltip doesn't trigger without a wrapping HTML element.
        <li>
          <Step
            className={stepStyles(darkMode)[state]}
            state={state}
            tabIndex={0}
            {...rest}
          >
            {children}
          </Step>
        </li>
      }
    >
      <div>
        <ol className={tooltipStyles}>
          {React.Children.map(tooltipContent, (stepContents, i) => (
            <li value={startingStepIndex + i}>{stepContents}</li>
          ))}
        </ol>
      </div>
    </Tooltip>
  );
};

export default EllipsesStep;
