import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { cx } from '@leafygreen-ui/emotion';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import EllipsisIcon from '@leafygreen-ui/icon/dist/Ellipsis';
import {
  completedStepLabelStyle,
  containerStyle,
  currentStepLabelStyle,
  currentStepStyle,
  dataProps,
  hiddenLayerStyle,
  layerStyle,
  previewStyle,
  slideInAnimationStyle,
  slideOutAnimationStyle,
  stepBoxBottomStyle,
  stepBoxStyle,
  stepBoxTopStyle,
  stepLabelStyle,
  stepLabelTextStyle,
  stepStyle,
  stepTextStyle,
  upcomingStepLabelStyle,
  upcomingStepStyle,
} from './styles';

type StepCompletionState = 'completed' | 'current' | 'upcoming';

type InternalStepProps = JSX.IntrinsicElements['div'] & {
  children: React.ReactNode;
  state: StepCompletionState;
  stepLabel?: string;
  isPreview: boolean;
};

function InternalStep({
  children,
  state,
  stepLabel,
  isPreview,
  className,
  ...containerProps
}: InternalStepProps) {
  const isCurrent = state === 'current';
  const isUpcoming = state === 'upcoming';
  const isCompleted = state === 'completed';
  return (
    <div
      className={`${cx(stepStyle, {
        [currentStepStyle]: isCurrent,
        [upcomingStepStyle]: isUpcoming,
        [previewStyle]: isPreview,
      })} ${className}`}
      {...containerProps}
    >
      {stepLabel && (
        <div
          className={cx(stepLabelStyle, {
            [currentStepLabelStyle]: isCurrent,
            [completedStepLabelStyle]: isCompleted,
            [upcomingStepLabelStyle]: isUpcoming,
            [previewStyle]: isPreview,
          })}
        >
          {isCompleted ? (
            <CheckmarkIcon />
          ) : (
              <div className={stepLabelTextStyle}>{stepLabel}</div>
            )}
        </div>
      )}
      <div className={cx(stepTextStyle, { [previewStyle]: isPreview })}>
        {children}
      </div>
      <div className={stepBoxStyle}>
        <span className={stepBoxTopStyle} {...dataProps.stepBoxTop.prop}>
          <div />
        </span>
        <span className={stepBoxBottomStyle} {...dataProps.stepBoxBottom.prop}>
          <div />
        </span>
      </div>
    </div>
  );
}

InternalStep.displayName = 'Step';

type StepItem = InternalStepProps & {
  step: 'previous' | 'next' | number;
};

type StepContents = string | number | Array<StepContents>;

type StepElement = React.ReactElement<{ children: StepContents }>;
export type StepElements = StepElement | Array<StepElement>;

interface StepperProps {
  children: StepElements;
  currentStep: number;
  maxDisplayedSteps?: number;
  className?: string;
}

export function Stepper({
  children,
  currentStep,
  maxDisplayedSteps = Array.isArray(children) ? children.length : 1,
  className,
}: StepperProps) {
  const [visibleLayer, setVisibleLayer] = useState<
    'previous' | 'next' | 'current'
  >('current');

  const allSteps: Array<StepItem> = (Array.isArray(children)
    ? children
    : [children]
  ).map((child, index) => {
    let state: StepCompletionState;

    if (index < currentStep) {
      state = 'completed';
    } else if (index === currentStep) {
      state = 'current';
    } else {
      state = 'upcoming';
    }

    return {
      'aria-label': stepContentsAriaLabel(child.props.children),
      'aria-current': currentStep === index ? 'step' : undefined,
      step: index,
      stepLabel: (index + 1).toString(),
      state,
      children: child,
      isPreview: false,
    };
  });

  const numSteps = allSteps.length;

  const { rangeStart, rangeEnd } = computeRangeToDisplay({
    currentStep,
    numSteps,
    maxDisplayedSteps,
  });
  const currentDisplayedSteps = getStepRange(allSteps, {
    currentStep,
    rangeStart,
    rangeEnd,
  });

  const layerToLayerSteps: Record<string, Array<StepItem>> = {
    current: currentDisplayedSteps,
  };

  if (rangeStart > 0) {
    currentDisplayedSteps[0].onMouseOver = () => {
      setVisibleLayer('previous');
    };

    layerToLayerSteps.previous = getStepRange(allSteps, {
      currentStep,
      ...computeRangeToDisplay({
        currentStep: rangeStart - 1,
        numSteps,
        maxDisplayedSteps,
      }),
    }).map(step => ({ ...step, isPreview: true }));
  }

  if (rangeEnd < numSteps - 1) {
    currentDisplayedSteps[
      currentDisplayedSteps.length - 1
    ].onMouseOver = () => {
      setVisibleLayer('next');
    };

    layerToLayerSteps.next = getStepRange(allSteps, {
      currentStep,
      ...computeRangeToDisplay({
        currentStep: rangeEnd,
        numSteps,
        maxDisplayedSteps,
      }),
    }).map(step => ({ ...step, isPreview: true }));
  }

  Object.entries(layerToLayerSteps).forEach(([layer, layerSteps]) => {
    layerSteps.forEach((step, index) => {
      if (index < layerSteps.length - 1) {
        step.className = cx({
          [slideInAnimationStyle]: visibleLayer === layer,
          [slideOutAnimationStyle]: visibleLayer !== layer,
        });
      }
    });
  });

  return (
    <ol
      className={cx(containerStyle, className)}
      onMouseLeave={() => setVisibleLayer('current')}
    >
      {Object.entries(layerToLayerSteps).map(([layer, layerSteps]) => (
        <li
          key={layer}
          className={cx(layerStyle, {
            [hiddenLayerStyle]: visibleLayer !== layer,
          })}
        >
          {layerSteps.map((props, index) => (
            <InternalStep key={index} {...props} />
          ))}
        </li>
      ))}
    </ol>
  );
}

Stepper.displayName = 'Stepper';

Stepper.propTypes = {
  children: PropTypes.node.isRequired,
  currentStep: PropTypes.number.isRequired,
  maxDisplayedSteps: PropTypes.number,
};

export const Step = function Step({
  children,
}: {
  children: StepContents;
}): StepElement {
  return <>{children}</>;
};

Step.displayName = 'Step';

Step.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
  ]).isRequired,
};

function getStepRange(
  allSteps: Array<StepItem>,
  {
    currentStep,
    rangeStart,
    rangeEnd,
  }: {
    currentStep: number;
    rangeStart: number;
    rangeEnd: number;
  },
): Array<StepItem> {
  const stepRange: Array<StepItem> = [];

  if (rangeStart > 0) {
    stepRange.push({
      'aria-label': 'Previous steps',
      step: 'previous',
      stepLabel: `+${rangeStart}`,
      state: rangeStart > currentStep + 1 ? 'upcoming' : 'completed',
      children: <EllipsisIcon />,
      isPreview: true,
    });
  }

  stepRange.push(
    ...allSteps.slice(rangeStart, rangeEnd).map(step => ({ ...step })),
  );

  if (rangeEnd < allSteps.length) {
    stepRange.push({
      'aria-label': 'Next steps',
      step: 'next',
      stepLabel: `+${allSteps.length - rangeEnd}`,
      state: 'upcoming',
      children: <EllipsisIcon />,
      isPreview: true,
    });
  }

  return stepRange;
}

function stepContentsAriaLabel(contents: StepContents): string {
  return contents instanceof Array
    ? contents.map(content => stepContentsAriaLabel(content)).join('')
    : contents.toString();
}

function computeRangeToDisplay({
  currentStep,
  numSteps,
  maxDisplayedSteps,
}: {
  currentStep: number;
  numSteps: number;
  maxDisplayedSteps: number;
}): { rangeStart: number; rangeEnd: number } {
  if (numSteps <= maxDisplayedSteps) {
    return { rangeStart: 0, rangeEnd: numSteps };
  } else if (currentStep + 1 < maxDisplayedSteps) {
    return {
      rangeStart: 0,
      rangeEnd: maxDisplayedSteps - 1,
    };
  } else if (currentStep > numSteps - maxDisplayedSteps) {
    return {
      rangeStart: numSteps - maxDisplayedSteps + 1,
      rangeEnd: numSteps,
    };
  } else {
    const rangeStart =
      currentStep -
      ((currentStep - maxDisplayedSteps + 1) % (maxDisplayedSteps - 2));
    const rangeEnd = rangeStart + maxDisplayedSteps - 2;

    return {
      rangeStart,
      rangeEnd,
    };
  }
}
