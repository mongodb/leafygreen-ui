import Tooltip, { TriggerEvent, Align, Justify } from '@leafygreen-ui/tooltip';
import React from 'react';
import Step from './NewStep';
import { StepProps } from './types';

export type EllipseStepProps = StepProps & {
  tooltipContent: Array<
    React.ReactChild | React.ReactFragment | React.ReactPortal
  >;
};

const EllipseStep = (props: React.PropsWithChildren<EllipseStepProps>) => {
  return (
    <Tooltip
      align={Align.Top}
      justify={Justify.Middle}
      trigger={<Step {...props}>{props.children}</Step>}
      triggerEvent={TriggerEvent.Hover}
    >
      <ol>
        {React.Children.map(props.tooltipContent, (stepContents, i) => (
          <li>{stepContents}</li>
        ))}
      </ol>
    </Tooltip>
  );
};

export default EllipseStep;
