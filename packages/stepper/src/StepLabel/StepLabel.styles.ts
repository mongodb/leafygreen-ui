import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

import { StepState, StepStates } from '../Stepper/Stepper.types';

export const themedStateColor = {
  [Theme.Dark]: {
    [StepStates.CompletedMultiple]: palette.green.base,
    [StepStates.Completed]: palette.green.base,
    [StepStates.Current]: palette.gray.light2,
    [StepStates.Upcoming]: palette.gray.light1,
    [StepStates.UpcomingMultiple]: palette.gray.light1,
  },
  [Theme.Light]: {
    [StepStates.CompletedMultiple]: palette.green.dark2,
    [StepStates.Completed]: palette.green.dark2,
    [StepStates.Current]: palette.green.dark3,
    [StepStates.Upcoming]: palette.gray.dark1,
    [StepStates.UpcomingMultiple]: palette.gray.dark1,
  },
};

export const getThemedStateColorStyles = (
  theme: Theme,
  state: StepState,
) => css`
  color: ${themedStateColor[theme][state]};
`;

export const multipleStyles = css`
  text-decoration-line: underline;
  text-decoration-style: dotted;
  text-underline-position: under;
`;
