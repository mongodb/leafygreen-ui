import React from 'react';

import Button, { Variant } from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';

import { LGIDS_VERTICAL_STEPPER } from '../constants';
import { State } from '../VerticalStep/VerticalStep.types';

import {
  getBaseStyles,
  getWrapperStyles,
  innerStyles,
} from './VerticalStepButtons.styles';
import { VerticalStepperButtonProps } from './VerticalStepButtons.types';

export const VerticalStepButtons = ({
  primaryButtonProps,
  secondaryButtonProps,
  state,
}: VerticalStepperButtonProps) => {
  const isCurrent = state === State.Current;

  return (
    <div className={cx(getBaseStyles(isCurrent))}>
      <div className={cx(innerStyles)}>
        <div className={cx(getWrapperStyles(isCurrent))}>
          {primaryButtonProps && secondaryButtonProps && (
            <Button
              data-lgid={LGIDS_VERTICAL_STEPPER.stepSecondaryButton}
              data-testid={LGIDS_VERTICAL_STEPPER.stepSecondaryButton}
              tabIndex={!isCurrent ? -1 : 0} // Prevent keyboard interaction when the step is not current
              {...secondaryButtonProps}
              variant={Variant.Default}
            />
          )}
          {primaryButtonProps && (
            <Button
              data-lgid={LGIDS_VERTICAL_STEPPER.stepPrimaryButton}
              data-testid={LGIDS_VERTICAL_STEPPER.stepPrimaryButton}
              tabIndex={!isCurrent ? -1 : 0} // Prevent keyboard interaction when the step is not current
              {...primaryButtonProps}
              variant={secondaryButtonProps ? Variant.Primary : Variant.Default}
            />
          )}
        </div>
      </div>
    </div>
  );
};

VerticalStepButtons.displayName = 'VerticalStepButtons';
