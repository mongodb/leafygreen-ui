import { Theme } from '@leafygreen-ui/lib';
import { color, InteractionState, Variant } from '@leafygreen-ui/tokens';

export const getIconFill = ({
  disabled,
  theme,
}: {
  disabled: boolean;
  theme: Theme;
}) => {
  if (disabled) {
    return color[theme].icon[Variant.Disabled][InteractionState.Default];
  }

  return color[theme].icon[Variant.Primary][InteractionState.Default];
};
