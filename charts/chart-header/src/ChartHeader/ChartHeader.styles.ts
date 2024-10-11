import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  color,
  Variant,
  InteractionState,
  spacing,
} from '@leafygreen-ui/tokens';

export const getHeaderStyles = (theme: Theme) => css`
  border-bottom: 1px solid
    ${color[theme].border[Variant.Disabled][InteractionState.Default]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: ${spacing[300]}px;
  padding-right: ${spacing[400]}px;
  height: 40px;
  width: 100%;
  grid-row: 1;
`;

export const buttonContainerStyles = css`
  display: flex;
  align-items: center;
`;
