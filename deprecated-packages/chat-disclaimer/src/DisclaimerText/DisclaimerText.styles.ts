import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  color,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

const baseContainerStyles = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing[200]}px;
  align-items: center;
  text-align: center;
`;

export const getContainerStyles = (className?: string) =>
  cx(baseContainerStyles, className);

export const getTitleStyles = (theme: Theme) => css`
  color: ${color[theme].text[Variant.Secondary][InteractionState.Default]};
`;

export const disclaimerStyles = css`
  > span {
    font-size: inherit;
  }
`;
