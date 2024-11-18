import { TransitionStatus } from 'react-transition-group';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  color,
  InteractionState,
  transitionDuration as transitionDurationToken,
  Variant,
} from '@leafygreen-ui/tokens';

export const transitionDuration = transitionDurationToken.slower;

export const getWrapperStyles = (theme: Theme) => css`
  width: 100%;
  border: 1px solid
    ${color[theme].border[Variant.Disabled][InteractionState.Default]};
  border-radius: ${borderRadius[200]}px;
  overflow: hidden;
`;

export const childrenWrapperStyle = css`
  overflow: hidden;
  transition: ${transitionDuration}ms ease-in-out;
  transition-property: all;
  transform-origin: top left;
  padding-inline: 24px;
  box-sizing: content-box;
  border-top: 1px solid transparent;
  visibility: visible;
`;

export const childrenWrapperTransitionStyle = (
  state: TransitionStatus,
  height?: number,
): string => {
  switch (state) {
    case 'entering':
      return css`
        max-height: ${height || 9999}px;
        padding-block: 24px;
        border-color: var(--card-divider-color);
      `;
    case 'entered':
      return css`
        max-height: ${height || 9999}px;
        padding-block: 24px;
        border-color: var(--card-divider-color);
      `;
    case 'exiting':
      return css`
        max-height: 0;
        padding-block: 0;
      `;
    case 'exited':
      return css`
        max-height: 0;
        padding-block: 0;
        visibility: hidden;
      `;
    default:
      return ``;
  }
};
