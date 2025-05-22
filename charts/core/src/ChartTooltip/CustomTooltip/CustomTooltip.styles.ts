import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  color,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

export const getHeaderStyles = (theme: Theme) => css`
  color: ${color[theme].text[Variant.InverseSecondary][
    InteractionState.Default
  ]};
  margin-bottom: ${spacing[100]}px;
  padding: ${spacing[150]}px ${spacing[150]}px 0;
`;
