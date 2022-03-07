import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { StepCompletionStates, StepProps } from './types';
import StepIcon from './StepIcon';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

export const Step = function Step({
  children,
  index,
  state,
  shouldDisplayLine = true,
  iconSize = 20,
  className,
}: StepProps) {
  const isCurrent = state === StepCompletionStates.Current;

  const baseStyles = css`
    display: flex;
    width: fit-content;
    margin: auto;
    flex-direction: column;
    align-items: center;
    padding-bottom: ${spacing[1]}px;
    position: relative; // for the :after line

    ${shouldDisplayLine &&
    `
      &:after {
        content: '';
        height: 1px;
        width: 100%;
        position: absolute;
        top: ${iconSize / 2}px;
        left: 50%;
        z-index: -1;
        background-color: ${palette.gray.base};
      }
    `}
  `;

  const completedMultipleStyles = css`
    [as='label'] {
      color: ${palette.green.dark2};
      text-decoration-line: underline;
      text-decoration-style: dotted;
      text-underline-position: under;
    }
  `;

  const completedStyles = css`
    color: ${palette.green.dark2};
  `;

  const currentStyles = css`
    [as='label'] {
      color: ${palette.green.dark3};
    }
  `;

  const upcomingStyles = css`
    [as='label'] {
      color: ${palette.gray.dark1};
    }
  `;

  const upcomingMultipleStyles = css`
    [as='label'] {
      text-decoration-line: underline;
      text-decoration-style: dotted;
      text-underline-position: under;
      color: ${palette.gray.dark1};
    }
  `;

  const styles = {
    [StepCompletionStates.CompletedMultiple]: completedMultipleStyles,
    [StepCompletionStates.Completed]: completedStyles,
    [StepCompletionStates.Current]: currentStyles,
    [StepCompletionStates.Upcoming]: upcomingStyles,
    [StepCompletionStates.UpcomingMultiple]: upcomingMultipleStyles,
  };

  return (
    // TODO: Currently, the Tooltip trigger only works when the <Step> component is wrapped in a <div>.
    // This is bad semantics as the <Step> component's <li> should be a direct child to the <Stepper>'s <ol>.
    <div role="listitem" className={cx(baseStyles, styles[state], className)}>
      <StepIcon state={state} content={index} />
      {/* NOTE: `<Body as="label" /> currently does not render an actual <label /> */}
      {/*
        TODO: Would prefer to use a centralized font-weight value directly in css so it's not dependent on a ternary operator.
        Currently using the <Body> component with the `weight` prop since this is currently the only way to use a reusable variable.
      */}
      <Body as="label" weight={isCurrent ? 'medium' : 'regular'}>
        {children}
      </Body>
    </div>
  );
};

export default Step;
