import { stepIconClassName } from 'src/constants';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

import { EllipsesStepState, EllipsesStepStates } from './EllipsesStep.types';

// TODO: would be good to put these styles inside a baseStyles, but it is currently impossible because the <Tooltip> content is an iframe.
export const tooltipStyles = css`
  // TODO: this is an arbitrary value. It would be nice to have a separate component for <ol> that handles this spacing.
  padding-inline-start: ${spacing[4]}px;
`;

export const completedMultipleStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    &:hover .${stepIconClassName} {
      // TODO: use centralized box-shadow value
      box-shadow: 0px 0px 0px 3px ${palette.green.dark1};
    }
  `,
  [Theme.Light]: css`
    &:hover .${stepIconClassName} {
      box-shadow: 0px 0px 0px 3px ${palette.green.light2};
    }
  `,
};

export const upcomingMultipleStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    &:hover .${stepIconClassName} {
      // TODO: use centralized box-shadow value
      box-shadow: 0px 0px 0px 3px ${palette.gray.dark2};
    }
  `,
  [Theme.Light]: css`
    &:hover .${stepIconClassName} {
      // TODO: use centralized box-shadow value
      box-shadow: 0px 0px 0px 3px ${palette.gray.light2};
    }
  `,
};

export const ellipsesStepStyles: Record<
  EllipsesStepState,
  Record<Theme, string>
> = {
  [EllipsesStepStates.CompletedMultiple]: completedMultipleStyles,
  [EllipsesStepStates.UpcomingMultiple]: upcomingMultipleStyles,
};
