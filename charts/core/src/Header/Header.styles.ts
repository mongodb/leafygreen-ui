import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { color, InteractionState, Variant } from '@leafygreen-ui/tokens';

export const getDividerStyles = (theme: Theme) => css`
  border-top: 1px solid
    ${color[theme].border[Variant.Disabled][InteractionState.Default]};
`;
