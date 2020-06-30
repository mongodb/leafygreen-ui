import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { transparentize } from 'polished';
import { css, cx } from '@leafygreen-ui/emotion';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import EllipsisIcon from '@leafygreen-ui/icon/dist/Ellipsis';
import { uiColors } from '@leafygreen-ui/palette';

type StepCompletionState = 'completed' | 'current' | 'upcoming';

type InternalStepProps = JSX.IntrinsicElements['div'] & {
  children: React.ReactNode;
  state: StepCompletionState;
  stepLabel?: string;
};

const layerStyle = css`
  display: flex;
  position: absolute;
  height: 100%;
  width: 100%;
  transition: opacity 700ms, visibility 700ms;
`;

const stepBoxStyle = css`
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;

  // Safari doesn't correctly position absolutely positioned elements inside flex containers
  // https://developers.google.com/web/updates/2016/06/absolute-positioned-children
  left: 0;
  top: 0;
`;

const stepBoxHalfStyle = css`
  display: inline-block;

  height: 50%;
  width: calc(100% - ${46 / 3}px);

  & > *,
  &:before,
  &:after {
    display: inline-block;
    height: 100%;
    background: white;
    border: 1px solid #dee0e3;
  }

  & > * {
    width: calc(100% - ${46 / 3}px);
    margin-right: -${46 / 3}px;
    border-left: none;
    border-right: none;
  }

  &:before,
  &:after {
    content: '';
    width: ${46 / 3}px;
  }

  &:before {
    border-right: none;
  }

  &:after {
    border-left: none;
  }
`;

const stepBoxTopStyle = css`
  ${stepBoxHalfStyle};

  & > * {
    border-bottom: none;
  }

  &:before,
  &:after {
    border-bottom: none;
    transform-origin: 50% 0%;
    transform: skewX(${Math.atan(2 / 3)}rad);
  }
`;

const stepBoxBottomStyle = css`
  ${stepBoxHalfStyle};

  & > * {
    border-top: none;
  }

  &:before,
  &:after {
    border-top: none;
    transform-origin: 50% 100%;
    transform: skewX(${-Math.atan(2 / 3)}rad);
  }
`;

const stepStyle = css`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin-left: -${46 / 3 + 1}px;

  color: ${uiColors.gray.dark3};

  font-family: Akzidenz, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: bold;

  z-index: 2;

  &:first-of-type {
    .${stepBoxTopStyle}, .${stepBoxBottomStyle} {
      &:before {
        transform: none;
      }
    }
  }

  &:last-of-type {
    .${stepBoxTopStyle}, .${stepBoxBottomStyle} {
      &:before,
      &:after {
        transform: none;
      }
    }
  }
`;

const currentStepStyle = css`
  filter: drop-shadow(0px 4px 4px ${transparentize(0.7, uiColors.black)});
  z-index: 3;

  &:last-of-type:not(:first-of-type) {
    .${stepBoxTopStyle}:before {
      transform: skewX(${Math.atan(2 / 3)}rad);
    }

    .${stepBoxBottomStyle}:before {
      transform: skewX(-${Math.atan(2 / 3)}rad);
    }
  }
`;

const upcomingStepStyle = css`
  color: ${uiColors.gray.base};
  z-index: 1;

  &:last-of-type {
    z-index: 0;
  }

  .${stepBoxTopStyle}, .${stepBoxBottomStyle} {
    & > *,
    &:before,
    &:after {
      background: ${uiColors.gray.light3};
      border-color: ${uiColors.gray.light2};
    }
  }
`;

const hiddenLayerStyle = css`
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
`;

const slideInAnimationStyle = css`
  left: 0;
  transition: left 700ms;
`;

const slideOutAnimationStyle = css`
  left: -30px;
  transition: left 700ms;
`;

const containerStyle = css`
  position: relative;
  height: 46px;
  width: 100%;
`;

const stepLabelStyle = css`
  display: flex;
  position: absolute;

  align-items: center;
  justify-content: center;
  top: calc(100% - 12px);

  height: 24px;
  min-width: 24px;
  max-width: max-content;

  font-size: 12px;
  line-height: 14px;

  border-radius: 12px;
  border: 1px solid;
`;

const completedStepLabelStyle = css`
  background-color: white;
  border-color: ${uiColors.green.base};
  color: ${uiColors.green.base};
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

const stepLabelTextStyle = css('padding: 0 8px;');

function InternalStep({
  children,
  state,
  stepLabel,
  className,
  ...containerProps
}: InternalStepProps) {
  const isCurrent = state === 'current';
  const isUpcoming = state === 'upcoming';
  const isCompleted = state === 'completed';
  return (
    <div
      className={cx(
        stepStyle,
        { [upcomingStepStyle]: isUpcoming },
        { [currentStepStyle]: isCurrent },
        className,
      )}
      {...containerProps}
    >
      {stepLabel && (
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
      )}
      {children}
      <div className={stepBoxStyle}>
        <span className={stepBoxTopStyle}>
          <div />
        </span>
        <span className={stepBoxBottomStyle}>
          <div />
        </span>
      </div>
    </div>
  );
}

InternalStep.displayName = 'Step';

type StepContents = string | number | Array<StepContents>;

function stepContentsAriaLabel(contents: StepContents): string {
  return contents instanceof Array
    ? contents.map(content => stepContentsAriaLabel(content)).join('')
    : contents.toString();
}

type StepElement = React.ReactElement<{ children: StepContents }>;
export type StepElements = StepElement | Array<StepElement>;

interface StepperProps {
  children: StepElements;
  currentStep: number;
  maxDisplayedSteps: number;
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

type StepItem = InternalStepProps & {
  step: 'previous' | 'next' | number;
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
    });
  }

  return stepRange;
}

export default function Stepper({
  children,
  currentStep,
  maxDisplayedSteps,
}: StepperProps) {
  const [visibleLayer, setVisibleLayer] = useState<
    'previous' | 'next' | 'current'
  >('current');

  const allSteps: Array<StepItem> = (children instanceof Array
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
    });
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
    });
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
    <div
      aria-label="breadcrumbs"
      className={containerStyle}
      onMouseLeave={() => setVisibleLayer('current')}
    >
      {Object.entries(layerToLayerSteps).map(([layer, layerSteps]) => (
        <div
          key={layer}
          className={cx(layerStyle, {
            [hiddenLayerStyle]: visibleLayer !== layer,
          })}
        >
          {layerSteps.map((props, index) => (
            <InternalStep key={index} {...props}></InternalStep>
          ))}
        </div>
      ))}
    </div>
  );
}

Stepper.displayName = 'Stepper';

Stepper.propTypes = {
  children: PropTypes.node.isRequired,
};

export const Step = function Step({
  children,
}: {
  children: StepContents;
}): StepElement {
  return <>{children}</>;
};

Step.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
  ]).isRequired,
};
