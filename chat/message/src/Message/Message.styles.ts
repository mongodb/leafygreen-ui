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
  display: flex;
  flex-direction: column;
  gap: ${spacing[150]}px;
  align-items: flex-start;
  color: ${color[theme].text[Variant.Primary][InteractionState.Default]};
`;

const senderStyles = css`
  align-items: flex-end;
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
      [senderStyles]: isSender,
    },
    className,
  );

export const avatarContainerStyles = css`
  display: flex;
  gap: ${spacing[150]}px;
`;

const baseMessageContainerStyles = css`
  position: relative;
  max-width: 100%;
  white-space: pre-line;
  overflow-wrap: break-word;
  display: flex;
  flex-direction: column;
  gap: ${spacing[200]}px;
`;

const getSenderMessageContainerStyles = (theme: Theme) => css`
  border-radius: ${borderRadius[300]}px ${borderRadius[300]}px 0;
  background-color: ${palette.gray[theme === Theme.Dark ? 'dark2' : 'light2']};
  padding: ${spacing[300]}px;
`;

export const getMessageContainerStyles = ({
  isSender,
  theme,
}: {
  isSender: boolean;
  theme: Theme;
}) =>
  cx(baseMessageContainerStyles, {
    [getSenderMessageContainerStyles(theme)]: isSender,
  });
