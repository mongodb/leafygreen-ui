import { Theme } from '@leafygreen-ui/lib';
import { color, InteractionState, Variant } from '@leafygreen-ui/tokens';

export const TitleIconVariant = {
  Default: Variant.Primary,
  Error: Variant.Error,
  Success: Variant.Success,
} as const satisfies Record<string, Variant>;
export type TitleIconVariant =
  (typeof TitleIconVariant)[keyof typeof TitleIconVariant];

export const getIconFill = ({
  theme,
  variant,
}: {
  theme: Theme;
  variant: TitleIconVariant;
}) => color[theme].icon[variant][InteractionState.Default];
