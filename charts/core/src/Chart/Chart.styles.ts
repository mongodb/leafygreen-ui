import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  color,
  InteractionState,
  Variant,
} from '@leafygreen-ui/tokens';

export const chartStyles = css`
  grid-row: 2;
`;

export const getWrapperStyles = (theme: Theme) => css`
  height: 280px;
  width: 100%;
  border: 1px solid
    ${color[theme].border[Variant.Secondary][InteractionState.Default]};
  border-radius: ${borderRadius[200]}px;
  display: grid;
  grid-template-rows: auto 1fr;
`;
