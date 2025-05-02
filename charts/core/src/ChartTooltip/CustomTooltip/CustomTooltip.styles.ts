import { transparentize } from 'polished';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  color,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

const CLOSE_BUTTON_SIZE = 14;

export const getHeaderStyles = (theme: Theme) => css`
  color: ${color[theme].text[Variant.InverseSecondary][
    InteractionState.Default
  ]};
  margin-bottom: ${spacing[100]}px;
  display: flex;
  justify-content: space-between;
`;

export const getCloseButtonStyles = (theme: Theme) => css`
  height: ${CLOSE_BUTTON_SIZE}px;
  width: ${CLOSE_BUTTON_SIZE}px;
  color: ${color[theme].icon[Variant.Primary][InteractionState.Default]};

  &:active,
  &:hover {
    color: ${color[theme].icon[Variant.Primary][InteractionState.Hover]};

    &:before {
      background-color: ${transparentize(
        0.9,
        color[theme].background[Variant.Secondary][InteractionState.Hover],
      )};
    }
  }

  &:focus-visible {
    color: ${color[theme].icon[Variant.Primary][InteractionState.Focus]};

    &:before {
      background-color: ${transparentize(
        0.9,
        color[theme].background[Variant.Secondary][InteractionState.Focus],
      )};
    }
  }
`;
