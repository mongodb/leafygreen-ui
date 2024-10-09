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
`;

export const getButtonStyles = (theme: Theme) => css`
  margin-left: ${spacing[300]}px;
  display: inline-flex;
  align-items: center;
`;
