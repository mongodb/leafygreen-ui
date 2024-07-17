import React from 'react';

import { LGIDS_VERTICAL_STEPPER } from '../constants';
import { State } from '../VerticalStep/VerticalStep.types';

import {
  getBaseStyles,
  getWrapperStyles,
  innerStyles,
} from './VerticalStepActions.styles';
import { VerticalStepActionsProps } from './VerticalStepActions.types';

export const VerticalStepActions = ({
  actions,
  state,
}: VerticalStepActionsProps) => {
  const isCurrent = state === State.Current;

  return (
    <div
      className={getBaseStyles(isCurrent)}
      data-lgid={LGIDS_VERTICAL_STEPPER.stepActions}
      data-testid={LGIDS_VERTICAL_STEPPER.stepActions}
      // @ts-expect-error - react type issue: https://github.com/facebook/react/pull/24730
      inert={!isCurrent ? '' : undefined}
    >
      <div className={innerStyles}>
        <div className={getWrapperStyles(isCurrent)}>{actions}</div>
      </div>
    </div>
  );
};

VerticalStepActions.displayName = 'VerticalStepActions';
