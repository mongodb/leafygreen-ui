import React from 'react';
import PropTypes from 'prop-types';
import { transparentize } from 'polished';
import { css, cx } from '@leafygreen-ui/emotion';
import EllipsisIcon from '@leafygreen-ui/icon/dist/Ellipsis';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import { uiColors } from '@leafygreen-ui/palette';

interface InternalStepProps {
  ariaLabel: string;
  children: React.ReactNode;
  state: 'completed' | 'current' | 'upcoming';
  stepLabel: string | null;
  allowShadow: boolean;
}

const upcomingStepStyle = css`
  background-color: ${uiColors.gray.light3};
  border-color: ${uiColors.gray.light2};
  color: ${uiColors.gray.base};

  &:first-of-type {
    border-left: 1px solid ${uiColors.gray.light2};
  }

  &:last-of-type {
    border-right: 1px solid ${uiColors.gray.light2};
  }

  svg:not([role='img']) {
    fill: ${uiColors.gray.light3};
    stroke: ${uiColors.gray.light2};
  }
`;

const stepStyle = css`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;

  border-bottom: 1px solid #dee0e3;
  border-top: 1px solid #dee0e3;
  background-color: white;
  color: ${uiColors.gray.dark3};

  font-family: Akzidenz, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: bold;
  text-align: center;

  transition: none;

  &:first-of-type {
    border-left: 1px solid #dee0e3;
  }

  &:last-of-type {
    border-right: 1px solid #dee0e3;

    svg:not([role='img']) {
      display: none;
    }
  }

  svg:not([role='img']) {
    height: 100%;
    fill: white;
    stroke: #dee0e3;

    transition: none;
  }
`;

const shadowedStepStyle = css`
  box-shadow: 2px 4px 10px -4px ${transparentize(0.7, uiColors.black)};

  transition: all 300ms;

  svg {
    transition: all 300ms;

    // drop-shadow does not support spread-radius, so we decrease blur radius :/
    filter: drop-shadow(0px 4px 4px ${transparentize(0.7, uiColors.black)});
  }
`;

const relativelyPositionChildStyle = css`
  position: relative;
  height: 100%;

  > * {
    position: absolute;
  }
`;

const stepLabelStyle = css`
  left: 0;
  right: 0;
  top: 2px;

  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  height: 24px;
  min-width: 24px;
  max-width: max-content;

  font-size: 12px;
  line-height: 14px;

  border-radius: 12px;
  border: 1px solid;

  transition: all 300ms;
`;

const completedStepLabelStyle = css`
  background-color: white;
  border-color: ${uiColors.green.base};
  color: ${uiColors.green.base};

  svg {
    margin: auto;
  }
`;

const currentStepLabelStyle = css`
  background-color: ${uiColors.gray.dark2};
  border-color: #464c4f;
  color: white;
`;

const upcomingStepLabelStyle = css`
  background-color: white;
  border-color: ${uiColors.gray.light1};
  color: ${uiColors.gray.base};
`;

const stepBoxStyle = css('width: 100%;');

const stepLabelTextStyle = css('padding: 0 8px;');

function InternalStep({
  ariaLabel,
  children,
  state,
  stepLabel,
  allowShadow,
}: InternalStepProps) {
  const isCurrent = state === 'current';
  const isUpcoming = state === 'upcoming';
  const isCompleted = state === 'completed';
  return (
    <div
      aria-current={isCurrent ? 'step' : undefined}
      aria-label={ariaLabel}
      className={cx(
        stepStyle,
        isUpcoming ? upcomingStepStyle : '',
        allowShadow && isCurrent ? shadowedStepStyle : '',
      )}
    >
      <div aria-hidden className={stepBoxStyle}>
        {children}
        {stepLabel && (
          <div className={relativelyPositionChildStyle}>
            <div
              className={cx(
                stepLabelStyle,
                state === 'current'
                  ? currentStepLabelStyle
                  : isCompleted
                  ? completedStepLabelStyle
                  : upcomingStepLabelStyle,
              )}
            >
              {isCompleted ? (
                <CheckmarkIcon />
              ) : (
                <div className={stepLabelTextStyle}>{stepLabel}</div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className={relativelyPositionChildStyle}>
        <svg viewBox="0 0 15 46">
          <path d="m0,0 L15,23 L0,46" />
        </svg>
      </div>
    </div>
  );
}

InternalStep.displayName = 'Step';

type StepContents = string | number | Array<StepContents>;
function stepContentsAriaLabel(contents: StepContents): string {
  return contents instanceof Array
    ? contents.map(content => stepContentsAriaLabel(content)).join(' ')
    : contents.toString();
}

type StepElement = React.ReactElement<{ children: StepContents }>;

interface StepperProps {
  children: StepElement | Array<StepElement>;
  currentStep?: number;
  maxDisplayed?: number;
}

interface StepItem {
  ariaLabel: string;
  step: number | 'previous' | 'next';
  children: React.ReactNode;
}

function computeRangeToDisplay({
  currentStep,
  numSteps,
  maxDisplayed,
}: {
  currentStep: number;
  numSteps: number;
  maxDisplayed: number;
}): { rangeStart: number; rangeEnd: number } {
  if (numSteps <= maxDisplayed) {
    return { rangeStart: 0, rangeEnd: numSteps };
  } else if (currentStep < maxDisplayed) {
    return {
      rangeStart: 0,
      rangeEnd: maxDisplayed - 1,
    };
  } else if (currentStep > numSteps - maxDisplayed + 1) {
    return {
      rangeStart: numSteps - maxDisplayed + 1,
      rangeEnd: numSteps,
    };
  } else {
    const currentRange =
      currentStep -
      maxDisplayed -
      ((currentStep - maxDisplayed) % (maxDisplayed - 2));
    const rangeStart = maxDisplayed - 2 + currentRange + 1;
    const rangeEnd = rangeStart + maxDisplayed - 2;

    return {
      rangeStart,
      rangeEnd,
    };
  }
}

const layerStyle = css`
  display: flex;
  height: 46px;
  width: 100%;
  position: absolute;
`;

const placeholderStyle = css`
  width: 100%;
`;

function getState(step: number | 'previous' | 'next', currentStep: number) {
  if (step === 'previous' || step < currentStep) {
    return 'completed';
  } else if (step === currentStep) {
    return 'current';
  } else {
    return 'upcoming';
  }
}

export default function Stepper({
  children,
  currentStep = 1,
  maxDisplayed = 5,
}: StepperProps) {
  const allSteps = (children instanceof Array ? children : [children]).map(
    (child, index) => ({
      ariaLabel: stepContentsAriaLabel(child.props.children),
      step: index + 1,
      children: child,
    }),
  );

  const numSteps = allSteps.length;

  const { rangeStart, rangeEnd } = computeRangeToDisplay({
    currentStep,
    numSteps,
    maxDisplayed,
  });

  const range: Array<StepItem> = [];

  if (rangeStart > 0) {
    range.push({
      ariaLabel: 'More items...',
      step: 'previous',
      children: <EllipsisIcon />,
    });
  }

  range.push(...allSteps.slice(rangeStart, rangeEnd));

  if (rangeEnd < numSteps) {
    range.push({
      ariaLabel: 'More items...',
      step: 'next',
      children: <EllipsisIcon />,
    });
  }

  return (
    <div aria-label="breadcrumbs" className={css('position: relative;')}>
      <div aria-hidden className={cx(layerStyle, css('z-index: -1;'))}>
        {range.map(({ step, children, ariaLabel }, index) => (
          <InternalStep
            key={index}
            ariaLabel={ariaLabel}
            state={getState(step, currentStep)}
            stepLabel={
              step === 'next' || step > currentStep
                ? step === 'next'
                  ? `+${numSteps - rangeEnd}`
                  : step.toString()
                : null
            }
            allowShadow={true}
          >
            {children}
          </InternalStep>
        ))}
      </div>
      <div className={layerStyle}>
        {range.map(({ step, children, ariaLabel }, index) =>
          step === 'next' || step > currentStep ? (
            <div
              key={index}
              aria-label={ariaLabel}
              className={placeholderStyle}
            />
          ) : (
            <InternalStep
              key={index}
              ariaLabel={ariaLabel}
              state={getState(step, currentStep)}
              stepLabel={
                step === 'previous' ? `+${rangeStart}` : step.toString()
              }
              allowShadow={false}
            >
              {children}
            </InternalStep>
          ),
        )}
      </div>
    </div>
  );
}

Stepper.displayName = 'Stepper';

Stepper.propTypes = {
  children: PropTypes.node,
};

export const Step = function ExternalStep({
  children,
}: {
  children: StepContents;
}): StepElement {
  return <>{children}</>;
};

Step.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
