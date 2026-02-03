import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  borderRadius,
  color,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

const getBaseContainerStyles = (theme: Theme) => css`
  position: relative;
  max-width: 100%;
  width: 100%;
  white-space: pre-line;
  overflow-wrap: break-word;
  display: flex;
  flex-direction: column;
  gap: ${spacing[200]}px;
  color: ${color[theme].text[Variant.Primary][InteractionState.Default]};
`;

const getSenderContainerStyles = (theme: Theme) => css`
  width: auto;
  border-radius: ${borderRadius[300]}px ${borderRadius[300]}px 0;
  background-color: ${palette.gray[theme === Theme.Dark ? 'dark2' : 'light2']};
  padding: ${spacing[300]}px;
  align-self: flex-end;
`;

export const getContainerStyles = ({
  className,
  isSender,
  theme,
}: {
  className?: string;
  isSender: boolean;
  theme: Theme;
}) =>
  cx(
    getBaseContainerStyles(theme),
    {
      [getSenderContainerStyles(theme)]: isSender,
    },
    className,
  );
