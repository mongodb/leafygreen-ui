import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  color,
  Variant,
  InteractionState,
} from '@leafygreen-ui/tokens';

export const getWrapperStyles = (theme: Theme) => css`
  height: 280px;
  width: 100%;
  border: 1px solid
    ${color[theme].border[Variant.Disabled][InteractionState.Default]};
  border-radius: ${borderRadius[200]}px;
  display: grid;
  grid-template-rows: 40px 1fr;
`;
