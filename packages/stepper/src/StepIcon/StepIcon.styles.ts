import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';

import { type StepState, StepStates } from '../Stepper';

export const baseStyles = css`
  box-sizing: content-box;
  margin-bottom: ${spacing[1]}px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  transition: ${transitionDuration.slower}ms box-shadow ease;
  z-index: 1;

  svg {
    width: 100%;
  }
`;

export const themedStateColor = {
  [Theme.Dark]: {
    [StepStates.CompletedMultiple]: palette.black,
    [StepStates.Completed]: palette.black,
    [StepStates.Current]: palette.green.base,
    [StepStates.Upcoming]: palette.gray.light1,
    [StepStates.UpcomingMultiple]: palette.gray.light1,
  },
  [Theme.Light]: {
    [StepStates.CompletedMultiple]: palette.white,
    [StepStates.Completed]: palette.white,
    [StepStates.Current]: palette.green.dark2,
    [StepStates.Upcoming]: palette.gray.dark1,
    [StepStates.UpcomingMultiple]: palette.gray.dark1,
  },
};

export const themedStateBgColor = {
  [Theme.Dark]: {
    [StepStates.CompletedMultiple]: palette.green.base,
    [StepStates.Completed]: palette.green.base,
    [StepStates.Current]: palette.black,
    [StepStates.Upcoming]: palette.black,
    [StepStates.UpcomingMultiple]: palette.black,
  },
  [Theme.Light]: {
    [StepStates.CompletedMultiple]: palette.green.dark1,
    [StepStates.Completed]: palette.green.dark1,
    [StepStates.Current]: palette.white,
    [StepStates.Upcoming]: palette.white,
    [StepStates.UpcomingMultiple]: palette.white,
  },
};

export const themedStateBorderColor = {
  [Theme.Dark]: {
    [StepStates.CompletedMultiple]: palette.green.base,
    [StepStates.Completed]: palette.green.base,
    [StepStates.Current]: palette.green.base,
    [StepStates.Upcoming]: palette.gray.light1,
    [StepStates.UpcomingMultiple]: palette.gray.light1,
  },
  [Theme.Light]: {
    [StepStates.CompletedMultiple]: palette.green.dark1,
    [StepStates.Completed]: palette.green.dark1,
    [StepStates.Current]: palette.green.dark1,
    [StepStates.Upcoming]: palette.gray.dark1,
    [StepStates.UpcomingMultiple]: palette.gray.dark1,
  },
};

export const getThemedStateStyles = (theme: Theme, state: StepState) => css`
  color: ${themedStateColor[theme][state]};
  background-color: ${themedStateBgColor[theme][state]};
  border-color: ${themedStateBorderColor[theme][state]};
`;
