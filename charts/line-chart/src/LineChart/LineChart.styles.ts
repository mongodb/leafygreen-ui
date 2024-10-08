import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  color,
  Variant,
  InteractionState,
  spacing,
} from '@leafygreen-ui/tokens';

export const baseStyles = css`
  height: 280px;
  width: 100%;
  border: 1px solid
    ${color[Theme.Light].border[Variant.Disabled][InteractionState.Default]};
  border-radius: ${borderRadius[200]}px;
  display: grid;
  grid-template-rows: 40px 1fr;
`;

export const headerStyles = css`
  border-bottom: 1px solid
    ${color[Theme.Light].border[Variant.Disabled][InteractionState.Default]};
  display: flex;
  align-items: center;
  padding-left: ${spacing[300]}px;
  padding-right: ${spacing[400]}px;
`;

export const chartStyles = css`
  padding: ${spacing[150]}px ${spacing[300]}px ${spacing[400]}px;
`;
