import React from 'react';
import { StepCompletionStates, StepIconProps } from './types';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import EllipsisIcon from '@leafygreen-ui/icon/dist/Ellipsis';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';
import { Overline } from '@leafygreen-ui/typography';

const Icon = ({ state, content }: StepIconProps) => {
  if (state === StepCompletionStates.Completed) {
    return <CheckmarkIcon />;
  } else if (
    state === StepCompletionStates.UpcomingMultiple ||
    state === StepCompletionStates.CompletedMultiple
  ) {
    return <EllipsisIcon />;
  } else {
    // if Current (single) or Upcoming (single)
    // TODO: Use centralized, reusable font-weight value
    return (
      <Overline
        className={css`
          font-weight: 400;
          color: inherit;
        `}
      >
        {content}
      </Overline>
    );
  }
};

const StepIcon = ({ state, size, ...rest }: StepIconProps) => {
  const baseStyles = css`
    width: ${size}px;
    height: ${size}px;
    padding: ${spacing[1]}px;
    margin-bottom: ${spacing[1]}px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid;
    // TODO: use centralized transition prop
    transition: 0.3s box-shadow ease;

    svg {
      width: 100%;
    }
  `;

  const completedStyles = css`
    color: ${palette.white};
    border-color: ${palette.green.dark1};
    background-color: ${palette.green.dark1};
  `;

  const currentStyles = css`
    color: ${palette.green.dark2};
    background-color: ${palette.white};
    border-color: ${palette.green.dark1};
  `;

  const upcomingStyles = css`
    color: ${palette.gray.dark1};
    background-color: ${palette.white};
    border-color: ${palette.gray.dark1};
  `;
  const styles = {
    [StepCompletionStates.CompletedMultiple]: completedStyles,
    [StepCompletionStates.Completed]: completedStyles,
    [StepCompletionStates.Current]: currentStyles,
    [StepCompletionStates.Upcoming]: upcomingStyles,
    [StepCompletionStates.UpcomingMultiple]: upcomingStyles,
  };

  return (
    <div className={`lg-ui-step-icon ${cx(baseStyles, styles[state])}`}>
      <Icon state={state} {...rest} />
    </div>
  );
};

export default StepIcon;
