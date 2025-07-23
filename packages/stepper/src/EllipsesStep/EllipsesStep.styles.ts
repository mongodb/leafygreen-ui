import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

import { stepIconClassName } from '../constants';

import { EllipsesStepState, EllipsesStepStates } from './EllipsesStep.types';

// TODO: would be good to put these styles inside a baseStyles, but it is currently impossible because the <Tooltip> content is rendered in a Portal.
export const tooltipStyles = css`
  // TODO: this is an arbitrary value. It would be nice to have a separate component for <ol> that handles this spacing.
  padding-inline-start: ${spacing[4]}px;
`;

export const themedStateShadowColor = {
  [Theme.Dark]: {
    [EllipsesStepStates.CompletedMultiple]: palette.green.dark1,
    [EllipsesStepStates.UpcomingMultiple]: palette.gray.dark2,
  },
  [Theme.Light]: {
    [EllipsesStepStates.CompletedMultiple]: palette.green.light2,
    [EllipsesStepStates.UpcomingMultiple]: palette.gray.light2,
  },
};

export const getMultipleStyles = (
  theme: Theme,
  state: EllipsesStepState,
) => css`
  &:hover .${stepIconClassName} {
    // TODO: use centralized box-shadow value
    box-shadow: 0px 0px 0px 3px ${themedStateShadowColor[theme][state]};
  }
`;
