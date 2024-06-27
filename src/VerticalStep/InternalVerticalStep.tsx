import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Body, Description } from '@leafygreen-ui/typography';

import { LGIDS_VERTICAL_STEPPER } from '../constants';
import { StepIcon } from '../StepIcon';
import { VerticalStepButtons } from '../VerticalStepButtons/VerticalStepButtons';

import {
  baseStyles,
  contentClassName,
  getContentStyles,
  getInnerStyles,
  getTitleStyles,
  getWrapperStyles,
  mediaStyles,
} from './VerticalStep.styles';
import { InternalVerticalStepProps, State } from './VerticalStep.types';

/**
 * @internal
 */

export const InternalVerticalStep = React.forwardRef<
  HTMLLIElement,
  InternalVerticalStepProps
>(
  (
    {
      title,
      description,
      media,
      primaryButtonProps,
      secondaryButtonProps,
      state,
      index,
      className,
      ...rest
    }: InternalVerticalStepProps,
    forwardRef,
  ) => {
    const { theme } = useDarkMode();

    const isCompleted = state === State.Completed;
    const isCurrent = state === State.Current;
    const hasButtons = primaryButtonProps;

    return (
      <li
        ref={forwardRef}
        className={cx(baseStyles, className)}
        {...rest}
        aria-current={isCurrent ? 'step' : false}
        data-state={state}
        data-lgid={LGIDS_VERTICAL_STEPPER.step}
        data-testid={LGIDS_VERTICAL_STEPPER.step}
      >
        <StepIcon isCompleted={isCompleted} state={state} index={index} />
        <div
          className={cx(
            contentClassName,
            getContentStyles(isCurrent, !!hasButtons),
          )}
        >
          <Body
            baseFontSize={BaseFontSize.Body2}
            className={getTitleStyles(theme, state)}
            data-lgid={LGIDS_VERTICAL_STEPPER.stepTitle}
            data-testid={LGIDS_VERTICAL_STEPPER.stepTitle}
          >
            {title}
          </Body>

          <div
            // @ts-expect-error - react type issue: https://github.com/facebook/react/pull/24730
            inert={isCompleted ? 'true' : null}
            className={getWrapperStyles(isCompleted)}
          >
            <div className={getInnerStyles(!!media)}>
              <Description
                data-lgid={LGIDS_VERTICAL_STEPPER.stepDescription}
                data-testid={LGIDS_VERTICAL_STEPPER.stepDescription}
              >
                {description}
              </Description>
              {media && (
                <div
                  className={mediaStyles}
                  data-lgid={LGIDS_VERTICAL_STEPPER.stepMedia}
                  data-testid={LGIDS_VERTICAL_STEPPER.stepMedia}
                >
                  {media}
                </div>
              )}
              {hasButtons && (
                <VerticalStepButtons
                  primaryButtonProps={primaryButtonProps}
                  secondaryButtonProps={secondaryButtonProps}
                  state={state}
                />
              )}
            </div>
          </div>
        </div>
      </li>
    );
  },
);

InternalVerticalStep.displayName = 'InternalVerticalStep';
