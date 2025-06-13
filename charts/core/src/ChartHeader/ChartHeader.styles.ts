import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  color,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

export const getContainerStyles = (theme: Theme, showDivider?: boolean) =>
  cx(
    css`
      border-bottom: 1px solid
        ${color[theme].border[Variant.Disabled][InteractionState.Default]};
      display: grid;
      grid-area: chartHeader; // grid-template-area defined by Chart component
      grid-template-columns: auto 1fr;
      height: 36px;
      padding: ${spacing[100]}px ${spacing[300]}px;
      width: 100%;
    `,
    {
      [css`
        border-top: 1px solid
          ${color[theme].border[Variant.Disabled][InteractionState.Default]};
      `]: showDivider,
    },
  );

export const titleStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[100]}px;
`;
