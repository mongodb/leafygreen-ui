import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  color,
  InteractionState,
  Variant,
} from '@leafygreen-ui/tokens';

export const getWrapperStyles = (theme: Theme) => css`
  width: 100%;
  border: 1px solid
    ${color[theme].border[Variant.Disabled][InteractionState.Default]};
  border-radius: ${borderRadius[200]}px;
`;
