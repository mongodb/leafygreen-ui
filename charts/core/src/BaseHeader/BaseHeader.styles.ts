import { TransitionStatus } from 'react-transition-group';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  color,
  InteractionState,
  spacing,
  transitionDuration as transitionDurationToken,
  Variant,
} from '@leafygreen-ui/tokens';

export const transitionDuration = transitionDurationToken.slower;

export const getContainerStyles = (theme: Theme) => css`
  width: 100%;
  padding: ${spacing[150]}px ${spacing[300]}px;
  display: grid;
  grid-template-columns: auto 1fr;
  border-bottom: 1px solid
    ${color[theme].border[Variant.Disabled][InteractionState.Default]};
`;

export const alignCenterStyles = css`
  display: flex;
  align-items: center;
`;

export const collapseIconStyles = css`
  transform: rotate(0deg);
  transition: transform ${transitionDurationToken.slower}ms ease-in-out;

  &.isOpen {
    transform: rotate(-90deg);
  }
`;

// export const iconStyle = css`
//   grid-column: 2;
//   grid-row: 1;
//   color: ${palette.gray.base};
//   transition: transform ${transitionDuration}ms ease-in-out;
// `;

// export const iconThemeStyle: Record<Theme, string> = {
//   [Theme.Dark]: css`
//     &:hover,
//     &:active,
//     &:focus-visible {
//       color: ${palette.gray.light1};

//       &::before {
//         background-color: ${palette.gray.dark2};
//       }
//     }
//   `,
//   [Theme.Light]: css`
//     &:hover,
//     &:active,
//     &:focus-visible {
//       color: ${palette.gray.dark1};

//       &::before {
//         background-color: ${palette.gray.light2};
//       }
//     }
//   `,
// };

export const iconTransitionStyle: Record<TransitionStatus, string> = {
  entering: css`
    transform: rotate(180deg);
  `,
  entered: css`
    transform: rotate(180deg);
  `,
  exiting: css`
    transform: rotate(0deg);
  `,
  exited: css`
    transform: rotate(0deg);
  `,
  unmounted: '',
};
